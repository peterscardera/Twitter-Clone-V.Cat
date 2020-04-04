import React from "react";
import Header from "./Header"
import styled from "styled-components"
import Footer from "./Footer"

const Layout = props => {
  return (
    <StyledContainer>
      <Header />

      <div> {props.children}</div>
      <Footer />
    </StyledContainer>
   
  );
};


export default Layout 

const StyledContainer = styled.div`
display:flex;

`