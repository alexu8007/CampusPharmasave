import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated } from "react-native"
import { Screen, Card, Text, Button } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { CircularProgressBase, ProgressRef } from "react-native-circular-progress-indicator"

import styles from "./ProfileScreenStyles"
import { colors } from "app/theme"

import {
  shakeAnimation,
  startShake,
  startSettingsRotate,
  settingsSpin,
  startReloadRotate,
  reloadSpin,
} from "./ProfileScreenAnimations"

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
          <Image
            source={require("../../../assets/images/default-profile-img.png")}
            style={styles.profileImage}
          />
        }
        RightComponent={
          <View style={styles.buttonContainer}>
            <Button style={styles.settingsButton} onPress={startSettingsRotate}>
              <Animated.View style={{ transform: [{ rotate: settingsSpin }] }}>
                <Image
                  style={styles.imgTint}
                  source={require("../../../assets/icons/settings.png")}
                />
              </Animated.View>
            </Button>

            <Button style={styles.bellButton} onPress={startShake}>
              <Animated.View
                style={{
                  transform: [{ translateX: shakeAnimation }],
                }}
              >
                <Image style={styles.imgTint} source={require("../../../assets/icons/bell.png")} />
              </Animated.View>
            </Button>
          </View>
        }
        HeadingComponent={<Text preset="heading" size="xl" style={styles.name} text={name} />}
        ContentComponent={
          <Text style={styles.level} text={`Level: ${level}`} preset="subheading" size="md" />
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
                startReloadRotate()
                progressRef1.current?.reAnimate()
                progressRef2.current?.reAnimate()
              }}
            >
              <Animated.View style={{ transform: [{ rotate: reloadSpin }] }}>
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
              <View style={styles.couponPointsColor} />
              <Text preset="default" size="xs" weight="light" text={`Coupon: ${couponPoints}`} />
            </View>
            <View style={styles.colorContainer}>
              <View style={styles.consultationPointsColor} />
              <Text preset="default" size="xs" weight="light" text={`Consultation: ${consultationPoints}`} />
            </View>
          </View>
        }
      />
    </Screen>
  )
}
