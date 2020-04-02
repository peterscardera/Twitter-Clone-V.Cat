import React from "react";
import styled from "styled-components";
import FollowUnfollow from "./FollowUnfollow"

//*****************SHARED COMPONENT THAT RENDERS THE FOLLOWERS AND FOLLOWING****************** */
const FollowerDetails = ({ aFriend }) => {
  const [clickState, setClickState] = React.useState(false);

//   const followUnfollowHandler = () => {
//     setClickState(true);
//   };
  console.log(clickState);

  return (
    <>
      <div>{aFriend.handle}</div>
      <div>{aFriend.displayName}</div>

      <StyledAvatar src={aFriend.avatarSrc} />
      <button onClick={()=> {setClickState(true)}}> FOLLOW/UNFOLLOW </button>
      {clickState ? <FollowUnfollow setClickState={setClickState} friendHandle={aFriend.handle} /> : ""} 
    </>
  );
};

export default FollowerDetails;

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
