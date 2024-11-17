import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useQrCodeContext } from "../../contexts/QrCodeDataContext";
import ThemedText from "../../components/ThemedText";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Type, useAlertContext } from "../../contexts/AlertContext";
import ThemedButton from "../../components/ThemedButton";

const { spacing } = Sizes;

export default function ReadQrCode() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const isFocused = useIsFocused();

  const { navigate } = useNavigation();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  const { setQrCodeData } = useQrCodeContext();
  const { showAlert } = useAlertContext();

  const onCodeScanned = (codes: Code[]) => {
    if (codes.length > 0 && codes[0].value != undefined) {
      console.log(codes[0].value);

      const data = JSON.parse(codes[0].value);

      setQrCodeData(data);

      navigate("QrCodeData");

      return;
    }

    showAlert("Puts...", "Ocorreu um erro ao ler o QR Code.", Type.Error);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned,
  });

  if (!hasPermission) {
    return (
      <View style={styles.noPermissionContainer}>
        <View style={styles.iconContainer}>
          <Icon name="exclamation" size={60} color={Colors.white} />
        </View>

        <ThemedText size="large" align="center">
          Você deve conceder permissão ao aplicativo para utilizar a sua câmera.
        </ThemedText>

        <ThemedButton onPress={requestPermission} text="Solicitar permissão" />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.noPermissionContainer}>
        <View style={styles.iconContainer}>
          <Icon name="exclamation" size={60} color={Colors.white} />
        </View>

        <ThemedText size="large" align="center">
          Não foi encontrada nenhuma câmera traseira no dispositivo.
        </ThemedText>
      </View>
    );
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
      codeScanner={codeScanner}
    />
  );
}

const styles = StyleSheet.create({
  noPermissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.medium,
    padding: spacing.xLarge,
    backgroundColor: Colors.white,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.red,
    borderRadius: 111,
    justifyContent: "center",
    alignItems: "center",
  },
});
