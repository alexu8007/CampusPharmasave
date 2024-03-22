import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated } from "react-native"
import { Screen, Card, Text, Button } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { CircularProgressBase, ProgressRef } from "react-native-circular-progress-indicator"

import styles from "./ProfileScreenStyles"
import { colors } from "app/theme"
import * as animations from "./ProfileScreenAnimations"

const userData = {
  profileImageUrl: "./sad-face.png",
  name: "Joe Mama",
  level: 10,
  couponPoints: 60,
  consultationPoints: 10,
}

export const ProfileScreen: FC<DemoTabScreenProps<"Profile">> = function DemoCommunityScreen(
  _props,
) {
  const [level, setLevel] = useState(0)
  const [name, setName] = useState("")
  const [couponPoints, setCouponPoints] = useState(0)
  const [consultationPoints, setConsultationPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)

  const progressRef1 = useRef<ProgressRef>(null)
  const progressRef2 = useRef<ProgressRef>(null)

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
      <Card
        style={styles.profileCard}
        verticalAlignment="top"
        LeftComponent={
          <View style={styles.profileBellIconContainer}>
            <Button style={styles.profileButtons} onPress={animations.startShake}>
              <Animated.View
                style={{
                  transform: [{ translateX: animations.shakeAnimation }],
                }}
              >
                <Image style={styles.imgTint} source={require("../../../assets/icons/bell.png")} />
              </Animated.View>
            </Button>
          </View>
        }
        RightComponent={
          <View style={styles.profileSettingsIconContainer}>
            <Button style={styles.profileButtons} onPress={animations.startSettingsRotate}>
              <Animated.View style={{ transform: [{ rotate: animations.settingsSpin }] }}>
                <Image
                  style={styles.imgTint}
                  source={require("../../../assets/icons/settings.png")}
                />
              </Animated.View>
            </Button>
          </View>
        }
        HeadingComponent={
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../../assets/images/default-profile-img.png")}
              style={styles.profileImage}
            />
          </View>
        }
        ContentComponent={
          <View>
            <Text
              preset="heading"
              size="xl"
              style={[styles.profileText, { color: colors.palette.neutral100 }]}
              text={name}
            />
            <Text
              style={[styles.profileText, { color: colors.palette.accent200 }]}
              text={`Level: ${level}`}
              preset="subheading"
              size="md"
            />
          </View>
        }
      />
      <Card
        style={styles.pointsCard}
        verticalAlignment="top"
        HeadingComponent={
          <View>
            <Text style={styles.pointsText} text="Your Points" preset="formLabel" />
            <Text
              preset="formHelper"
              weight="light"
              size="xs"
              style={styles.pointsText}
              text={`${100 - totalPoints} points left to level up!`}
            />
          </View>
        }
        ContentComponent={
          <View style={styles.progressBarContainer}>
            <CircularProgressBase
              value={totalPoints}
              radius={70}
              duration={2000}
              maxValue={100}
              inActiveStrokeColor={colors.transparent}
              activeStrokeColor={colors.palette.secondary500}
              ref={progressRef2}
            >
              <CircularProgressBase
                value={couponPoints}
                radius={70}
                duration={2000}
                maxValue={100}
                inActiveStrokeColor={colors.transparent}
                activeStrokeColor={colors.palette.accent500}
                ref={progressRef1}
              >
                <Text text={totalPoints.toString()} preset="subheading" size="xxl" />
              </CircularProgressBase>
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
        }
        FooterComponent={
          <View style={styles.pointsFooter}>
            <View style={styles.colorContainer}>
              <View style={[styles.circleColor, { backgroundColor: colors.palette.accent500 }]} />
              <Text
                preset="default"
                size="xs"
                weight="light"
                style={styles.pointsText}
                text={`Coupon\n${couponPoints}`}
              />
            </View>
            <View style={styles.colorContainer}>
              <View
                style={[styles.circleColor, { backgroundColor: colors.palette.secondary500 }]}
              />
              <Text
                preset="default"
                size="xs"
                weight="light"
                style={styles.pointsText}
                text={`Consultation\n${consultationPoints}`}
              />
            </View>
          </View>
        }
      />
    </Screen>
  )
}
