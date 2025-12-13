// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./style.css";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yRZLjI1lK",
  client_id: "1hj5ncp9olo3kdpi5t5bjshjgb",
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "email openid phone",
  onSigninCallback: (user) => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
