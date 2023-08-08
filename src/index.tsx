import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  MacroColorConfig,
  MacroConfig,
  MacroMeteorShowerConfig,
  MacroName,
  MacroTextConfig,
  MacroTwinkleConfig,
  Pixel,
} from "display-engine/lib/types";
import { createDisplayEngine } from "display-engine";

export function updateDot(element: HTMLDivElement, { y, x, hex }: Pixel) {
  var el = element.querySelectorAll(`[data-coordinates='${y}:${x}']`);
  if (el.length > 0) {
    (el[0] as HTMLElement).style.background = hex === "#000000" ? `#444` : hex;
  }
}

function Row({
  y,
  children,
  opacity,
}: {
  y: number;
  opacity: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity,
        height: 10,
        lineHeight: 10,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

function Column({
  y,
  x,
  children,
}: {
  y: number;
  x: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        textAlign: "center",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      key={`row_${y}_col_${x}`}
    >
      {children}
    </div>
  );
}

function Dot({ y, x }: { y: number; x: number }) {
  return (
    <div
      data-coordinates={`${y}:${x}`}
      style={{
        backgroundColor: "#444",
        height: "60%",
        width: "60%",
        display: "inline-block",
        borderRadius: 100,
        boxShadow: "1px 1px 1px #AAA",
      }}
    ></div>
  );
}

type MacroNameType = `${MacroName}`;

interface Macro {
  macroName: MacroName;
  macroConfig: Partial<MacroConfig>;
}

export const twinkleMacro = (
  macroConfig: Partial<MacroTwinkleConfig>
): Macro => ({
  macroName: MacroName.Twinkle,
  macroConfig,
});

export const meteorShowerMacro = (
  macroConfig: Partial<MacroMeteorShowerConfig>
): Macro => ({
  macroName: MacroName.MeteorShower,
  macroConfig,
});

export const solidColorMacro = (
  macroConfig: Partial<MacroColorConfig>
): Macro => ({
  macroName: MacroName.SolidColor,
  macroConfig,
});

export const textMacro = (macroConfig: Partial<MacroTextConfig>): Macro => ({
  macroName: MacroName.Text,
  macroConfig,
});

export default function BigdotsDisplay({
  layers,
  dimensions,
}: {
  layers: Macro[];
  macroName?: MacroNameType;
  macroConfig?: Partial<MacroConfig>;
  dimensions: Dimensions;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createDisplayEngine({
      macroName: (layers[0].macroName as MacroName) || MacroName.Text,
      macroConfig: layers[0].macroConfig || {},
      dimensions: dimensions,
      onPixelChange: (pixel) => {
        if (ref.current === null) return;
        updateDot(ref.current, pixel);
      },
    });
  }, []);

  const { height, width } = dimensions;

  var adjustedBrightness = (50 + 100 / 2) / 100;

  return (
    <div ref={ref} style={{ background: "#000" }}>
      {[...Array(height).keys()].map((y) => (
        <Row y={y} opacity={adjustedBrightness} key={`row_${y}`}>
          {[...Array(width).keys()].map((x) => (
            <Column y={y} x={x}>
              <Dot y={y} x={x} />
            </Column>
          ))}
        </Row>
      ))}
    </div>
  );
}
