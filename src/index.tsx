import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Macro,
  MacroConfig,
  MacroName,
  Pixel,
} from "@bigdots-io/display-engine/lib/esm/types";
import {
  colorLuminance,
  createDisplayEngine,
} from "@bigdots-io/display-engine";

export {
  solidColor,
  text,
  twinkle,
  meteorShower,
  marquee,
  image,
  time,
} from "@bigdots-io/display-engine";

export function updateDot(
  element: HTMLDivElement,
  { y, x, hex, brightness }: Pixel
) {
  var el = element.querySelectorAll(`[data-coordinates='${y}:${x}']`);
  if (el.length > 0) {
    const backgroundColor = hex
      ? ((el[0] as HTMLElement).style.background = colorLuminance(
          hex,
          (brightness * 10) / 100 - 1
        ))
      : "#444"; // inactive pixel color
    (el[0] as HTMLElement).style.background = backgroundColor;
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
  devMode = false,
}: {
  layers: Macro[];
  macroName?: MacroNameType;
  macroConfig?: Partial<MacroConfig>;
  dimensions: Dimensions;
  devMode?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [engine, setEngine] = useState<any>();
  const [stop, setStop] = useState<any>();

  useEffect(() => {
    setEngine(
      createDisplayEngine({
        dimensions: dimensions,
        onPixelsChange: (pixels) => {
          pixels.forEach((pixel) => {
            if (ref.current === null) return;
            updateDot(ref.current, pixel);
          });
        },
      })
    );
  }, []);

  useEffect(() => {
    renderDisplay();
  }, [engine, JSON.stringify(layers)]);

  const renderDisplay = useCallback(() => {
    if (!engine) return;
    const halt = engine?.render(layers);
    setStop(() => halt);
  }, [engine, JSON.stringify(layers), setStop]);

  const { height, width } = dimensions;

  var adjustedBrightness = (50 + 100 / 2) / 100;

  return (
    <>
      <div ref={ref} style={{ background: "#000" }}>
        {devMode && (
          <>
            <button onClick={() => stop()}>Stop</button>
            <button onClick={() => renderDisplay()}>Reload</button>
          </>
        )}
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
    </>
  );
}
