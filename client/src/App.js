import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      {/* <Link></Link> */}
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/users" render={props => <Users {...props} />} />
    </div>
  );
}

export default App;
