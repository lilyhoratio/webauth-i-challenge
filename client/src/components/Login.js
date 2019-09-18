import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Icon, Button } from "antd";

const Login = props => {
  const blankCredentials = { username: "", password: "" };
  const [credentials, setCredentials] = useState(blankCredentials);

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4445/api/login", credentials)
      .then(res => {
        // console.log("API - POST RESPONSE", res)
        localStorage.setItem("token", res.data.payload);
      })
      .catch(err => console.log(err));
    setCredentials(blankCredentials);
    props.history.push("/");
  };

  return (
    <Form className="form-class" onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Item>
      <Button>Login</Button>
    </Form>
  );
};

export default Login;
