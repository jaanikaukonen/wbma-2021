import React from "react";
import Navigator from "./navigators/Navigator";
import { MainProvider } from "./context/MainContext";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";

const App = () => {
  return (
    <SafeAreaProvider>
      <MainProvider>
        <Navigator/>
      </MainProvider>
    </SafeAreaProvider>
  );
};

export default App;
