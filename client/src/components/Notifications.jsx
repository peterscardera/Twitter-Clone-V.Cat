import React from "react";
import Layout from "./Layout";
import styled from "styled-components";

import Header from "./Header";

const Notifications = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <div> hi Notifications </div>
        <div> hi Notifications </div>
        <div> hi Notifications </div>
      </Wrapper>
    </>
  );
};

export default Notifications;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-left: 800px;

  @media (max-width: 1420px) {
    margin-left: 280px;
  }

  @media (max-width: 1155px) {
    margin-left: 200px;
  }
`;
