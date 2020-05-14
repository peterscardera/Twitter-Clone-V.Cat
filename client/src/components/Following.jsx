import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import FollowerDetails from "./FollowerDetails";

const Following = () => {
  const location = useLocation();
  const handlerFromPath = location["pathname"].split("/")[1];
  //console.log(handlerFromPath)

  const [followingData, setFollowingData] = useState(null);

  useEffect(() => {
    const retrievedFollowingsD = async () => {
      try {
        let data = await fetch(`/api/${handlerFromPath}/following`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (data.status === 200) {
          let initialFollowingData = await data.json();
          console.log(initialFollowingData);
          setFollowingData(initialFollowingData.following);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    retrievedFollowingsD();
  }, []);
  //   console.log(followingData);

  return (
    <React.Fragment>
      <StyledHContainer>
        <Header />
        <Wrapper>
          {followingData != null && (
            <>
              <div>
                <StyledCurrentUser>{handlerFromPath}</StyledCurrentUser>
                <StyledTitle>Following</StyledTitle>
                {followingData.map((eachFollowing, i) => {
                  return (
                    <>
                      <FollowerDetails
                        aFriend={eachFollowing}
                        key={i}
                        ></FollowerDetails>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </Wrapper>
          </StyledHContainer>
    </React.Fragment>
  );
};

export default Following;

const StyledHContainer = styled.div`
display:flex;
justify-content: flex-start;
width:100%;
`

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-left: 400px;

@media (max-width: 1420px) {
  margin-left: 280px;
}

@media (max-width: 1155px) {
  margin-left: 200px;

}

`;

const StyledCurrentUser = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.3rem;
`;
const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
`;
