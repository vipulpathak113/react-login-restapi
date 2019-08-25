import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Home from "./Home";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signin() {
    console.log(this.state);
    axios
      .post("http://127.0.0.1:8000/expense/login", this.state)
      .then(response => {
        if (response.data.token) {
          sessionStorage.setItem("userData", this.state.username);
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        console.log(err.response.data.error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    if (sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }

    return (
      <div>
        <h1>Login</h1>
        <p>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={this.onChange.bind(this)}
            required
          />
        </p>

        <p>
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={this.onChange.bind(this)}
            required
          />
        </p>

        <input
          type="button"
          name="login"
          value="LogIn"
          onClick={this.signin.bind(this)}
        />
      </div>
    );
  }
}

export default Login;
