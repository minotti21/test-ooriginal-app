import { StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";
import Sizes from "../../constants/Sizes";

interface LabelWithValueProps {
  label: string;
  value: string;
}

const { spacing } = Sizes;

export default function LabelWithValue({ label, value }: LabelWithValueProps) {
  return (
    <View style={styles.container}>
      <ThemedText size="large">
        {label}
      </ThemedText>
      <ThemedText>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xxSmall,
  },
});
