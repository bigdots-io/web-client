/// <reference types="react" />
import { Dimensions, Macro, MacroConfig, MacroName, Pixel } from "@bigdots-io/display-engine/lib/esm/types";
export { solidColor, text, twinkle, meteorShower, marquee, } from "@bigdots-io/display-engine";
export declare function updateDot(element: HTMLDivElement, { y, x, hex, brightness }: Pixel): void;
type MacroNameType = `${MacroName}`;
export default function BigdotsDisplay({ layers, dimensions, }: {
    layers: Macro[];
    macroName?: MacroNameType;
    macroConfig?: Partial<MacroConfig>;
    dimensions: Dimensions;
}): JSX.Element;
