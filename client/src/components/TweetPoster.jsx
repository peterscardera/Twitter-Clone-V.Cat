import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";


const TweetPoster = ({  setReFetch, refetch}) => {
  const [state, setState] = React.useState("");

  const { currentUserData } = React.useContext(CurrentUserContext);



  const postTweet = async () => {
    try {
      let data = await fetch(`/api/tweet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ status: state })
      });
      console.log(data);
      if (data.status === 200) {
        console.log("POSTED ");
        setReFetch(!refetch);
      } else {
        throw Error("not 200");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    postTweet();
  };
  return (
    <React.Fragment>
      <StyledDiv>Home</StyledDiv>
      <form onSubmit={submitHandler}>
        <label htmlFor="tweet"></label>
        {currentUserData != null && <StyledAvatar src={currentUserData.profile.avatarSrc}/> }
        
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
          <div> {280 - state.length}</div>
          <StyledButton type="submit"> Meow </StyledButton>
        </StyledPost>
      </form>
      {/* <img src={currentUserData.avatarSrc} /> */}
    </React.Fragment>
  );
};

export default TweetPoster;

const StyledDiv = styled.div`
  border-bottom: 1px solid grey;
  padding: 10px 0 10px 20px;
  color: black;
  font-weight: bold;
`;
const StyledTextarea = styled.textarea`
  width: 65vw;
  height: 10vh;
  font-size: 1.7rem;
  border: none;
  outline:none;


  ::placeholder {
    padding-top: 20px;
    padding-left: 60px;
    font-size: 1.7rem;
    opacity: 0.3;
  }
`;
const StyledButton = styled.button`
  width: 80px;
  height: 35px;
  border-radius: 25px;
  font-size: 1.2rem;
  background: ${COLORS.primary};
  opacity: 0.5;
  color: white;
`;

const StyledPost = styled.div`
display:flex;
justify-content: flex-end;
`


const StyledAvatar = styled.img`
height:60px;
width: 60px;
border-radius: 50%;
`