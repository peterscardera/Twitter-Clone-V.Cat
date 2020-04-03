import React from "react";
import { COLORS } from "../constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Liked from './Liked'
import Retweet from "./Retweet";


const Tweets = ({ orderId, tweetState }) => {




  const history = useHistory();
  //console.log(history)

  const handleDetailTweet = () => {
    history.push(`/tweet/${tweetState[orderId].id}`);
  };

  const handleLink = event => {
    // react has the event by default console.log(event);

    event.preventDefault();
    event.stopPropagation();

    history.push(`/profile/${tweetState[orderId].author.handle}`);
  };

  return (
    <React.Fragment>
      <MainContainer
        onClick={() => {
          handleDetailTweet();
        }}
      >
        <StyledAvatar src={tweetState[orderId].author.avatarSrc} />

        <SecondColumn>
          <FirstContainer>
            <div onClick={handleLink}>
              <strong>{tweetState[orderId].author.displayName} </strong>{" "}
            </div>
            <div> @{tweetState[orderId].author.handle} </div>
            <div> {tweetState[orderId].timestamp} </div>
          </FirstContainer>
          <div>{tweetState[orderId].status}</div>
          <div>
            {tweetState[orderId].media.length > 0 && (
              <StyledImgPost src={tweetState[orderId].media[0].url} />
            )}
      
          </div>
          <Liked  tweetLikedStatus={tweetState[orderId]}></Liked>
            <Retweet  tweetLikedStatus={tweetState[orderId]}> </Retweet>

        </SecondColumn>
      </MainContainer>
    </React.Fragment>
  );
};

export default Tweets;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 60px;
  border-top: 1px solid grey;
  /* border: 2px solid black; */

  &:hover {
    border: 1px solid ${COLORS.primary};
    cursor: pointer;
  }
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
const FirstContainer = styled.div`
  display: flex;
`;

const SecondColumn = styled.div``;
