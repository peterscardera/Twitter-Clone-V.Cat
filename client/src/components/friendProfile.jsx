import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { COLORS } from "../constants";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FriendProfile = () => {
  const [clickedProfileState, setClickedProfileState] = useState(null);
  const [tweetFeed, setTweetFeed] = useState("");


  let { profileId } = useParams();

  useEffect(() => {
    const clickedProfile = async () => {
      try {
        let data = await fetch(`/api/${profileId}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
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
  }, [profileId]);

  useEffect(() => {
    const feedRetriever = async () => {
      try {
        let data = await fetch(`/api/${profileId}/feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
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
  }, [profileId]);

  console.log(tweetFeed.tweetsById, "****");

  return (
    <>
      <Layout>
        <Profile>
        {clickedProfileState != null && (
          <>
            
              <div>
                <BannerImg src={clickedProfileState.profile.bannerSrc} />
                {/* <AvatarImg src={clickedProfileState.profile.avatarSrc} /> */}
              </div>
              <MiddleContainer>
                <DisplayName>
                  {" "}
                  {clickedProfileState.profile.displayName}
                </DisplayName>
                <HandleName> {clickedProfileState.profile.handle}</HandleName>
                <BioContainer>
                  <div> {clickedProfileState.profile.bio}</div>
                  <div>
                    <div> {clickedProfileState.profile.location}</div>
                    <div> {clickedProfileState.profile.joined}</div>
                  </div>
                  <Follows>
                    <Link
                      to={`/${clickedProfileState.profile.handle}/followers`}
                    >
                      Followers {clickedProfileState.profile.numFollowers}
                    </Link>
                    <Link
                      to={`/${clickedProfileState.profile.handle}/following`}
                    >
                      Following {clickedProfileState.profile.numFollowing}
                    </Link>
                  </Follows>
                </BioContainer>
              </MiddleContainer>
              <ActionBar>
                <StyledButton> Tweets </StyledButton>
                <StyledButton> Media </StyledButton>
                <StyledButton> Likes </StyledButton>
              </ActionBar>
          </>
        )}

        {tweetFeed != "" &&
          tweetFeed.tweetIds.map((item, i) => {
            return (
              <React.Fragment>
                <MainContainer>
                  <FirstRow>
                    {/* <AvatarImg
                      src={tweetFeed.tweetsById[item].author.avatarSrc}
                    /> */}
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
        </Profile>
      </Layout>
    </>
  );
};

export default FriendProfile;

const Profile = styled.div`
  height: 2000px;
  margin-left: 300px;
`;

const BannerImg = styled.img`
  max-width: 100%;
  position: relative;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 10px 0 0 5px ;
`;
const DisplayName = styled.div`
  font-weight: bold;
`;

const MiddleContainer = styled.div`
  margin-top: 10%;
  font-size: 1.2rem;
`;

const HandleName = styled.div`
  color: grey;
`;
const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* background: red; */
  height: 120px;
`;

const Follows = styled.div`
  display: flex;
`;

const ActionBar = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;

  border-bottom: 0.2px solid lightgrey;
`;
const StyledButton = styled.button`
  color: ${COLORS.primary};
  outline: none;
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  display: inline-block;
  border: none;
  text-decoration: none;
  cursor: pointer;
`;

const StyledImgPost = styled.img`
  border-radius: 15px;
  width: 400;
  height: 300px;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 60px;
  border-top: 1px solid ${COLORS.borders};
  /* margin-top: 20px; */
  /* border: 2px solid black; */

  &:hover {
    background: ${COLORS.borders};
    cursor: pointer;
`;

const FirstRow= styled.div``

