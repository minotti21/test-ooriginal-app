import React from "react";
import QrCodeDataContextProvider from "./src/contexts/QrCodeDataContext";
import RootStack from "./src/routes/RootStack";
import AlertContextProvider from "./src/contexts/AlertContext";
import Alert from "./src/components/Alert/Alert";

function App(): React.JSX.Element {
  return (
    <QrCodeDataContextProvider>
      <AlertContextProvider>
        <RootStack />
        <Alert />
      </AlertContextProvider>
    </QrCodeDataContextProvider>
  );
}

export default App;
