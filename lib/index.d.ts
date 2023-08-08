/// <reference types="react" />
import { Dimensions, MacroColorConfig, MacroConfig, MacroMeteorShowerConfig, MacroName, MacroTextConfig, MacroTwinkleConfig, Pixel } from "display-engine/lib/types";
export declare function updateDot(element: HTMLDivElement, { y, x, hex }: Pixel): void;
type MacroNameType = `${MacroName}`;
interface Macro {
    macroName: MacroName;
    macroConfig: Partial<MacroConfig>;
}
export declare const twinkleMacro: (macroConfig: Partial<MacroTwinkleConfig>) => Macro;
export declare const meteorShowerMacro: (macroConfig: Partial<MacroMeteorShowerConfig>) => Macro;
export declare const solidColorMacro: (macroConfig: Partial<MacroColorConfig>) => Macro;
export declare const textMacro: (macroConfig: Partial<MacroTextConfig>) => Macro;
export default function BigdotsDisplay({ layers, dimensions, }: {
    layers: Macro[];
    macroName?: MacroNameType;
    macroConfig?: Partial<MacroConfig>;
    dimensions: Dimensions;
}): JSX.Element;
export {};
