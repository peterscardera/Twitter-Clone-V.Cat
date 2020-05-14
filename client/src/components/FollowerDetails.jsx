import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

//*****************SHARED COMPONENT THAT RENDERS THE FOLLOWERS AND FOLLOWING****************** */
const FollowerDetails = ({ aFriend }) => {
  //false means not following and true means following

  const [copyIsBeingFollowed, setCopyIsBeingFollowed] = useState(
    aFriend.isBeingFollowedByYou
  );

  const [buttonState, setButtonState] = useState(null);
  // console.log(buttonState, "BUTTONSTATUS");

  useEffect(() => {
    //we want to follow cause atm we are not

    const followRequest = async () => {
      if (buttonState === true) {
        try {
          let data = await fetch(`https://bootcamptwitterclone.herokuapp.com/api/${aFriend.handle}/follow`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          setCopyIsBeingFollowed(true);
          // console.log(data, "follow");
        } catch (err) {
          console.log("error", err);
        }
      } else if (buttonState === false) {
        try {
          let data = await fetch(`https://bootcamptwitterclone.herokuapp.com/api/${aFriend.handle}/unfollow`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          setCopyIsBeingFollowed(false);
          // console.log(data, "following");
        } catch (err) {
          console.log("error", err);
        }
      }
    };

    followRequest();
  }, [buttonState]);
  // console.log(setCopyIsBeingFollowed);
  return (
    <>
      <Wrapper>
        <Container>
          <StyledAvatar src={aFriend.avatarSrc} />
          <StyledFollowerDN>{aFriend.displayName}</StyledFollowerDN>
          <StyledFollowerHandle>@{aFriend.handle} </StyledFollowerHandle>

          {copyIsBeingFollowed === true ? (
            <StyledButton
              onClick={() => {
                setButtonState(false);
              }}
            >
         
              Unfollow
            </StyledButton>
          ) : (
            <StyledButton
              onClick={() => {
                setButtonState(true);
              }}
            >
              Follow
            </StyledButton>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default FollowerDetails;

const StyledFollowerHandle = styled.div`
  margin: 10px 0 10px 10px;
  color: gray;
  font-size: 0.8rem;
`;

const StyledFollowerDN = styled.div`
  margin: 10px 0 10px 10px;
  color: white;
  font-size: 1rem;
`;

const StyledAvatar = styled.img`
  margin: 10px 0 10px 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const Wrapper = styled.div`
  /* height:100vh; */
  margin-top: 20px;
  display:flex;
  justify-content:center;
`;
const Container = styled.div`
  position: relative;
  border: 1px solid ${COLORS.borders};
  width: 500px;

  @media (max-width: 900px){
    width:200px;
  }
`;

const StyledButton = styled.button`
margin-top:10px;
position:absolute;
top:0;
left: 82%;
  cursor: pointer;
  outline: none;
  width: 70px;
  height: 22px;
  border-radius: 25px;
  font-size: 0.8rem;
  background: ${COLORS.primary};
  opacity: 0.7;
  color: white;

  @media (max-width: 900px){
    left: 50%;
  }

`;
