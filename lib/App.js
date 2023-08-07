import { jsx as _jsx } from "react/jsx-runtime";
import { BigdotsClient } from "./display";
import { MacroName } from "display-engine/lib/types";
function App() {
    return (_jsx(BigdotsClient, { macroName: MacroName.Twinkle, macroConfig: {}, dimensions: { width: 64, height: 64 } }));
}
export default App;
