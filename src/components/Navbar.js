import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import axios from "axios";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  }
  async api_call() {
    console.log("API call button clicked");
    const res = await axios.get('https://c8mxkx0m65.execute-api.us-east-1.amazonaws.com/getName?');
    axios.get(`https://c8mxkx0m65.execute-api.us-east-1.amazonaws.com/getName?`)
      .then(res => {
        alert("hello  " + res.data.name + "  your lucky number for today is:" + res.data.rand.toFixed(1));
      })
  }
  async post() {
    axios.post('https://1w3ao3vzxk.execute-api.us-east-1.amazonaws.com/postName', { "firstName": 'swetha', "lastName": 'm', "age": 23 })
      .then((response) => { console.log(response); }, (error) => { console.log(error); });
    console.log("===========");

  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
            {/* <a >
              <button style={{ marginLeft: 5, backgroundColor: "lightblue" }} onClick={() => this.api_call()}>Get Method</button>
            </a>
            <a> <button style={{ marginLeft: 5 }} onClick={() => this.post()}>Post Method</button></a> */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
