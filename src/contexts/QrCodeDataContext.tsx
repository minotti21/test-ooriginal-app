import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CreateQrCodeBody } from "../types/QrCode";

interface QrCodeContextType {
  qrCodeData: CreateQrCodeBody;
  setQrCodeData: Dispatch<SetStateAction<CreateQrCodeBody>>;
}

const QrCodeContext = createContext<QrCodeContextType>({} as QrCodeContextType);

export function useQrCodeContext() {
  return useContext(QrCodeContext);
}

export default function QrCodeDataContextProvider(props: PropsWithChildren) {
  const [qrCodeData, setQrCodeData] = useState<CreateQrCodeBody>({} as CreateQrCodeBody);

  return (
    <QrCodeContext.Provider value={{ qrCodeData, setQrCodeData }}>
      {props.children}
    </QrCodeContext.Provider>
  );
}
