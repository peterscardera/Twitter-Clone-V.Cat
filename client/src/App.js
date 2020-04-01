import React from "react";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import GlobalStyles from "./components/GlobalStyles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CurrentUserContext } from "./components/CurrentUserContext";

const App = () => {
  const { status } = React.useContext(CurrentUserContext);

  return (
    <React.Fragment>
      <div>
        {status ? (
          <Router>
            <GlobalStyles />
            <Switch>
              <Route exact path="/">
                <HomeFeed></HomeFeed>
              </Route>
              <Route exact path="/notifications">
                <Notifications></Notifications>
              </Route>
              <Route exact path="/bookmarks">
                <Bookmarks></Bookmarks>
              </Route>
              <Route exact path="/tweet/:tweetID">
                <TweetDetails></TweetDetails>
              </Route>
              <Route exact path="/:profileId">
                <Profile></Profile>
              </Route>
            </Switch>
          </Router>
        ) : (
          "LOADING"
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
