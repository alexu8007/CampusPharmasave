import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated } from "react-native"
import { Screen, Card, Text, Button } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import CircularProgress, { ProgressRef } from "react-native-circular-progress-indicator"

import styles from "./ProfileScreenStyles"
import { colors } from "app/theme"

const shakeAnimation = new Animated.Value(0)
const startShake = () => {
  Animated.sequence([
    // sequence of animated timing for left to right shake
    Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
  ]).start()
}

const rotateAnimation = new Animated.Value(0)
const startRotate = () => {
  rotateAnimation.setValue(0) // Reset the animation state to 0 before starting
  Animated.timing(rotateAnimation, {
    toValue: 1, // Animate from 0 (0 degrees) to 1 (360 degrees)
    duration: 1000, // Animation duration in milliseconds
    useNativeDriver: true, // Use native driver for better performance
  }).start()
}
const spin = rotateAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"], // Degree of rotation
})

const userData = {
  profileImageUrl: "./sad-face.png",
  name: "Joe Mama",
  level: 10,
  points: 96,
}

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const [points, setPoints] = useState(0)
    const [level, setLevel] = useState(0)

    const progressRef = useRef<ProgressRef>(null)

    useEffect(() => {
      setPoints(userData.points)
      setLevel(userData.level)
    }, [])

    return (
      <Screen
        preset="auto"
        contentContainerStyle={styles.container}
        safeAreaEdges={["top"]}
        backgroundColor={colors.background}
      >
        <Card
          style={styles.profileCard}
          verticalAlignment="top"
          LeftComponent={
            <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.profileImage} />
          }
          RightComponent={
            <View style={styles.buttonContainer}>
              <Button style={styles.settingsButton} onPress={startRotate}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
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
                  <Image
                    style={styles.imgTint}
                    source={require("../../../assets/icons/bell.png")}
                  />
                </Animated.View>
              </Button>
            </View>
          }
          HeadingComponent={
            <Text preset="heading" size="xxl" style={styles.name} text={userData.name} />
          }
          ContentComponent={
            <Text style={styles.level} text={`Level: ${level}`} preset="subheading" />
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
                text={`${100 - points} points left to level up!`}
              />
            </View>
          }
          ContentComponent={
            <View style={styles.progressBarContainer}>
              <CircularProgress
                value={points}
                radius={70}
                duration={2000}
                maxValue={100}
                inActiveStrokeColor={colors.palette.accent200}
                activeStrokeColor={colors.palette.accent500}
                progressValueColor={colors.tint}
                ref={progressRef}
              />
              <Button
                style={styles.reloadButton}
                onPress={() => {
                  setPoints(userData.points)
                  progressRef.current?.reAnimate()
                }}
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Image
                    style={styles.reloadImg}
                    source={require("../../../assets/icons/reload.png")}
                  />
                </Animated.View>
              </Button>
            </View>
          }
        />
      </Screen>
    )
  }
