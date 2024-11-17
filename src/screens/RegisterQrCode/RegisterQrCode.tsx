import ContainerView from "../../components/ContainerView/ContainerView";
import ThemedButton from "../../components/ThemedButton/ThemedButton";
import ThemedText from "../../components/ThemedText";
import { useEffect, useRef, useState } from "react";
import ThemedInput from "../../components/ThemedInput/ThemedInput";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import Sizes from "../../constants/Sizes";
import { QrCodeData, FormValidationStatus } from "../../types/QrCode";
import qrCodeApi from "../../api/qrCodeApi";
import Loading from "../../components/Loading";
import registerQrCodeHelper from "./registerQrCodeHelper";
import { Type, useAlertContext } from "../../contexts/AlertContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

const { spacing, text } = Sizes;

const defaultFormData = {
  name: "",
  description: "",
  url: "",
  additionalData: "",
};

const defaultFormValidationStatus = {
  name: false,
  description: false,
  url: false,
  additionalData: false,
};

export default function RegisterQrCode() {
  const [formData, setFormData] = useState<QrCodeData>(defaultFormData);
  const [formValidationStatus, setFormValidationStatus] =
    useState<FormValidationStatus>(defaultFormValidationStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const descriptionRef = useRef<TextInput>(null);
  const urlRef = useRef<TextInput>(null);
  const additionalDataRef = useRef<TextInput>(null);

  const { showAlert } = useAlertContext();

  const { setOptions } = useNavigation();

  const onKeyboardVisible = () => {
    setOptions({
      tabBarStyle: { display: "none" },
      header: () => null,
    });

    setIsKeyboardVisible(true);
  };

  const onKeyboardHidden = () => {
    setOptions({
      tabBarLabelStyle: { fontSize: text.small },
      tabBarStyle: { height: 72, paddingTop: spacing.xSmall, elevation: 12 },
      header: ({ options: { title } }: any) => <Header title={title} />,
    });

    setIsKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardVisible,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardHidden,
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleInputChange = (text: string, type: keyof QrCodeData) => {
    setFormData({ ...formData, [type]: text });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const newValidationFormFields = registerQrCodeHelper.getValidatedFormFields(
      formData,
      formValidationStatus,
    );

    setFormValidationStatus(newValidationFormFields);
    setAlreadySubmitted(true);

    if (Object.values(newValidationFormFields).some(value => !value)) {
      return;
    }

    setIsLoading(true);

    try {
      await qrCodeApi.createQrCode({
        additional_data: additionalData,
        description,
        name,
        url,
      });

      showAlert("Uhul!", "O QR Code foi cadastrado com sucesso.", Type.Success);
      setFormData(defaultFormData);
      setFormValidationStatus(defaultFormValidationStatus);
      setAlreadySubmitted(false);
    } catch (error: any) {
      console.error(error.message);

      showAlert(
        "Poxa...",
        `Ocorreu um erro inesperado na hora de cadastrar o QR Code. \n \n Mensagem de erro: \n ${error.message}`,
        Type.Error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { name, description, url, additionalData } = formData;

  return (
    <ContainerView hasHeader={isKeyboardVisible} justifyContent="space-between">
      <Loading isVisible={isLoading} />

      <View style={styles.innerContainer}>
        {!isKeyboardVisible && (
          <ThemedText>Cadastre um novo QR Code:</ThemedText>
        )}

        <ThemedInput
          placeholder="Preencha o nome"
          label="Nome"
          onChangeText={text => handleInputChange(text, "name")}
          value={name}
          hasError={alreadySubmitted && !formValidationStatus["name"]}
          onSubmitEditing={() => descriptionRef.current?.focus()}
          maxLength={32}
        />

        <ThemedInput
          placeholder="Preencha a descrição"
          label="Descrição"
          onChangeText={text => handleInputChange(text, "description")}
          value={description}
          ref={descriptionRef}
          hasError={alreadySubmitted && !formValidationStatus["description"]}
          onSubmitEditing={() => urlRef.current?.focus()}
          maxLength={50}
        />

        <ThemedInput
          label="URL"
          placeholder="Preencha a URL"
          onChangeText={text => handleInputChange(text, "url")}
          value={url}
          ref={urlRef}
          hasError={alreadySubmitted && !formValidationStatus["url"]}
          onSubmitEditing={() => additionalDataRef.current?.focus()}
          maxLength={100}
        />

        <ThemedInput
          label="Dados adicionais"
          placeholder="Preencha os dados adicionais"
          onChangeText={text => handleInputChange(text, "additionalData")}
          value={additionalData}
          ref={additionalDataRef}
          onSubmitEditing={handleSubmit}
          hasError={alreadySubmitted && !formValidationStatus["additionalData"]}
        />
      </View>

      <ThemedButton
        iconName="plus"
        onPress={handleSubmit}
        text="Cadastrar QR Code"
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    gap: spacing.medium,
  },
  buttons: {
    gap: spacing.medium,
  },
});
