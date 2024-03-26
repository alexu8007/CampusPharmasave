import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { AppStackScreenProps } from "../navigators"

import { spacing } from "../theme"
import { supabase } from "app/lib/supabase"

interface SignupScreenProps extends AppStackScreenProps<"Signup"> {}

export const SignupScreen: FC<SignupScreenProps> = observer(function SignupScreen(_props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function signUpWithEmail() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      Alert.alert(error.message)
    }
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" text="Sign Up" preset="heading" style={$signUp} />

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
      />

      <Button
        testID="login-button"
        text="Tap to Sign Up!"
        style={$tapButton}
        preset="reversed"
        onPress={signUpWithEmail}
      />

      <Button
        style={$tapButton}
        text="Already have an account? Sign In"
        onPress={() => _props.navigation.navigate("Login")}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signUp: TextStyle = {
  marginBottom: spacing.xxl,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
