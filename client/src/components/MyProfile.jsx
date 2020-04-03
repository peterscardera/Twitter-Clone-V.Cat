import React from "react";
import Layout from "./Layout";
import { CurrentUserContext } from "./CurrentUserContext";

const MyProfile = () => {
  const { currentUserData } = React.useContext(CurrentUserContext);

  //currentUserData
  return (
    <React.Fragment>
      <Layout>
        {currentUserData != null && (
          <>
            <div>
              <img src={currentUserData.profile.bannerSrc} />
              <img src={currentUserData.profile.avatarSrc} />
            </div>

            <div> {currentUserData.profile.displayName}</div>
            <div> {currentUserData.profile.handle}</div>
            <div> {currentUserData.profile.bio}</div>
            <div> {currentUserData.profile.location}</div>
            <div> {currentUserData.profile.joined}</div>
            <div> {currentUserData.profile.numFollowers}</div>
            <div> {currentUserData.profile.numFollowing}</div>
          </>
        )}
        <div>
          <div> Tweets </div>
          <div> Media </div>
          <div> Likes </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default MyProfile;
