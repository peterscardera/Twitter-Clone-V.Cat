import React, { useEffect } from "react";
import Layout from "./Layout";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FriendProfile = () => {
  const [clickedProfileState, setClickedProfileState] = React.useState(null);
  const [tweetFeed, setTweetFeed] = React.useState("");
  //  const { currentUserData }  = React.useContext(CurrentUserContext)

  let { profileId } = useParams();

  useEffect(() => {
    const clickedProfile = async () => {
      try {
        let data = await fetch(`/api/${profileId}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        console.log(data);
        if (data.status === 200) {
          let retrievedData = await data.json();
          setClickedProfileState(retrievedData);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    clickedProfile();
  }, []);

  useEffect(() => {
    const feedRetriever = async () => {
      try {
        let data = await fetch(`/api/${profileId}/feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        console.log(data);
        if (data.status === 200) {
          let individualTweetFeed = await data.json();
          setTweetFeed(individualTweetFeed);
        } else {
          throw Error("not 200");
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    feedRetriever();
  }, []);

  console.log(tweetFeed.tweetsById, "****");

  return (
    <>
      <Layout>
        {clickedProfileState != null && (
          <>
            <BannerContainer>
              <ImgBanner src={clickedProfileState.profile.bannerSrc} />
              <ImgAvatar src={clickedProfileState.profile.avatarSrc} />
            </BannerContainer>

            <div> {clickedProfileState.profile.displayName}</div>
            <div> {clickedProfileState.profile.handle}</div>
            <div> {clickedProfileState.profile.bio}</div>
            <div> {clickedProfileState.profile.location}</div>
            <div> {clickedProfileState.profile.joined}</div>
            <Link to={`/${clickedProfileState.profile.handle}/followers`}>
              Followers {clickedProfileState.profile.numFollowers}
            </Link>
            <Link to={`/${clickedProfileState.profile.handle}/following`}>
              Following {clickedProfileState.profile.numFollowing}
            </Link>
          </>
        )}

        <ActionBar>
          <div> Tweets </div>
          <div> Media </div>
          <div> Likes </div>
        </ActionBar>
        {tweetFeed != "" &&
          tweetFeed.tweetIds.map((item, i) => {
            return (
              <React.Fragment>
                <MainContainer>
                  <FirstRow>
                    <StyledAvatar
                      src={tweetFeed.tweetsById[item].author.avatarSrc}
                    />
                    <div>{tweetFeed.tweetsById[item].author.displayName}</div>
                    <div>@{tweetFeed.tweetsById[item].author.handle}</div>
                    <div>{tweetFeed.tweetsById[item].timestamp}</div>
                  </FirstRow>
                    <div>{tweetFeed.tweetsById[item].status}</div>
                  <div>
                    {tweetFeed.tweetsById[item].media.length > 0 && (
                      <StyledImgPost
                        src={tweetFeed.tweetsById[item].media[0].url}
                      />
                    )}
                  </div>
                </MainContainer>
              </React.Fragment>
            );
          })

        //<div> {tweetFeed.tweetIds[0]} </div>
        }
      </Layout>
    </>
  );
};

export default FriendProfile;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgBanner = styled.img`
  z-index: 1;
  position: relative;
`;
const ImgAvatar = styled.img`
  border-radius: 50%;
  border: 2px white solid;
  width: 10%;
  z-index: 2;
  position: absolute;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  color: purple;
  font-weight: bold;
  border-bottom: 1px grey groove;
`;

const MainContainer = styled.div`
  border: 2px solid black;

  /* &:hover {
    border: 1px solid red;
  } */
`;

const FirstRow = styled.div`
  display: flex;
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const StyledImgPost = styled.img`
  border-radius: 15px;
  width: 400;
  height: 300px;
`;
