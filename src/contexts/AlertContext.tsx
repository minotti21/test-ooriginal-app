import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export enum Type {
  Success,
  Error,
}

interface AlertDataType {
  isVisible: boolean;
  title: string;
  text: string;
  type: Type | null;
}

interface AlertContextType {
  alertData: AlertDataType;
  showAlert: (title: string, text: string, type: Type) => void;
  closeAlert: () => void;
}

const defaultAlertData = {
  isVisible: false,
  title: "",
  text: "",
  type: null,
};

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export function useAlertContext() {
  return useContext(AlertContext);
}

export default function AlertContextProvider(props: PropsWithChildren) {
  const [alertData, setAlertData] = useState<AlertDataType>(defaultAlertData);

  const showAlert = (title: string, text: string, type: Type) => {
    setAlertData({ title, text, type, isVisible: true });
  };

  const closeAlert = () => {
    setAlertData(defaultAlertData);
  };

  return (
    <AlertContext.Provider value={{ alertData, showAlert, closeAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}
