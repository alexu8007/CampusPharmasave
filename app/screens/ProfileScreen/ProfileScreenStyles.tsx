import { StyleSheet } from "react-native"
import { colors, spacing } from "app/theme"

const ProfileScreenStyles = StyleSheet.create({
  bellButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    height: 40,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 40,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    position: "absolute",
    top: spacing.lg,
    width: "100%",
  },

  colorContainer: {
    alignItems: "center",
    width: "50%",
  },

  consultationPointsColor: {
    backgroundColor: colors.palette.secondary500,
    borderColor: colors.transparent,
    borderRadius: 100,
    height: 10,
    width: 10,
  },

  container: {
    alignItems: "center",
    // backgroundColor: colors.palette.primary100,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },

  couponPointsColor: {
    backgroundColor: colors.palette.accent500,
    borderColor: colors.transparent,
    borderRadius: 100,
    height: 10,
    width: 10,
  },

  imgTint: {
    tintColor: colors.palette.neutral100,
  },

  level: {
    color: colors.palette.accent200,
    marginTop: 10,
    textAlign: "center",
  },
  name: {
    color: colors.palette.neutral100,
    marginVertical: 0,
    textAlign: "center",
  },

  pointsCard: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: spacing.xl,
    elevation: 6,
    flexDirection: "column",
    padding: spacing.md,
    shadowColor: colors.palette.neutral1800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    top: -100,
    width: "80%",
    zIndex: 2,
  },

  pointsFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    width: "100%",
  },

  pointsText: {
    textAlign: "center",
  },

  profileCard: {
    alignItems: "center",
    backgroundColor: colors.palette.secondary500,
    borderRadius: spacing.xl,
    elevation: 6,
    flexDirection: "column",
    height: 400,
    padding: spacing.md,
    shadowColor: colors.palette.neutral1800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
    zIndex: 1,
  },
  profileImage: {
    borderColor: colors.palette.accent400,
    borderRadius: 100,
    borderWidth: 2,
    height: 130,
    marginVertical: spacing.xl,
    width: 130,
  },

  progressBarContainer: {
    alignItems: "center",
    marginTop: spacing.lg,
  },

  reloadButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    height: 30,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: "absolute",
    top: 95,
    width: 30,
  },

  reloadImg: {
    alignSelf: "center",
    height: 25,
    width: 25,
  },

  settingsButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    height: 40,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 40,
  },
})

export default ProfileScreenStyles
