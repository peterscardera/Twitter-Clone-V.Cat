import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { CurrentUserContext } from "./CurrentUserContext";
import Tweets from "./Tweets";

const HomeFeed = () => {
 

  const [idState, setIdState] = useState("");
  const [tweetState, setTweetState] = useState("");

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
  }, []);

  const tweetHandler = data => {
    console.log(data);
    
    setTweetState(data.tweetsById);
    setIdState(data.tweetIds);
  };

  return (
    <>
      <Layout>
        {idState != "" &&
          tweetState != "" &&
          idState.map((orderId, i) => {
            return <Tweets key={i} orderId={orderId} tweetState={tweetState} />;
          })}
      </Layout>
    </>
  );
};

export default HomeFeed;
