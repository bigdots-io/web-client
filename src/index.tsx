import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  MacroConfig,
  MacroName,
  Pixel,
} from "display-engine/lib/types";
import { createDisplayEngine } from "@bigdots-io/display-engine";
import { Macro } from "@bigdots-io/display-engine/lib/types";

export {
  solidColorMacro,
  textMacro,
  twinkleMacro,
  meteorShowerMacro,
} from "@bigdots-io/display-engine";

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
      macros: layers,
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
            <Column y={y} x={x} key={`row_${y}_col_${x}`}>
              <Dot y={y} x={x} />
            </Column>
          ))}
        </Row>
      ))}
    </div>
  );
}
