import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { MacroName, } from "display-engine/lib/types";
import { createDisplayEngine } from "display-engine";
export function updateDot(element, { y, x, hex }) {
    var el = element.querySelectorAll(`[data-coordinates='${y}:${x}']`);
    if (el.length > 0) {
        el[0].style.background = hex === "#000000" ? `#444` : hex;
    }
}
function Row({ y, children, opacity, }) {
    return (_jsx("div", Object.assign({ style: {
            opacity,
            height: 10,
            lineHeight: 10,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        } }, { children: children })));
}
function Column({ y, x, children, }) {
    return (_jsx("div", Object.assign({ style: {
            width: 10,
            height: 10,
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
        } }, { children: children }), `row_${y}_col_${x}`));
}
function Dot({ y, x }) {
    return (_jsx("div", { "data-coordinates": `${y}:${x}`, style: {
            backgroundColor: "#444",
            height: "60%",
            width: "60%",
            display: "inline-block",
            borderRadius: 100,
            boxShadow: "1px 1px 1px #AAA",
        } }));
}
export const twinkleMacro = (macroConfig) => ({
    macroName: MacroName.Twinkle,
    macroConfig,
});
export const meteorShowerMacro = (macroConfig) => ({
    macroName: MacroName.MeteorShower,
    macroConfig,
});
export const solidColorMacro = (macroConfig) => ({
    macroName: MacroName.SolidColor,
    macroConfig,
});
export const textMacro = (macroConfig) => ({
    macroName: MacroName.Text,
    macroConfig,
});
export default function BigdotsDisplay({ layers, dimensions, }) {
    const ref = useRef(null);
    useEffect(() => {
        createDisplayEngine({
            macroName: layers[0].macroName || MacroName.Text,
            macroConfig: layers[0].macroConfig || {},
            dimensions: dimensions,
            onPixelChange: (pixel) => {
                if (ref.current === null)
                    return;
                updateDot(ref.current, pixel);
            },
        });
    }, []);
    const { height, width } = dimensions;
    var adjustedBrightness = (50 + 100 / 2) / 100;
    return (_jsx("div", Object.assign({ ref: ref, style: { background: "#000" } }, { children: [...Array(height).keys()].map((y) => (_jsx(Row, Object.assign({ y: y, opacity: adjustedBrightness }, { children: [...Array(width).keys()].map((x) => (_jsx(Column, Object.assign({ y: y, x: x }, { children: _jsx(Dot, { y: y, x: x }) })))) }), `row_${y}`))) })));
}
