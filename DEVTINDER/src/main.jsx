import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import appStore from "./utils/appStore.js";

import App from "./components/App.jsx";

import {Provider} from "react-redux"

createRoot(document.getElementById("root")).render(

  <Provider store={appStore}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
);
