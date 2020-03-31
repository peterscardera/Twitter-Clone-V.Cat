import React from "react";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
