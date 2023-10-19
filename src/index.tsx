import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { editorinput } from "./Editor_input";

declare let window: editorinput;

const rootElement = document.querySelector("#root");
// const customData: any = document
//   .getElementById("root")!
//   .getAttribute("data-custom-data");
const customData = window.data;

if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App variable={customData} />
  </React.StrictMode>
);
