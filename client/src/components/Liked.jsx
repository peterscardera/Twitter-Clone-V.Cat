import React from "react";

const Liked = ({ tweetLikedStatus, setReFetch,refetch }) => {

console.log(tweetLikedStatus,"****")
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
        let answerstring = !tweetLikedStatus.isLiked
          ? "WE LIKED IT"
          : "WE UNLIKED IT";
        tweetLikedStatus.isliked = !tweetLikedStatus.isliked
        setReFetch(!refetch)
        console.log(answer, answerstring);
        //setClickState(!clickState);
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
