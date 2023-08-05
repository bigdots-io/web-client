import React from "react";
import { BigdotsClient } from "./display";
import { MacroName } from "display-engine/lib/types";

function App() {
  return (
    <BigdotsClient
      macroName={MacroName.Twinkle}
      macroConfig={{}}
      dimensions={{ width: 64, height: 64 }}
    />
  );
}

export default App;
