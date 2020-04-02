import React, { useEffect, useState } from "react";
import Layout from "./Layout";
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
            Accept: "application/json"
          }
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
      <Layout>
        {followingData != null && (
          <>
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
          </>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default Following;

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
