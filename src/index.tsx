import * as React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./component/app/App";
import { Provider } from "react-redux";
import store from "./store/stor";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
