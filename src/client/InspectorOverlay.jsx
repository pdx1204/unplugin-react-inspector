/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo } from "react";

const InspectorOverlay = memo((props) => {
  const { document } = window;
  document.addEventListener("click", (e) => {
    console.log(e, props.dataKey);
    const { target } = e;
    const dataKeyValue = target.getAttribute(props.dataKey);
    console.log(dataKeyValue);
    fetch(`http://localhost:3000?file=${dataKeyValue}`);
  });
  return <div className="inspector-overlay">InspectorOverlay</div>;
});

export default InspectorOverlay;
