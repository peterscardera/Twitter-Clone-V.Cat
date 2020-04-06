import React from "react";
import Layout from "./Layout";
import { COLORS } from "../constants";
import styled from "styled-components";
import Tweets from "./Tweets";
import TweetPoster from "./TweetPoster";
import { FeedContext } from "./FeedContext";

const HomeFeed = () => {
  const { homeFeedState } = React.useContext(FeedContext);
  // console.log(homeFeedState, "IM IN HOMEFEED");

  return (
    <React.Fragment>
      <Layout>
        <StyledFeed>
          <TweetPoster stateOfUser={homeFeedState}></TweetPoster>
          {homeFeedState.tweetId != null &&
            homeFeedState.tweetsByIds != null &&
            homeFeedState.tweetId.map((orderId, i) => {
              return (
                <StyledSpan>
                  <Tweets
                    key={i}
                    orderId={orderId}
                    tweetState={homeFeedState.tweetsByIds}
                  />
                </StyledSpan>
              );
            })}
        </StyledFeed>
      </Layout>
      
    </React.Fragment>
  );
};

export default HomeFeed;

const StyledFeed = styled.div`
  width: 60vw;
  border: 1px solid ${COLORS.borders};
  margin-left: 300px;
`;

const StyledSpan = styled.span``;
