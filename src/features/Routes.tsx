import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LogIn from "./login/components/LogIn";
import Devices from "./devices/components/Devices";
import { useAppSelector } from "../app/hooks";
import { selectIsLoggedIn } from "./login/logInSlice";

const Routes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Router>
      {isLoggedIn ? <Redirect to="/devices" /> : <Redirect to="/login" />}
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/devices" component={Devices} />
      </Switch>
    </Router>
  );
};

export default Routes;
