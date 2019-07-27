import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { createBrowserHistory } from "history";
import store from "./store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);

registerServiceWorker();
