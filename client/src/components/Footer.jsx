import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { FiSearch} from "react-icons/fi";

const Footer = () => {
  return (
    <React.Fragment>
      <StyledSearchContainer>
        <label htmlFor="search"></label>
        <StyledInput  placeholder=" Search" id="search" type="text"></StyledInput>
      </StyledSearchContainer>
    </React.Fragment>
  );
};

export default Footer;

const StyledSearchContainer = styled.div`
margin: 0 2%;
`

const StyledInput = styled.input`
border-radius: 10px;
width: 15vw;
height: 5vh;
border:none;
outline:none;
background: ${COLORS.borders};
padding-left: 30px;

 

`