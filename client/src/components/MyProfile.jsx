import React, { useEffect } from "react";
import Layout from "./Layout";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { COLORS } from "../constants";

const MyProfile = () => {
  
  const { currentUserData } = React.useContext(CurrentUserContext);

  console.log(currentUserData);



  return (
    <React.Fragment>
      <Layout>
        {currentUserData != null && (
          <>
            <Profile>
              <div>
                <BannerImg src={currentUserData.profile.bannerSrc} />
                <AvatarImg src={currentUserData.profile.avatarSrc} />
              </div>
              <MiddleContainer>
                <DisplayName>{currentUserData.profile.displayName}</DisplayName>
                <HandleName> @{currentUserData.profile.handle}</HandleName>
                <BioContainer>
                  <div> {currentUserData.profile.bio}</div>
                  <div>
                    {currentUserData.profile.location} Joined:
                    {currentUserData.profile.joined}
                  </div>

                  <Follows>
                    <div>{currentUserData.profile.numFollowers} Followers </div>
                    <div> {currentUserData.profile.numFollowing} Following</div>
                  </Follows>
                </BioContainer>
              </MiddleContainer>
              
              <ActionBar>
                <StyledButton> Tweets </StyledButton>
                <StyledButton> Media </StyledButton>
                <StyledButton> Likes </StyledButton>
              </ActionBar>
            </Profile>
          </>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default MyProfile;

const Profile = styled.div`
  height: 2000px;
  margin-left: 20px;
`;

const BannerImg = styled.img`
  max-width: 100%;
  position: relative;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 2px white solid;
  position: absolute;
  top: 200px;
  margin-left: 20px;

  display: block;
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
 
  border-bottom:.2px solid lightgrey;
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
