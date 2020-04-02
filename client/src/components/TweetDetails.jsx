import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useHistory, useLocation } from "react-router-dom";

const TweetDetails = () => {
  const location = useLocation();
  const tweetIdFromPath = location["pathname"].split("/")[2];

  const [statusOfData, setStatusOfData] = useState(false);
  const [individualTweet, setIndividualTweet] = useState(null);

  useEffect(() => {
    // console.log(tweetIdFromPath)
    const tweetDataDetails = async () => {
      try {
        let data = await fetch(`/api/tweet/${tweetIdFromPath}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        if (data.status === 200) {
          let tweetData = await data.json();
          setStatusOfData(true);
          setIndividualTweet(tweetData.tweet);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    tweetDataDetails();
  }, []);

  console.log(individualTweet);
  return (
    <React.Fragment>
      <Layout>
        {individualTweet != null && (
          <>
            <div> {individualTweet.author.displayName} </div>
            <div> {individualTweet.author.handle} </div>
            <div> {individualTweet.status} </div>
            <div> {individualTweet.timestamp} </div>
            <div> hi tweetdetails </div>
            <div> hi tweetdetails </div>
          </>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default TweetDetails;
