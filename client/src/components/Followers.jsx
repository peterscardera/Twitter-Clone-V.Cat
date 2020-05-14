import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import FollowerDetails from "./FollowerDetails";
import Header from "./Header";
const Followers = () => {
  const location = useLocation();
  const handlerFromPath = location["pathname"].split("/")[1];
  //console.log(handlerFromPath)

  const [followersData, setFollowersData] = useState(null);

  useEffect(() => {
    const retrievedFollowersD = async () => {
      try {
        let data = await fetch(`/api/${handlerFromPath}/followers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (data.status === 200) {
          let initialFollowersData = await data.json();
          // console.log(initialFollowersData) //**RETURNS AN ARRAY */
          setFollowersData(initialFollowersData.followers);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    retrievedFollowersD();
  }, []);
  //   console.log(followersData,"******");

  return (
    <React.Fragment>
      <Wrapper>
        <Header />
        {followersData != null && (
          <>
            <StyledCurrentUser>{handlerFromPath}</StyledCurrentUser>
            <StyledTitle>Followers</StyledTitle>
            {followersData.map((eachFollower, i) => {
              console.log(eachFollower, "SEE SOMETHING");

              return (
                <>
                  <FollowerDetails
                    aFriend={eachFollower}
                    key={i}
                  ></FollowerDetails>
                </>
              );
            })}
          </>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default Followers;

const Wrapper = styled.div`
  height: 100vh;
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
