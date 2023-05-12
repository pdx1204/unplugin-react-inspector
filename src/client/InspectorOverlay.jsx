/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo, useEffect, useState } from "react";

function debounce(fn, wait = 50, immediate = true) {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(this, args);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const InspectorOverlay = memo((props) => {
  const { document } = window;

  const [fileLocation, setFileLocation] = useState("");
  const [inspectorOverlayStyle, setInspectorOverlayStyle] = useState({});
  const [enabledInspector, setEnabledInspector] = useState(props.enabled);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseMove = debounce((e) => {
    const { target } = e;
    console.log(e, props.dataKey, target);
    const dataKeyValue = target.getAttribute(props.dataKey);
    if (!dataKeyValue) return;
    const rect = target.getBoundingClientRect();
    setInspectorOverlayStyle({
      width: rect.width,
      height: rect.height,
      top: rect.top - 5,
      left: rect.left - 10,
    });
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
          <div className="inspector-info">{fileLocation}</div>
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
