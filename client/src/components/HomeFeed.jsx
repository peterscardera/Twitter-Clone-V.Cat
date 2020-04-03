import React, { useEffect } from "react";
import Layout from "./Layout";
import styled from 'styled-components';
import Tweets from "./Tweets";
import TweetPoster from "./TweetPoster";

const INITIAL_DATA = {
  retrievedData: false,
  updateData: false,
  tweetId: null,
  tweetsByIds: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "retrivedData": {
      return {
        ...state,
        retrievedData: true,
        tweetId: action.ids,
        tweetsByIds: action.tweets
      };
    }
  }
};

const HomeFeed = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_DATA);

  const [refetch, setReFetch] = React.useState(false);

  console.log(state);
  useEffect(() => {
    const tweetFeedData = async () => {
      try {
        let data = await fetch("/api/me/home-feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        if (data.status === 200) {
          let feedData = await data.json();

          tweetHandler(feedData);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    tweetFeedData();
  }, [refetch]); // will still do it on first render

  const tweetHandler = data => {
    // console.log(data);
    dispatch({
      type: "retrivedData",
      tweets: data.tweetsById,
      ids: data.tweetIds
    });
  };

  return (
    <React.Fragment>
      <Layout>
        <StyledFeed>
          <TweetPoster stateOfUser={state} setReFetch={setReFetch} refetch={refetch}></TweetPoster>
          {state.tweetId != null &&
            state.tweetsByIds != null &&
            state.tweetId.map((orderId, i) => {
              return (
                <Tweets
                  key={i}
                  orderId={orderId}
                  tweetState={state.tweetsByIds}
                  setReFetch={setReFetch}
                  refetch={refetch}
                />
              );
            })}

      </StyledFeed>
        </Layout>
    </React.Fragment>
  );
};

export default HomeFeed;

const StyledFeed = styled.div`
width: 70vw;
border-right: 1px solid grey;
/* background: red; */
`


