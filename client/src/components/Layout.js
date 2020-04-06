import React, { useContext } from "react";
import Header from "./Header"
import styled from "styled-components";
import Footer from "./Footer";
import { FeedContext } from "./FeedContext";

const Layout = props => {

  const { homeFeedState } = useContext(FeedContext);

  return (
    <StyledContainer>
      <Header />

      <div> {props.children}</div>
      {homeFeedState.retrievedData && (<Footer /> )}
     
    </StyledContainer>
   
  );
};


export default Layout 

const StyledContainer = styled.div`
display:flex;

`