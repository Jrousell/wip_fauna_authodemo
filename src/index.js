import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";

import App from "./App";
import Layout from "components/layout";
import Secure from "components/secure";
import { settings } from "utils/config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    console.log(appState);

    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain={settings.domain}
        clientId={settings.clientId}
        redirectUri={window.location.origin}
        audience={settings.audience}
        scope={settings.scopes}
        useRefreshTokens="true"
        cacheLocation="localstorage"
      >
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/secure"
              element={<ProtectedRoute component={Secure} />}
            />
          </Routes>
        </Layout>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  </React.StrictMode>
);
