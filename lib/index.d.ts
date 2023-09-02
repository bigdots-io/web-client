/// <reference types="react" />
import { Dimensions, MacroConfig, MacroName, Pixel } from "@bigdots-io/display-engine/lib/types";
import { Macro } from "@bigdots-io/display-engine/lib/types";
export { solidColorMacro, textMacro, twinkleMacro, meteorShowerMacro, } from "@bigdots-io/display-engine";
export declare function updateDot(element: HTMLDivElement, { y, x, hex }: Pixel): void;
type MacroNameType = `${MacroName}`;
export default function BigdotsDisplay({ layers, dimensions, }: {
    layers: Macro[];
    macroName?: MacroNameType;
    macroConfig?: Partial<MacroConfig>;
    dimensions: Dimensions;
}): JSX.Element;
