import React from "react";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import FriendProfile from "./components/friendProfile";
import MyProfile from "./components/MyProfile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import GlobalStyles from "./components/GlobalStyles";
import { ReactComponent as Logo } from "./Assets/logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { CurrentUserContext } from "./components/CurrentUserContext";

const App = () => {
  const { status} = React.useContext(CurrentUserContext);

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

              <Route exact path="/me">
                <MyProfile></MyProfile>
              </Route>

              <Route exact path="/profile/:profileId">
                <FriendProfile></FriendProfile>
              </Route>
              <Route exact path="/:handle/followers">
          <Followers></Followers>
              </Route>
              <Route exact path="/:handle/following">
          <Following></Following>
              </Route>
              
            </Switch>
          </Router>
        ) : (
          <Logo />
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
