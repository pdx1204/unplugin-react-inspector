/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo, useEffect, useState } from "react";

const InspectorOverlay = memo((props) => {
  const { document } = window;

  const [fileLocation, setFileLocation] = useState("");
  const [inspectorOverlayStyle, setInspectorOverlayStyle] = useState({});

  useEffect(() => {
    // TODO 防抖
    document.addEventListener("mousemove", (e) => {
      console.log(e, props.dataKey);
      const { target } = e;
      console.log(target);
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
  }, []);

  const handleClick = () => {
    fetch(`http://localhost:${props.port}?file=${fileLocation}`, {
      mode: "no-cors",
    });
  };

  return (
    <div
      id="inspector-overlay"
      className="inspector-overlay"
      style={inspectorOverlayStyle}
      onClick={handleClick}
    >
      <div className="inspector-info">{fileLocation}</div>
    </div>
  );
});

export default InspectorOverlay;
