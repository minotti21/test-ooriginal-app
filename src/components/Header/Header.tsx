import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../ThemedText";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "" }: HeaderProps) {
  const { goBack, canGoBack } = useNavigation();
  const { top, right, left, bottom } = useSafeAreaInsets();

  const goBackPress = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  const { spacing } = Sizes;

  const dynamicStyles: ViewStyle = {
    paddingTop: top,
    paddingLeft: left + spacing.xLarge,
    paddingRight: right + spacing.xLarge,
    paddingBottom: bottom,
  };

  return (
    <View style={[styles.container, dynamicStyles]}>
      <TouchableOpacity style={styles.buttonAndTitle} onPress={goBackPress}>
        {canGoBack() && (
          <Icon name="chevron-left" color={Colors.primary} size={28} />
        )}

        <ThemedText size="large">{title}</ThemedText>
      </TouchableOpacity>

      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  buttonAndTitle: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    width: 100,
    aspectRatio: 3.47,
  },
});
