import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./assets/css/index.css";
import App from "./App";
import history from "./history";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const onRedirectCallback = (appState) => {
  history.replace(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
  history.go(0);
};

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />,
  </Auth0Provider>,
  document.getElementById("root")
);
