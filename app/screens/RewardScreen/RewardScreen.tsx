import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated } from "react-native"
import { Screen, Card, Text, Button} from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { CircularProgressBase, ProgressRef } from "react-native-circular-progress-indicator"
import { Bar } from "react-native-progress"
 
import styles from "./RewardScreenStyles"
import { colors } from "app/theme"
import * as animations from "./RewardScreenAnimations"
import { format } from "date-fns"

const userData = {
  profileImageUrl: "./sad-face.png",
  name: "Joe Mama",
  level: 10,
  couponPoints: 60,
  consultationPoints: 10,
}

export const RewardScreen: FC<DemoTabScreenProps<"Reward">> = function DemoCommunityScreen(
  _props,
) {
  const [level, setLevel] = useState(0)
  const [name, setName] = useState("")
  const [couponPoints, setCouponPoints] = useState(0)
  const [consultationPoints, setConsultationPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)

  const progressRef1 = useRef<ProgressRef>(null)
  const progressRef2 = useRef<ProgressRef>(null)

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year : 'numeric',
    month : 'short',
    day : 'numeric'
  });

  const resetValues = () => {
    setLevel(0)
    setName("")
    setTotalPoints(0)
    setCouponPoints(0)
    setConsultationPoints(0)
  }

  const updateValues = () => {
    resetValues()
    setConsultationPoints(userData.consultationPoints)
    setCouponPoints(userData.couponPoints)
    setTotalPoints(userData.couponPoints + userData.consultationPoints)
    setLevel(userData.level)
    setName(userData.name)
  }

  useEffect(() => {
    updateValues()
  }, [])

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={styles.container}
      safeAreaEdges={["top"]}
      backgroundColor={colors.background}
    >
        <View style={styles.container}>
            <Text
                preset="heading"
                size="xl"
                text="Pharmasave Rewards"
                style={styles.rewardTitle}
            />
            <Text
                preset="subheading"
                size="sm"
                text={`Level ${level} through ${formattedDate}`}
                style={styles.rewardTitle}
            />
          <View style={styles.circleProgressBar}>
            <CircularProgressBase
              value={totalPoints}
              radius={175}
              duration={2000}
              maxValue={100}
              inActiveStrokeColor={colors.palette.neutral300}
              activeStrokeColor={colors.palette.accent500}
              ref={progressRef2}
              activeStrokeWidth={100}
              inActiveStrokeWidth={100}
            >
                <Text text={totalPoints.toString()} preset="heading" size="xxl" />
                <Text text={"Out of 100"} preset="subheading" size="md" />
            </CircularProgressBase>
            <Button
              style={styles.reloadButton}
              onPress={() => {
                updateValues()
                animations.startReloadRotate()
                progressRef1.current?.reAnimate()
                progressRef2.current?.reAnimate()
              }}
            >
              <Animated.View style={{ transform: [{ rotate: animations.reloadSpin }] }}>
                <Image
                  style={styles.reloadImg}
                  source={require("../../../assets/icons/reload.png")}
                />
              </Animated.View>
            </Button>
          </View>

            <Text
              text="10 Points Per Coupon Use"
            />
          
            <Card
                style={styles.rewardCard}
                verticalAlignment="top"
                HeadingComponent={
                  <View>
                    <Text
                      preset="subheading"
                      text={`${name}'s Level ${level} Benefits`}
                      style={{margin : 5, textAlign: "center"}}
                    />
                  </View>
                }
                ContentComponent={
                  <View>
                    <Bar
                      progress={totalPoints / 100}
                      width={null}
                      color={colors.palette.accent500}
                      borderRadius={0}
                      height={20}
                    />
                  </View>
                }
                FooterComponent={
                  <View style={styles.benefitContainer}>
                    <Image
                      source={require("../../../assets/images/pill.png")}
                      style={styles.benefitImage}
                    />
                    <View style={styles.benefitTextContainer}>
                    <Text
                      preset="subheading"
                      size="xl"
                      text="10% Off"
                      style={styles.benefitTitle}
                    />
                    <Text
                      preset="default"
                      size="xl"
                      text="Next Purchase"
                      style={styles.benefitTitle}
                    />
                    </View>
                  </View>
                }
            />
        </View>

       
    </Screen>
  )
}
