import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import login from "./components/login";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<login />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
