import "./index.css";
import { createRoot } from "react-dom/client";
import InspectorOverlay from "./InspectorOverlay";
import { InspectorOptions } from "../types";

export const createClient = (options: InspectorOptions) => {
  console.log("createClient", options);
  const fragment = document.createDocumentFragment();
  const inspectorContainer = document.createElement("div");
  inspectorContainer.setAttribute("id", "unplugin-react-inspector");
  fragment.appendChild(inspectorContainer);
  createRoot(inspectorContainer).render(<InspectorOverlay {...options} />);
  document.body.appendChild(fragment);
};
