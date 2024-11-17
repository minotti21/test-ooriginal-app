import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrCodeData from "../../screens/QrCodeData";
import type { StaticParamList } from "@react-navigation/native";
import HomeTabs from "../HomeTabs";
import Header from "../../components/Header";

const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screenOptions: {
    header: ({ options: { title } }) => <Header title={title} />,
  },
  screens: {
    Home: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    QrCodeData: {
      screen: QrCodeData,
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default createStaticNavigation(RootStack);
