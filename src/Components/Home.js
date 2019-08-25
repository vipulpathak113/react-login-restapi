import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      name: ""
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("userData")) {
      console.log(sessionStorage.getItem("userData"));
      this.setState({ name: sessionStorage.getItem("userData") });
    } else {
      this.setState({ redirect: true });
    }
  }

  logout() {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div>
        <div>Hi, {this.state.name}</div>
        <input
          type="button"
          name="logout"
          value="LogOut"
          onClick={this.logout.bind(this)}
        />
      </div>
    );
  }
}

export default Home;
