import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const firebaseConfig = {
  apiKey: "AIzaSyDz6pynCXdCsuF4XwMY1iHvTYSwzRANTu8",
  authDomain: "comicconfessions-7f09b.firebaseapp.com",
  projectId: "comicconfessions-7f09b",
  storageBucket: "comicconfessions-7f09b.appspot.com",
  messagingSenderId: "872048187977",
  appId: "1:872048187977:web:0e9c0d1ff2aa94cc137d98",
  measurementId: "G-Q25RMQH049",
};

const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
