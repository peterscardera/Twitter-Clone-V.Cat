import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { FeedContext } from "./FeedContext";

const TweetPoster = () => {
  const [state, setState] = React.useState("");

  const { currentUserData } = React.useContext(CurrentUserContext);
  const { postHandler } = React.useContext(FeedContext);

  const postTweet = async () => {
    try {
      let data = await fetch(`https://bootcamptwitterclone.herokuapp.com/api/tweet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ status: state })
      });
      //if success fecth the new feed and bring it to the FE State to cause a re-render
      if (data.status === 200) {
        let dataWithPost = await fetch("https://bootcamptwitterclone.herokuapp.com/api/me/home-feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        let updatedFeed = await dataWithPost.json();
        // console.log(updatedFeed)
        postHandler(updatedFeed);
      } else {
        throw Error("not 200");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const submitHandler = e => {
    console.log('clicked')
    e.preventDefault();
    postTweet();
  };
  return (
    <React.Fragment>
      <StyledDiv>Home</StyledDiv>
      <StyledForm onSubmit={submitHandler}>
        <label htmlFor="tweet"></label>
        {currentUserData != null && (
          <StyledAvatar src={currentUserData.profile.avatarSrc} />
        )}

        <StyledTextarea
          maxLength={280}
          placeholder={"What's on your mind?"}
          id="tweet"
          value={state}
          onChange={e => {
            setState(e.target.value);
          }}
          required
        />
        <StyledPost>
          <StyledLength> {280 - state.length}</StyledLength>
          <StyledButton type="submit"> Meow </StyledButton>
        </StyledPost>
      </StyledForm>
    </React.Fragment>
  );
};

export default TweetPoster;

const StyledDiv = styled.div`
  border-bottom: 1px solid ${COLORS.borders};
  padding: 10px 0 10px 20px;
  color: whitesmoke;
  font-weight: bold;
  font-size: 1.4rem;
`;
const  StyledForm = styled.form`
display:flex;
height:45px;
`
const StyledLength = styled.div`
font-size: .7rem;
`
const StyledTextarea = styled.textarea`
  margin-left: 45px;
  margin-top:20px;

  width: 45vw;
  height: 30px;
  font-size: .7rem;
  border: none;
  outline: none;
  background: none;

  ::placeholder {
    /* padding-top: 10px;
    padding-left: 60px; */
    font-size: 1rem;
    opacity: 0.3;
  }
`;
const StyledButton = styled.button`

cursor:pointer;
outline:none;
  width: 50px;
  height: 22px;
  border-radius: 25px;
  font-size: .8rem;
  background: ${COLORS.primary};
  opacity: 0.7;
  color: white;
`;

const StyledPost = styled.div`
  margin:10px 10px 0px 0px;
  display: flex;
  justify-content: flex-end;
`;

const StyledAvatar = styled.img`
  margin: 10px 0px 0px 10px;
  height: 30px;
  width: 34px;
  border-radius: 50%;
`;
