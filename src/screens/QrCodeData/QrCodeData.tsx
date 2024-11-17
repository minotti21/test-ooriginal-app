import ContainerView from "../../components/ContainerView/ContainerView";
import ThemedButton from "../../components/ThemedButton/ThemedButton";
import ThemedText from "../../components/ThemedText";
import { StyleSheet, View } from "react-native";
import Sizes from "../../constants/Sizes";
import LabelWithValue from "../../components/LabelWithValue";
import { useQrCodeContext } from "../../contexts/QrCodeDataContext";
import { useNavigation } from "@react-navigation/native";

const { spacing } = Sizes;

export default function QrCodeData() {
  const { qrCodeData } = useQrCodeContext();

  const { goBack } = useNavigation();

  const {
    name,
    description,
    url,
    additional_data,
  } = qrCodeData;

  return (
    <ContainerView justifyContent="space-between">
      <View style={styles.innerContainer}>
        <ThemedText size="xLarge">Dados do QR Code:</ThemedText>

        <LabelWithValue label="Nome" value={name} />

        <LabelWithValue label="Descrição" value={description} />

        <LabelWithValue label="URL" value={url} />

        <LabelWithValue label="Dados adicionais" value={additional_data} />
      </View>

      <ThemedButton iconName="chevron-left" onPress={goBack} text="Voltar" />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    gap: spacing.medium,
  },
});
