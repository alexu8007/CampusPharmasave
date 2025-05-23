import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated, Alert } from "react-native"
import { Screen, Card, Text, Button} from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { CircularProgressBase, ProgressRef } from "react-native-circular-progress-indicator"
import { Bar } from "react-native-progress"
 
import styles from "./RewardScreenStyles"
import { colors } from "app/theme"
import * as animations from "./RewardScreenAnimations"

import { supabase } from '../../lib/supabase'
import { userStore } from '../../models/UserStore'

export const RewardScreen: FC<DemoTabScreenProps<"Reward">> = function DemoCommunityScreen(
  _props,
) {
  const [level, setLevel] = useState(0)
  const [name, setName] = useState("")
  const [points, setPoints] = useState(0)

  const progressRef1 = useRef<ProgressRef>(null)
  const progressRef2 = useRef<ProgressRef>(null)

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year : 'numeric',
    month : 'short',
    day : 'numeric'
  });

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const userEmail = user?.email
    if (!userEmail) {
      return
    }

    const { data, error } = await supabase
      .from("user_info")
      .select("name, level, points")
      .eq("email", userEmail)
      .single()

    if (error) {
      Alert.alert(error.message)
      return
    }

    setName(data.name)
    setLevel(data.level)
    setPoints(data.points)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const userEmail = user?.email
      if (!userEmail) {
        return
      }
  
      const { data, error } = await supabase
        .from("user_info")
        .select("name, level, points")
        .eq("email", userEmail)
        .single()
  
      if (error) {
        Alert.alert(error.message)
        return
      }
  
      setName(data.name.split(" ")[0])
      setLevel(data.level)
      setPoints(data.points)
    }

    fetchUserData();
  }, [userStore.userEmail]);

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
              value={points}
              radius={175}
              duration={2000}
              maxValue={500}
              inActiveStrokeColor={"white"}
              activeStrokeColor={"#850808"}
              ref={progressRef2}
              activeStrokeWidth={100}
              inActiveStrokeWidth={100}
            >
                <Text text={points.toString()} preset="heading" size="xxl" />
                <Text text={"Out of 500"} preset="subheading" size="md" />
            </CircularProgressBase>
            <Button
              style={styles.reloadButton}
              onPress={() => {
                fetchUserData()
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
                      progress={points / 500}
                      width={null}
                      color={"#850808"}
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
                      text="Reward"
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
