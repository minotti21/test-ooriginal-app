import { ReactNode } from "react";
import { Text, TextStyle } from "react-native";
import Sizes from "../../constants/Sizes";
import Colors from "../../constants/Colors";

const { text } = Sizes;

interface ThemedTextProps {
  children: ReactNode;
  size?: keyof typeof text;
  color?: keyof typeof Colors;
  align?: TextStyle["textAlign"];
  weight?: "light" | "regular" | "medium" | "bold";
  breakLine?: boolean;
}

export default function ThemedText({
  children,
  size = "medium",
  color = "black",
  align = "auto",
  weight = "medium",
}: ThemedTextProps) {
  const dynamicStyles: TextStyle = {
    fontSize: Sizes.text[size],
    color: Colors[color],
    fontWeight: weight,
    fontFamily: `poppins-${weight}`,
    textAlign: align,
  };

  return <Text style={dynamicStyles}>{children}</Text>;
}
