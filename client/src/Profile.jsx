import React from "react";

const Profile = () => {
  const profileData = async () => {
    try {
      let data = await fetch("http://localhost:31415/api/me/profile", {
        method: "GET",
        mode:'cors'
      });
      console.log(data)
      let retrievedData = await data.text();
      console.log(retrievedData)
    } catch (err) {
      console.log(err);
    }
  };
profileData()
  return (
    <>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
    </>
  );
};

export default Profile;
