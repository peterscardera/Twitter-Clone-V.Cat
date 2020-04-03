import React from "react";
import { FeedContext } from "./FeedContext";

const Liked = ({ tweetLikedStatus}) => {


  const {  likerHandler } = React.useContext(FeedContext)

  const clickHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    likeUnlike(); //**CALLS THE ASYBC FUNCTION TO FETCH*****/
  };
 
  const likeUnlike = async () => {
    //-----------------IF CLICKED----------
   

    try {
      let data = await fetch(`/api/tweet/${tweetLikedStatus.id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          like: !tweetLikedStatus.isLiked
        })
      });
      console.log(data);
      if (data.status === 200) {
        let answer = await data.json();
       // console.log(answer)// the answer of the server should be success
        likerHandler({ id: tweetLikedStatus.id, likeStatus: !tweetLikedStatus.isLiked
        })

  
      } else {
        console.log("error");
        throw Error("not 200");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  console.log(tweetLikedStatus.isLiked , " IN LIKED BUTTON")

  return (
    <React.Fragment>
      {tweetLikedStatus.isLiked ? (
        <button style={{ backgroundColor: "green" }} onClick={clickHandler}>
          LIKED 
        </button>
      ) : (
        <button style={{ backgroundColor: "red" }} onClick={clickHandler}>
          LIKE
        </button>
      )}
    </React.Fragment>
  );
};

export default Liked;
