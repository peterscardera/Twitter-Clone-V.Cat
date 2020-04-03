import React, { createContext, useReducer, useEffect } from "react";

export const FeedContext = createContext();

const INITIAL_DATA = {
  retrievedData: false,
  tweetId: null,
  tweetsByIds: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "retrievedData": {
      return {
        ...state,
        retrievedData: true,
        tweetsByIds: action.tweets,
        tweetId: action.ids
      };
    }
    case "updateLikes": {
      state.tweetsByIds[action.id].isLiked = action.likeStatus;
      return {
        ...state
      };
    }
    case "updateRetweet": {
      state.tweetsByIds[action.id].isRetweeted = action.retweetStatus;
      return {
        ...state
      };
    }
    case "updatePost": {
        console.log(action, "INSIDE UPDATE POSE ***")
      return {
        ...state,
        tweetsByIds: action.tweetsById,
        tweetId: action.tweetIds
      };
    }
  }
};

export const FeedContextProvider = ({ children }) => {
  const [homeFeedState, dispatch] = useReducer(reducer, INITIAL_DATA);

  console.log(homeFeedState);
  useEffect(() => {
    //only fetch on the first render if data feed has never been retrieved
    if (homeFeedState.retrievedData === false) {
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
    }
  }, []);

  //-------HANDLERS FOR CHANGES IN THE STATE WHICH WILL CAUSE A RE-RENDER--------------
  const tweetHandler = data => {
    // console.log(data);
    dispatch({
      type: "retrievedData",
      tweets: data.tweetsById,
      ids: data.tweetIds
    });
  };

  const likerHandler = data => {
    // console.log(data);
    dispatch({
      type: "updateLikes",
      ...data
    });
  };

  const retweetHandler = data => {
    dispatch({
      type: "updateRetweet",
      ...data
    });
  };
  const postHandler = data => {
      console.log(data)
    dispatch({
      type: "updatePost",
      ...data
    });
  };

  //--------------------------------------------------------------------------------

  return (
    <FeedContext.Provider
      value={{ homeFeedState, likerHandler, retweetHandler, postHandler }}
    >
      {children}
    </FeedContext.Provider>
  );
};
