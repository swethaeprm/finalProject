import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { home } from "./components/Home";
import { login } from "./components/auth/LogIn";
import { attributes } from "./components/auth/Attributes";
import { Attributes } from "./components/auth/Attributes";

library.add(faEdit);

class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
// us-east-1_mzLcr39E2   1oqraau9m7aspgrnskevcqda0d
    this.setState({ isAuthenticating: false });
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
    axios.post('https://1w3ao3vzxk.execute-api.us-east-1.amazonaws.com/postName', { "firstName": 'swetha', "lastName": 'M', "age": 23 })
      .then((response) => { console.log(response); }, (error) => { console.log(error); });
    console.log("===========");

  }
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>

            <Navbar auth={authProps} />
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
              <Route exact path="/products" render={(props) => <Products {...props} auth={authProps} />} />
              <Route exact path="/admin" render={(props) => <ProductAdmin {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/attributes" render={(props) => <Attributes {...props} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
        <button style={{marginLeft: 5,backgroundColor: "lightblue"}} onClick={() => this.api_call()}>Get Method</button>
        <button style={{marginLeft: 5}} onClick={() => this.post()}>Post Method</button>

        {/* <div>dsfdsfd <Router><Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} /></Router>
      </div> */}
      </div >
    );
  }
}

export default App;
