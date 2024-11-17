import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";

interface ContainerViewProps {
  children: ReactNode;
  hasPadding?: boolean;
  backgroundColor?: keyof typeof Colors;
  hasHeader?: boolean;
  gap?: number;
  justifyContent?: ViewStyle["justifyContent"];
}

const { spacing } = Sizes;

export default function ContainerView({
  children,
  hasPadding = true,
  backgroundColor = "white",
  justifyContent = "flex-start",
  gap = 0,
  hasHeader,
}: ContainerViewProps) {
  const padding = hasPadding ? spacing.xLarge : 0;

  const dynamicStyles: ViewStyle = {
    padding,
    paddingTop: hasHeader ? spacing.xLarge : 0,
    backgroundColor: Colors[backgroundColor],
    gap,
    justifyContent,
  };

  return <View style={[styles.container, dynamicStyles]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
