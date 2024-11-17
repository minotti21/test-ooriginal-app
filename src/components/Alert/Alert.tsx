import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Sizes from "../../constants/Sizes";
import Colors from "../../constants/Colors";
import ThemedText from "../ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Type, useAlertContext } from "../../contexts/AlertContext";
import ThemedButton from "../ThemedButton";

const { spacing, radius } = Sizes;

export default function Alert() {
  const {
    alertData: { isVisible, text, title, type },
    closeAlert,
  } = useAlertContext();

  return (
    <Modal
      animationType="fade"
      transparent
      onRequestClose={closeAlert}
      visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeIcon} onPress={closeAlert}>
            <Icon name="close" color={Colors.red} size={24} />
          </TouchableOpacity>

          {type == Type.Success ? (
            <Icon name="check-circle" color={Colors.green} size={72} />
          ) : (
            <Icon name="close-circle" color={Colors.red} size={72} />
          )}

          <ThemedText size="xLarge" weight="bold">
            {title}
          </ThemedText>

          <ThemedText align="center">{text}</ThemedText>

          <View style={{ width: "100%" }}>
            <ThemedButton onPress={closeAlert} text="OK" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xLarge,
    backgroundColor: Colors.blackOpacity,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: spacing.medium,
    right: spacing.medium,
  },
  modal: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.medium,
    borderRadius: radius.medium,
    backgroundColor: Colors.white,
    gap: spacing.medium,
  },
});
