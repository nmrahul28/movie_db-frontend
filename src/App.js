import Login from './components/login.js';
import Home from './components/home.js';
import fireAuth from './configuration/authenticationConfig';
import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from 'react'
import Register from './components/register.js';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userDetails: {}
    }
  }

  componentDidMount() {
    fireAuth.auth().onAuthStateChanged((response) => {
      if (response) {
        console.log(response);
        this.setState({ userDetails:response });
      } else {
        this.setState({ userDetails: null });
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Login}></Route>
        <Route path='/signup' component={Register}></Route>
        <Route path='/home' component={Home}></Route>
      </BrowserRouter>
    )
  }
}

export default App;
