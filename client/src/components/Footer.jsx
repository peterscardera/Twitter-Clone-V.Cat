import React, { useState, useContext } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { FiSearch } from "react-icons/fi";
import { FeedContext } from "./FeedContext";

import { useHistory } from "react-router-dom";

const Footer = () => {
  const [typing, setTyping] = useState("");
  const { homeFeedState } = useContext(FeedContext);
  const history = useHistory();

    let matchedResults = Object.values(homeFeedState.tweetsByIds).filter((eachStat, index)=>{

      if( eachStat.status.toLowerCase().includes(typing.toLowerCase()) && typing.length >= 3 ) {
        return eachStat
      }

    })
    
console.log(matchedResults)
 

  return (
    <React.Fragment>
      <StyledSearchContainer>
        <form>
          <label htmlFor="search"></label>
          <StyledInput
            placeholder="Tweet Search"
            id="search"
            type="text"
            onChange={(e) => {
              setTyping(e.target.value);
            }}
          ></StyledInput>
        </form>
         {typing != "" && (<div> {matchedResults.map((item, i)=> {
           return (
             <>

           <div onClick={(e)=> {
             e.preventDefault();
             e.stopPropagation();
             history.push(`/tweet/${item.id}`)
           }} > {item.status} </div>


             </>
           )
         })}</div>)} 
      </StyledSearchContainer>
    </React.Fragment>
  );
};

export default Footer;

const StyledSearchContainer = styled.div`
  margin: 0 2%;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  width: 15vw;
  height: 5vh;
  border: none;
  outline: none;
  background: ${COLORS.borders};
  padding-left: 30px;
`;
