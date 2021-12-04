//import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import {
  createStore,
  applyMiddleware,
  // compose
} from "redux";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  //compose(applyMiddleware(thunk)),
  composeWithDevTools(
    // applyMiddleware(thunk, logger)
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
