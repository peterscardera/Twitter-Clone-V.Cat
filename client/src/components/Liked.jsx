import React from "react";
import { FeedContext } from "./FeedContext";
import Heart from "./Heart";

const Liked = ({ tweetLikedStatus }) => {
  console.log(tweetLikedStatus, "HIT FROM FRIENDPROFILE")
  const { likerHandler } = React.useContext(FeedContext);
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
          "Accept": "application/json"
        },
        body: JSON.stringify({
          like: !tweetLikedStatus.isLiked
        })
      });
      console.log(data);
      if (data.status === 200) {
        let answer = await data.json();
        // console.log(answer)// the answer of the server should be success
        likerHandler({
          id: tweetLikedStatus.id,
          likeStatus: !tweetLikedStatus.isLiked
        });
      } else {
        console.log("error");
        throw Error("not 200");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  // console.log(tweetLikedStatus.isLiked, " IN LIKED BUTTON");

  return (
    <React.Fragment>
      {tweetLikedStatus.isLiked ? (
        <div onClick={clickHandler}>
          <Heart width={22} isToggled={true} />
        </div>
      ) : (
        <div onClick={clickHandler}> <Heart width={20}/>  </div>
         
      )}
      {/* <FaRegHeart></FaRegHeart> */}
    </React.Fragment>
  );
};

export default Liked;
