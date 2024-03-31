import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated, Alert } from "react-native"
import { Screen, Card, Text, Button } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import CircularProgress, { ProgressRef } from "react-native-circular-progress-indicator"

import styles from "./ProfileScreenStyles"
import { colors } from "app/theme"
import * as animations from "./ProfileScreenAnimations"
import { supabase } from "app/lib/supabase"

export const ProfileScreen: FC<DemoTabScreenProps<"Profile">> = function DemoCommunityScreen(
  _props,
) {
  const [level, setLevel] = useState(0)
  const [name, setName] = useState("")
  const [points, setPoints] = useState(0)
  const [settingsHidden, setSettingsHidden] = useState(true)

  const progressRef1 = useRef<ProgressRef>(null)

  const [settingsCardHeight] = useState(new Animated.Value(0)) // Initial height 0
  const toggleSettingsDropdown = () => {
    // If currently hidden
    if (settingsHidden) {
      setSettingsHidden(false)

      Animated.timing(settingsCardHeight, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false,
      }).start()
    } else {
      // Start retracting animation.
      Animated.timing(settingsCardHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        // Update state to hide the dropdown after animation completes.
        setSettingsHidden(true)
      })
    }
  }

  const fetchUserData = async () => {
    if (!settingsHidden) {
      toggleSettingsDropdown()
    }

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert("Logout Failed", error.message)
    } else {
      _props.navigation.replace("Login")
    }
  }

  useEffect(() => {
    fetchUserData()
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
            <Button
              style={styles.profileButtons}
              pressedStyle={styles.profileButtons}
              onPress={() => {
                animations.startShake()
                handleLogout()
              }}
            >
              <Animated.View
                style={{
                  transform: [{ translateX: animations.shakeAnimation }],
                }}
              >
                <Image
                  style={styles.profileLogoutButton}
                  source={require("../../../assets/icons/logout.png")}
                />
              </Animated.View>
            </Button>
          </View>
        }
        RightComponent={
          <View style={styles.profileIconsContainer}>
            <View>
              <Button
                style={styles.profileButtons}
                pressedStyle={styles.profileButtons}
                onPress={() => {
                  animations.startSettingsRotate()
                  toggleSettingsDropdown()
                }}
              >
                <Animated.View style={{ transform: [{ rotate: animations.settingsSpin }] }}>
                  <Image
                    style={styles.imgTint}
                    source={require("../../../assets/icons/settings.png")}
                  />
                </Animated.View>
              </Button>
            </View>
            {!settingsHidden && (
              <Animated.View
                style={[styles.profileSettingsDropdown, { height: settingsCardHeight }]}
              >
                {/* TODO: make into actual icons */}
                <Text onPress={() => console.log("A")} text="A" />
                <Text onPress={() => console.log("B")} text="B" />
                <Text onPress={() => console.log("C")} text="C" />
                <Text onPress={() => console.log("D")} text="D" />
              </Animated.View>
            )}
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
              inActiveStrokeColor={colors.palette.accent100}
              activeStrokeColor={colors.palette.accent500}
              progressValueColor={colors.palette.secondary500}
              ref={progressRef1}
            />
            <Button
              style={styles.reloadButton}
              pressedStyle={styles.reloadButton}
              onPress={() => {
                fetchUserData()
                animations.startReloadRotate()
                progressRef1.current?.reAnimate()
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
        // FooterComponent={
        //   <View style={styles.pointsFooter}>
        //     <View style={styles.colorContainer}>
        //       <View style={[styles.circleColor, { backgroundColor: colors.palette.accent500 }]} />
        //       <Text
        //         preset="default"
        //         size="xs"
        //         weight="light"
        //         style={styles.pointsText}
        //         text={`Coupon\n${points}`}
        //       />
        //     </View>
        //     <View style={styles.colorContainer}>
        //       <View
        //         style={[styles.circleColor, { backgroundColor: colors.palette.secondary500 }]}
        //       />
        //       <Text
        //         preset="default"
        //         size="xs"
        //         weight="light"
        //         style={styles.pointsText}
        //         text={`Consultation\n${points}`}
        //       />
        //     </View>
        //   </View>
        //   // <Text
        //   //     preset="formHelper"
        //   //     weight="light"
        //   //     size="xs"
        //   //     style={styles.pointsText}
        //   //     text={`${100 - points} points left to level up!`}
        //   //   />
        // }
      />
    </Screen>
  )
}
