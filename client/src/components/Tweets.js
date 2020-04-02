import React, { useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Liked from './Liked'

const Tweets = ({ orderId, tweetState }) => {
 console.log(tweetState[orderId]);
  // console.log(tweetState[orderId].id, "HEEEERREE***");
  // {tweetState[orderId].media.length > 0 && (<img src={tweetState[orderId].media[0].url}/>) }
  //tweetState[orderId].author[handle]
  //tweetState[orderId].author[avatarSrc]

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
            <Liked tweetLikedStatus={tweetState[orderId]}></Liked>
          </div>

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
  border: 2px solid black;

  &:hover {
    border: 1px solid red;
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
