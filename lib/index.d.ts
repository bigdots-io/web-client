/// <reference types="react" />
import { Dimensions, MacroConfig, MacroName, Pixel } from "display-engine/lib/types";
export declare function updateDot({ y, x, hex }: Pixel): void;
export declare function BigdotsClient(config: {
    macroName: MacroName;
    macroConfig: Partial<MacroConfig>;
    dimensions: Dimensions;
}): JSX.Element;
