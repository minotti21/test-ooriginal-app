import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native";
import Sizes from "../../constants/Sizes";
import Colors from "../../constants/Colors";
import ThemedText from "../ThemedText";
import { ForwardedRef, forwardRef } from "react";

const { radius, spacing } = Sizes;

interface ThemedInputProps {
  onChangeText: (value: string) => void;
  value: string;
  label: string;
  placeholder: string;
  hasError?: boolean;
  onSubmitEditing?: () => void;
  maxLength?: number;
}

function ThemedInput(
  {
    onChangeText,
    value,
    label,
    placeholder,
    hasError,
    onSubmitEditing,
    maxLength,
  }: ThemedInputProps,
  ref?: ForwardedRef<TextInput>,
) {
  return (
    <View style={styles.container}>
      <ThemedText>{label}</ThemedText>

      <TextInput
        style={styles.input}
        submitBehavior="submit"
        placeholderTextColor={Colors.lightGray}
        placeholder={placeholder}
        maxLength={maxLength}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
        ref={ref}
      />

      {hasError && (
        <ThemedText size="small" color="red">
          Preenchimento obrigatório!
        </ThemedText>
      )}
    </View>
  );
}

export default forwardRef(ThemedInput);

const styles = StyleSheet.create({
  container: {
    gap: spacing.xSmall,
  },
  input: {
    borderRadius: radius.medium,
    backgroundColor: Colors.extraLightGray,
    height: 48,
    paddingHorizontal: spacing.medium,
    color: Colors.darkGray,
  },
});
