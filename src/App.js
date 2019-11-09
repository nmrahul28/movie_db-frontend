import Login from './components/login.js';
import Home from './components/home.js';
import fireAuth from './configuration/authenticationConfig';
import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from 'react'
import Register from './components/register.js';
import MovieCardDetails from './components/MovieCardDetails.js';
import ProtectedRoute from './components/ProtectedRoute.js';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userDetails: {},
      authenticated: false
    }
  }

  componentDidMount() {
    fireAuth.auth().onAuthStateChanged((response) => {
      if (response) {
        console.log(response);
        this.setState({
          userDetails: response,
          authenticated: true
        });
      } else {
        this.setState({
          userDetails: null,
          authenticated:false
        });
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
        <ProtectedRoute path='/home' component={Home}></ProtectedRoute>
        <ProtectedRoute path='/details' component={MovieCardDetails}></ProtectedRoute>
      </BrowserRouter>
    )
  }
}

export default App;
