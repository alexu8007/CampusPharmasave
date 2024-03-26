import { StyleSheet } from "react-native"
import { colors, spacing } from "app/theme"

const RewardScreenStyles = StyleSheet.create({
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
    justifyContent: "center",
  },

  imgTint: {
    tintColor: colors.palette.neutral100,
  },

  rewardCard: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 0,
    padding: spacing.md,
    marginTop: spacing.md,
    width: "100%",
    textAlign: "center",
  },

  rewardText: {
    textAlign: "center",
  },

  rewardTitle: {
    marginBottom: spacing.lg,
  },

  circleProgressBar: {
    marginBottom: spacing.lg,
  },

  rewardCardTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 900,
    marginTop: spacing.md,
  },

  benefitContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },

  benefitTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  benefitImage: {
    width: 100,
    height: 100,
    margin: spacing.md,
  },

  benefitTitle: {
    textAlign: "right",
    fontSize: 20,
  },

  reloadButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    height: 30,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: "absolute",
    top: 225,
    width: 350,
  },

  reloadImg: {
    alignSelf: "center",
    height: 25,
    width: 25,
  },
})

export default RewardScreenStyles
