import { StyleSheet } from "react-native"
import { colors, spacing } from "app/theme"

const ProfileScreenStyles = StyleSheet.create({
  circleColor: {
    borderColor: colors.transparent,
    borderRadius: 100,
    height: 10,
    width: 10,
  },

  colorContainer: {
    alignItems: "center",
    width: "50%",
  },

  container: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },

  imgTint: {
    tintColor: colors.palette.neutral100,
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
    top: 100,
    width: "80%",
    zIndex: 2,
  },

  pointsFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: spacing.sm,
    width: "100%",
  },

  pointsText: {
    textAlign: "center",
  },
  profileBellIconContainer: {
    height: 40,
    left: spacing.md,
    position: "absolute",
    top: spacing.md,
    width: 40,
  },
  profileButtons: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    height: 40,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 40,
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
    width: 130,
  },

  profileImageContainer: {
    alignItems: "center",
    marginTop: spacing.xl,
    width: "100%",
  },

  profileSettingsIconContainer: {
    height: 40,
    position: "absolute",
    right: spacing.md,
    top: spacing.md,
    width: 40,
  },

  profileText: {
    marginTop: spacing.md + spacing.xxs,
    textAlign: "center",
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
})

export default ProfileScreenStyles
