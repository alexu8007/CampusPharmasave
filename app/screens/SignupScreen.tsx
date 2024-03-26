import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TextStyle, ViewStyle, View } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { AppStackScreenProps } from "../navigators"

import { spacing } from "../theme"
import { supabase } from "app/lib/supabase"

interface SignupScreenProps extends AppStackScreenProps<"Signup"> {}

export const SignupScreen: FC<SignupScreenProps> = observer(function SignupScreen(_props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" text="Sign Up" preset="heading" style={$signUp} />

      <View style={$nameContainer}>
        <TextField
          value={firstName}
          onChangeText={setFirstName}
          containerStyle={$name}
          autoCapitalize="none"
          autoComplete="name"
          autoCorrect={false}
          label="First Name"
          placeholder="Enter first name"
        />
        <TextField
          value={lastName}
          onChangeText={setLastName}
          containerStyle={$name}
          autoCapitalize="none"
          autoComplete="name"
          autoCorrect={false}
          label="Last Name"
          placeholder="Enter last name"
        />
      </View>

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
        text={loading ? "Signing Up..." : "Tap to Sign Up!"}
        style={$tapButton}
        preset="reversed"
        onPress={signUpWithEmail}
        disabled={loading}
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

const $nameContainer: ViewStyle = {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: spacing.lg,
}

const $name: ViewStyle = {
    width: '45%',
}