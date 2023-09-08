import React from "react";
import Register from "./component/Authentication/Register/Register";
import Login from "./component/Authentication/Login/Login";
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <Register />
      {/* <Login /> */}
    </div>
  );
}
