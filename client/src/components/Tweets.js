import React, { useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

let displayData = [];

const Tweets = ({ orderId, tweetState }) => {
  //   // console.log(tweetState[orderId].status);
  console.log(tweetState[orderId]);
  // {tweetState[orderId].media.length > 0 && (<img src={tweetState[orderId].media[0].url}/>) }
  //tweetState[orderId].author[handle]
  //tweetState[orderId].author[avatarSrc]

  return (
    <>
      <MainContainer>
        <StyledAvatar src={tweetState[orderId].author.avatarSrc} />

        <SecondColumn>
          <FirstContainer>
            <div>
              <Link onClick={()=> {console.log(tweetState[orderId].author.displayName)}} to="/profile">
                <strong>{tweetState[orderId].author.displayName} </strong>{" "}
              </Link>
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
        </SecondColumn>
      </MainContainer>
    </>
  );
};

export default Tweets;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 60px;
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
