import React from "react";
import Navigator from "./navigators/Navigator";
import { MainProvider } from "./context/MainContext";

const App = () => {
  return (
    <MainProvider>
      <Navigator/>
    </MainProvider>
  );
};

export default App;
