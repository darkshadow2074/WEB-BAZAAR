import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import DataContextProvider from "./context/DataContext";
import { AuthProvider } from "./context/authContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
