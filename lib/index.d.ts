/// <reference types="react" />
import { Dimensions, MacroConfig, MacroName, Pixel } from "display-engine/lib/types";
export declare function updateDot({ y, x, hex }: Pixel): void;
type MacroNameType = `${MacroName}`;
export declare function BigdotsClient({ config, }: {
    config: {
        macroName?: MacroNameType;
        macroConfig?: Partial<MacroConfig>;
        dimensions: Dimensions;
    };
}): JSX.Element;
export {};
