import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";

const { spacing } = Sizes;

interface LoadingProps {
  isVisible: boolean;
}

export default function Loading({ isVisible }: LoadingProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo-without-text.png")}
      />

      <ActivityIndicator size={60} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    gap: spacing.xxLarge,
    alignItems: "center",
    padding: spacing.xLarge,
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 72,
    aspectRatio: 1.6,
  },
});
