import React from "react";
import { COLORS } from "../constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Liked from "./Liked";
import Retweet from "./Retweet";
import { FiShare} from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import isoConverter from "./Iso-date-converter"

const Tweets = ({ orderId, tweetState }) => {
  const history = useHistory();
  //console.log(history)

  const handleDetailTweet = () => {
    history.push(`/tweet/${tweetState[orderId].id}`);
  };

  const handleLink = (event) => {
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
            <StyledDisplay onClick={handleLink}>
              {tweetState[orderId].author.displayName}
            </StyledDisplay>
            <StyledHandler> @{tweetState[orderId].author.handle} </StyledHandler>
          </FirstContainer>
          <StyledStatus>{tweetState[orderId].status}</StyledStatus>
          <div>
            {tweetState[orderId].media.length > 0 && (
              <StyledImgPost src={tweetState[orderId].media[0].url} />
              )}
          </div>
          <Actions>
            <Liked tweetLikedStatus={tweetState[orderId]}></Liked>
            <Retweet tweetLikedStatus={tweetState[orderId]}> </Retweet>
            <FiShare size={20}/>
            <FiMessageCircle size={20}/>
              <StyledTime> {isoConverter(tweetState[orderId].timestamp)} </StyledTime>
          </Actions>
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
  border-top: 1px solid ${COLORS.borders};
  /* margin-top: 20px; */
  /* border: 2px solid black; */

  &:hover {
    background: ${COLORS.borders};
    cursor: pointer;
  }
`;
const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 10px 0 0 5px ;
`;

const StyledStatus = styled.div`
font-size: .9rem;
margin: 10px 0px;
`
const StyledTime = styled.div`
font-size:.7rem;
color:whitesmoke;
align-self: flex-end;
justify-content: flex-end;
`

const StyledHandler = styled.div`
color: gray;
opacity: .9;
font-weight: 600;
font-size: .7rem;
margin-left: 10px;
`

const StyledImgPost = styled.img`
  border-radius: 15px;
  width: 280px;
  height: 200px;
`;
const FirstContainer = styled.div`
  display: flex;
  margin: 20px 0px
`;

const SecondColumn = styled.div``;

const StyledDisplay = styled.div`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Actions = styled.div`
margin-top: 10px;
width: 95%;
display:flex;
/* background: red; */
justify-content: space-between;
`