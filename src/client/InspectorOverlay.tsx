/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo, useEffect, useState } from "react";
import { InspectorOptions } from "../types";

function debounce(fn: { (e: MouseEvent): void }, wait = 50, immediate = true) {
  let timer: NodeJS.Timeout | null = null;

  return function (...args: [e: MouseEvent]) {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(this, args);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const InspectorOverlay = memo((props: InspectorOptions) => {
  const { document } = window;

  const [fileLocation, setFileLocation] = useState("");
  const [inspectorOverlayStyle, setInspectorOverlayStyle] = useState({});
  const [inspectorInfoStyle, setInspectorInfoStyle] = useState({});
  const [enabledInspector, setEnabledInspector] = useState(props.enabled);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setInspectorOverlayStyle({ display: "none" });
    });
  }, []);

  const handleMouseMove = debounce((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dataKeyValue = target.getAttribute(props.dataKey);
    if (!dataKeyValue) return;
    const rect = target.getBoundingClientRect();
    const top = rect.top - 5;
    const left = rect.left - 10;
    setInspectorOverlayStyle({
      display: "block",
      width: rect.width,
      height: rect.height,
      top,
      left,
    });
    if (top < 60) {
      setInspectorInfoStyle({ transform: "translate(-50%, 100%)" });
    } else {
      setInspectorInfoStyle({});
    }
    setFileLocation(dataKeyValue);
  });

  const handleClick = () => {
    fetch(`http://localhost:${props.port}?file=${fileLocation}`, {
      mode: "no-cors",
    });
  };

  return (
    <>
      {enabledInspector && (
        <div
          id="inspector-overlay"
          className="inspector-overlay"
          style={inspectorOverlayStyle}
          onClick={handleClick}
        >
          <div className="inspector-info" style={inspectorInfoStyle}>
            {fileLocation}
          </div>
        </div>
      )}

      <label id="inspector-overlay-checkbox-label" htmlFor="inspector-overlay-checkbox">
        <input
          id="inspector-overlay-checkbox"
          type="checkbox"
          name="inspector-overlay"
          value="Inspector"
          checked={enabledInspector}
          onChange={() => setEnabledInspector(!enabledInspector)}
        />
        <div className="label-text">Inspector</div>
      </label>
    </>
  );
});

export default InspectorOverlay;
