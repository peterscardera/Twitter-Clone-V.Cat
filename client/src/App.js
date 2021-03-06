import React from "react";
import styled from "styled-components"
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import FriendProfile from "./components/friendProfile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import GlobalStyles from "./components/GlobalStyles";
// import { ReactComponent as Logo } from "./Assets/logo.svg";
import Loading from "./components/Loading"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CurrentUserContext } from "./components/CurrentUserContext";

const App = () => {
  const { status} = React.useContext(CurrentUserContext);

  return (
    <React.Fragment>
      <Wrapper>
        {status ? (
          <Router>
            <GlobalStyles />
            <Switch>
              <Route exact path="/">
                <HomeFeed></HomeFeed>
              </Route>

              {/* <Route exact path="/notifications">
                <Notifications></Notifications>
              </Route>

              <Route exact path="/bookmarks">
                <Bookmarks></Bookmarks>
              </Route> */}

              <Route exact path="/tweet/:tweetID">
                <TweetDetails></TweetDetails>
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
          <Loading />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default App;


const Wrapper = styled.div`
display:flex;
justify-content:center;

`
