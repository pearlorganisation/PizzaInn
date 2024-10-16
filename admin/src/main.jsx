import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./features/store.js";
import persistStore from 'redux-persist/es/persistStore.js';
import { PersistGate } from 'redux-persist/integration/react';
import { injectStore } from "./services/axiosInterceptor.js";

injectStore(store)
let persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById("root")).render(
  
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
  
      <App />
    
    </PersistGate>
  </Provider>
);
