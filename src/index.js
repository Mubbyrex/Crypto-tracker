import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import Context from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Context>
    <App />
  </Context>

);
