import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import ThemedText from "../ThemedText";
import Sizes from "../../constants/Sizes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

const { spacing } = Sizes;

interface ButtonContainerProps {
  backgroundColor?: keyof typeof Colors;
  outline?: boolean;
  disabled?: boolean;
  onPress: () => void;
  text: string;
  iconName?: string;
}

export default function ThemedButton({
  onPress,
  outline = false,
  disabled = false,
  text,
  iconName,
}: ButtonContainerProps) {

  const itemsColor = outline ? "primary" : "white";

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.secondary, Colors.primary]}
        style={styles.container}>
        {iconName != undefined && (
          <Icon
            name={iconName}
            style={styles.icon}
            size={24}
            color={Colors[itemsColor]}
          />
        )}

        <ThemedText weight="bold" color={itemsColor}>
          {text}
        </ThemedText>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xSmall,
    alignItems: "center",
    borderRadius: spacing.xSmall,
    paddingHorizontal: spacing.medium,
  },
  icon: {
    position: "absolute",
    left: spacing.xLarge,
  },
});
