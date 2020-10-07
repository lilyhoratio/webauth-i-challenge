import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const blankCredentials = { username: "", password: "" };
  const [credentials, setCredentials] = useState(blankCredentials);

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    console.log("Here");
    axios
      .post("http://localhost:4445/api/auth/login", credentials)
      .then(res => {
        console.log("here");
        // localStorage.setItem("token", res.data.payload);
        setCredentials(blankCredentials);
      })
      .catch(err => console.log(err));
    props.history.push("/");
  };

  return (
    <form className="form-class" onSubmit={login}>
      <input
        type="text"
        name="username"
        value={credentials.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
