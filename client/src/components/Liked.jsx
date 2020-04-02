import React, { useEffect, useState } from "react";

const Liked = ({ tweetLikedStatus }) => {
  const [clickState, setClickState] = useState(false);
  
  const clickHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      setClickState(!clickState)
      console.log(clickState,"*******")
      
        console.log(tweetLikedStatus);
  }
  //if its liked thehn PUT with body of false
  useEffect(() => {
    // if clicked and the status of isLicked
    const likeUnlike = async () => {

      if (clickState === true && tweetLikedStatus.isLiked === false) {
//-----------------IF ITS NOT LIKED ----------
console.log("asyc")

        try {
          let data = await fetch(`/api/tweet/${tweetLikedStatus.id}/like`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
            like: true
            })
          });
          console.log(data);
          if (data.status === 200) {
              let answer = await data.json()
              console.log(answer, "WE LIKED IT")
              setClickState(!clickState)
          } else {
              console.log("error")
            throw Error("not 200");
            
          }
        } catch (err) {
          console.log("error", err);
          
        }
        

//--------------- TO UNLIKE IF ITS ALREADY LIKED---------
      } else if (clickState === true && tweetLikedStatus.isLiked === true) {

        try {
            let data = await fetch(`/api/tweet/${tweetLikedStatus.id}/like`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                like: false
              })
            });
            console.log(data);
            if (data.status === 200) {
                let answer = await data.json()
                console.log(answer, "WE UNLIKED IT")
                    setClickState(!clickState)
            } else {
              throw Error("not 200");
            }
          } catch (err) {
            console.log("error", err);
          }

      }

    };
    likeUnlike();
  }, [clickState]);

  return (
    <>
      <button style = {{backgroundColor: tweetLikedStatus.isLiked ? 'green':'red'}} onClick={ clickHandler }> LIKE/UNLIKE </button>
    </>
  );
};

export default Liked;
