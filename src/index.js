import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { HashRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Keycloak from "keycloak-js";
import axios from "axios";
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

let app = (
  <HashRouter basename={"/"}>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </HashRouter>
);

const kc = new Keycloak({
  realm: "test",
  url: "http://18.216.208.195:8080/auth/",
  "ssl-required": "none",
  resource: "test-app",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  "clientId": "test-app",
  // "clientSecret":"",
  // "enable-cors": true
});
kc.init({ onLoad: "login-required" }).success( authenticated => {
  console.log(authenticated,kc)
  if(authenticated){
    console.log(kc)
    ReactDOM.render(app,
      document.getElementById("root"));
  }
})
.error((e)=>{
  console.log(e)
})

// console.log(kc)
axios.interceptors.request.use(config =>{
  config.headers.Authorization = "Bearer " + kc.token;
  console.log(config)
  return Promise.resolve(config);
}
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
