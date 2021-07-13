import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./components/Alert";
import { Provider } from "react-redux";
import rootReducer from "./redux/State";
import Saga from "./redux/RootSagas";
import { BrowserRouter } from "react-router-dom";
import { initializeReactGA } from './tracking/track'

const reactAlertOptions = {
  timeout: 5000,
  position: "top right"
};

// redux config
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(Saga);
initializeReactGA();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...reactAlertOptions}>
      <App />
      </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
