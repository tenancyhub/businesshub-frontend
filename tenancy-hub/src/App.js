import React, { Fragment } from "react";
import NavBar from "./components/NavBar/NavigationBar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Pages/Login-Modal/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage";
import MerchantDashboard from "./Pages/Dashboard/Merchant-Dashboard";
import { Provider } from "react-redux";
import store from "./Store";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/Login" component={Login} />
          <Route path="/admin" component={MerchantDashboard} />
          <Route path="/register" component={SignUp} />
          <Route component={ErrorPage} />
        </Switch>
      </Fragment>
    </Provider>
  );
};

export default App;
