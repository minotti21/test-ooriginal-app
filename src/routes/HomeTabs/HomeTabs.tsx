import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterQrCode from "../../screens/RegisterQrCode";
import ReadQrCode from "../../screens/ReadQrCode";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/Header";
import Sizes from "../../constants/Sizes";

const { text, spacing } = Sizes;

export default createBottomTabNavigator({
  initialRouteName: "RegisterQrCode",
  screenOptions: {
    header: ({ options: { title } }) => <Header title={title} />,
    tabBarLabelStyle: { fontSize: text.small },
    tabBarStyle: { height: 72, paddingTop: spacing.xSmall, elevation: 12 },
  },
  screens: {
    RegisterQrCode: {
      screen: RegisterQrCode,
      options: {
        title: "Novo QR Code",
        tabBarActiveTintColor: Colors.primary,
        tabBarIcon: ({ color }) => (
          <Icon name="pencil" size={28} color={color} />
        ),
      },
    },
    ReadQrCode: {
      screen: ReadQrCode,
      options: {
        title: "Ler QR Code",
        tabBarActiveTintColor: Colors.primary,
        tabBarIcon: ({ color }) => (
          <Icon name="qrcode" size={28} color={color} />
        ),
      },
    },
  },
});
