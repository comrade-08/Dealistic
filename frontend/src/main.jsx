import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import App from "./App.jsx";
import store from "./store/store.js";
import ThemeProviderWrapper from "./theme/ThemeProviderWrapper.jsx";
import "./styles/tailwind.css";
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProviderWrapper>
          <CssBaseline />
          <App />
        </ThemeProviderWrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
