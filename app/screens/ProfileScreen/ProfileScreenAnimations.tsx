import { Animated } from "react-native"

export const shakeAnimation = new Animated.Value(0)
export const startShake = () => {
  Animated.sequence([
    // sequence of animated timing for left to right shake
    Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: -5, duration: 100, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
  ]).start()
}

export const menuRotateAnimation = new Animated.Value(0)
export const reloadRotateAnimation = new Animated.Value(0)
export const startMenuRotate = () => {
  menuRotateAnimation.setValue(0) // Reset the animation state to 0 before starting
  Animated.timing(menuRotateAnimation, {
    toValue: 1, // Animate from 0 (0 degrees) to 1 (360 degrees)
    duration: 500, // Animation duration in milliseconds
    useNativeDriver: true, // Use native driver for better performance
  }).start()
}
export const startReloadRotate = () => {
  reloadRotateAnimation.setValue(0) // Reset the animation state to 0 before starting
  Animated.timing(reloadRotateAnimation, {
    toValue: 3, // Animate from 0 (0 degrees) to 1 (360 degrees)
    duration: 2000, // Animation duration in milliseconds
    useNativeDriver: true, // Use native driver for better performance
  }).start()
}
export const menuSpin = menuRotateAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"], // Degree of rotation
})
export const reloadSpin = reloadRotateAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"], // Degree of rotation
})
