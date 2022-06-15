/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { compose } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import allReducers from "./redux/reducers";

import App from "App";

const composedEnhancer = compose(
  applyMiddleware(thunkMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(allReducers, composedEnhancer);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
