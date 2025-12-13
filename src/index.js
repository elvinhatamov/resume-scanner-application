// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style.css";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { ThemeProvider } from "./context/ThemeContext";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yRZLjI1lK",
  client_id: "1hj5ncp9olo3kdpi5t5bjshjgb",
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  response_type: "code",
  scope: "email openid phone",
  onSigninCallback: (user) => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  onSignoutCallback: () => {
    localStorage.clear();
    window.location.href = window.location.origin;
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
