import React, { useEffect } from "react";

const FollowUnfollow = ({ friendHandle, setClickState }) => {
  useEffect(() => {
    const followRequest = async () => {
      try {
        let data = await fetch(`/api/${friendHandle}/follow`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        setClickState(true);
        if (data.status === 409) {
          try {
            let data = await fetch(`/api/${friendHandle}/unfollow`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            });
            setClickState(true);
          } catch (err) {
            console.log("error", err);
          }
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    followRequest();
  }, []);

  return (
    <>
      <div>TEST</div>
      <div>TEST</div>
      <div>TEST</div>
    </>
  );
};

export default FollowUnfollow;
