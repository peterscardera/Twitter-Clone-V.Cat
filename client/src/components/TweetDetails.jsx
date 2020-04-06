import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import Liked from "./Liked";
import Retweet from "./Retweet";
import { FiShare } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";

const TweetDetails = () => {
  const location = useLocation();
  const tweetIdFromPath = location["pathname"].split("/")[2];

  const [statusOfData, setStatusOfData] = useState(false);
  const [individualTweet, setIndividualTweet] = useState(null);

  useEffect(() => {
    // console.log(tweetIdFromPath)
    const tweetDataDetails = async () => {
      try {
        let data = await fetch(`/api/tweet/${tweetIdFromPath}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (data.status === 200) {
          let tweetData = await data.json();
          setStatusOfData(true);
          setIndividualTweet(tweetData.tweet);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    tweetDataDetails();
  }, []);

  console.log(individualTweet);
  return (
    <React.Fragment>
      <Layout>
        {individualTweet != null && (
          <>
            <MainComponant>
              <StyledContainer>
                <FirstRow>
                  <StyledAvatar src={individualTweet.author.avatarSrc} />
                  <StyledDisplay>
                    {individualTweet.author.displayName}
                  </StyledDisplay>
                  <div> @{individualTweet.author.handle} </div>
                </FirstRow>
                <SecondRow>
                  <div> {individualTweet.status} </div>
                  <div> {individualTweet.timestamp} </div>
                  {individualTweet.media.length > 0 && (
                    <StyledImgPost src={individualTweet.media[0].url} />
                  )}
                  <Actions>
                    {/* <Liked tweetLikedStatus={individualTweet.id}></Liked>
                  <Retweet tweetLikedStatus={individualTweet.id}> </Retweet> */}
                    <FiShare size={27} />
                    <FiMessageCircle size={27} />
                  </Actions>
                </SecondRow>
              </StyledContainer>
            </MainComponant>
          </>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default TweetDetails;

const StyledContainer = styled.div`
  width: 60vw;
  height: 98vh;
  margin-left: 300px;
  /* background: red; */
  border: 1px solid ${COLORS.borders};
  display:flex;
  flex-direction:column;
  align-items: space-evenly;
`;

const MainComponant = styled.div`
  height: 100vh;
  display: flex; 
`;
const StyledAvatar = styled.img`
  border-radius: 50%;

  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const StyledImgPost = styled.img`
  border-radius: 15px;
  width: 650px;
  height: 500px;
`;

const StyledDisplay = styled.div`
  font-weight: bold;
`;

const Actions = styled.div`
  margin-top: 10px;
  width: 60%;
  display: flex;
  /* background: red; */
  justify-content: space-between;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondRow = styled.div`
margin-top:20px;
display:flex;
flex-direction:column;
align-content: space-between;
`