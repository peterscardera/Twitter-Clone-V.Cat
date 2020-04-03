import React from "react";
import Header from "./Header"
import styled from "styled-components"

const Layout = props => {
  return (
    <StyledContainer>
      <Header />

      <div> {props.children}</div>
    </StyledContainer>
  );
};


export default Layout 

const StyledContainer = styled.div`
display:flex;

`