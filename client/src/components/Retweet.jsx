import React from "react";
import { FeedContext } from "./FeedContext";
import TweetActionIcon from "./TweetActionIcon";

const Retweet = ({ tweetLikedStatus }) => {
  const { retweetHandler } = React.useContext(FeedContext);

  const clickHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    likeUnlike(); //**CALLS THE ASYBC FUNCTION TO FETCH*****/
  };

  const likeUnlike = async () => {
    //-----------------IF CLICKED----------

    try {
      let data = await fetch(`/api/tweet/${tweetLikedStatus.id}/retweet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          retweet: !tweetLikedStatus.isRetweeted
        })
      });
      console.log(data);
      if (data.status === 200) {
        let answer = await data.json();
        // console.log(answer)
        retweetHandler({
          id: tweetLikedStatus.id,
          retweetStatus: !tweetLikedStatus.isRetweeted
        });
      } else {
        console.log("error");
        throw Error("not 200");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <React.Fragment>
      {tweetLikedStatus.isRetweeted ? (
        <div onClick={clickHandler}>
          <TweetActionIcon kind="retweet" size={20} color={"green"} />
        </div>
      ) : (
        <div onClick={clickHandler} >
          <TweetActionIcon kind="retweet" size={20} color={"white"} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Retweet;
