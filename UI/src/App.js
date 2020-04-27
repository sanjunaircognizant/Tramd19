import React, { Component } from "react";
import { BrowserRouter, Route, Switch,  } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

import Rider from "./components/rider/Rider";
import Signin from "./components/rider/signin";
import Navigation from './components/Navigation';
import Dashboard from './components/official/dashboard';
import VerifyRide from "./components/rider/verifyRide";
import  { Redirect } from 'react-router-dom'
import Landing from './landing';

class App extends Component {

  state={
    isAuth:false
  }

  changeAuth=(val)=>{
    this.setState({isAuth:val})
  }

  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navigation isAuth={this.state.isAuth}/>
          <div style={{padding:"0 3rem"}}>
            
            <Switch>
              <Route path="/" exact>
                <Landing/>
              </Route>
              <Route path="/rider">
                <Rider />
              </Route>
             <Route path="/signin">
                <Signin changeAuth={this.changeAuth.bind(this)}/>
              </Route>
              <PrivateRoute path="/dashboard">
                <Dashboard/>
              </PrivateRoute>
              <Route path="/verify_ride">
                <VerifyRide/>
              </Route>
              <PrivateRoute path="/logout">
                <Logout changeAuth={this.changeAuth.bind(this)}/>
              </PrivateRoute>
              
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


function Logout(props){
  localStorage.removeItem('token');
  props.changeAuth(false);
  return (<Redirect to="/sigin"/>);
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (!(localStorage.getItem('token')==null)) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
