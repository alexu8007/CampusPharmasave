import React, { FC, useEffect, useState, useRef } from "react"
import { Image, View, Animated, Alert } from "react-native"
import { Screen, Card, Text, Button, Icon, ListItem } from "../../components"
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
  const [showMenuIcon, setShowMenuIcon] = useState(true)
  const [disableLogout, setDisableLogout] = useState(false)

  const progressRef1 = useRef<ProgressRef>(null)

  const [settingsCardHeight] = useState(new Animated.Value(0)) // Initial height 0
  const dropdownItemOpacity = settingsCardHeight.interpolate({
    inputRange: [0, 50, 200], // Adjust these values as needed
    outputRange: [0, 0, 1], // Starts fully transparent, remains transparent up to height 50, and then fully opaque
    extrapolate: "clamp", // Prevents extrapolating beyond outputRange values
  })
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
      setShowMenuIcon(true)
    }
    setDisableLogout(false)

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
              disabled={disableLogout}
              onPress={() => {
                setDisableLogout(true)
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
                  animations.startMenuRotate()
                  setShowMenuIcon(!showMenuIcon)
                  toggleSettingsDropdown()
                }}
              >
                <Animated.View style={{ transform: [{ rotate: animations.menuSpin }] }}>
                  {showMenuIcon ? (
                    <Icon icon="menu" style={styles.imgTint} />
                  ) : (
                    <Icon icon="x" style={styles.imgTint} />
                  )}
                </Animated.View>
              </Button>
            </View>
            {!settingsHidden && (
              <Animated.View
                style={[styles.profileSettingsDropdown, { height: settingsCardHeight }]}
              >
                <Animated.View
                  style={[
                    styles.profileSettingsDropdownItemsContainer,
                    { opacity: dropdownItemOpacity },
                  ]}
                >
                  <ListItem
                    leftIcon="settings"
                    text="Settings"
                    rightIcon="caretRight"
                    textStyle={styles.profileSettingsDropdownItemsText}
                  />
                  <ListItem
                    leftIcon="components"
                    text="Coupon History"
                    rightIcon="caretRight"
                    textStyle={styles.profileSettingsDropdownItemsText}
                  />
                  <ListItem
                    leftIcon="heart"
                    text="Contact Us"
                    rightIcon="caretRight"
                    textStyle={styles.profileSettingsDropdownItemsText}
                  />
                </Animated.View>
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
                if (!showMenuIcon) {
                  animations.startMenuRotate()
                }
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
