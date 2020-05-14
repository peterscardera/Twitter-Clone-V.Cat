import React from "react";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import styled from "styled-components";
import { HomeIcon, BookmarkIcon, BellIcon, UserIcon } from "./headerIcons";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { CurrentUserContext } from "./CurrentUserContext";

import FormDialog from "./FormDialog";

const Header = () => {
  const { currentUserData } = React.useContext(CurrentUserContext);

  return (
    <>
      {currentUserData != null && (
        <Styledheader>
          <nav>
            <ListItems>
              <StyledLi>
                <Logo />
              </StyledLi>
              <StyledLi>
                <NavBarLink activeStyle={{ color: `${COLORS.primary}` }} exact={true} to="/">
                  <HomeIcon /> Home
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink
                  activeStyle={{ color: `${COLORS.primary}` }}
                  to={`/profile/${currentUserData.profile.handle}`}
                >
                  <UserIcon /> Profile
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink
                  activeStyle={{ color: `${COLORS.primary}` }}
                  to="/notifications"
                >
                  <BellIcon /> Notifications
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink to="/Bookmarks">
                  <BookmarkIcon /> 
                  Bookmarks
                </NavBarLink>
              </StyledLi>
            </ListItems>
            <StyledLi>
              <FormDialog></FormDialog>
            </StyledLi>
          </nav>
        </Styledheader>
      )}
    </>
  );
};

export default Header;

const NavBarLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
@media (max-width: 1420px){
  font-size: .9rem;
}

@media (max-width: 1155px){
  font-size: .6rem;
}
@media (max-width: 1000px){
  font-size: 0rem;
}
`;

const Styledheader = styled.header`
  min-width: 25%;
  position: fixed;
  /* background:red; */

  @media (max-width: 1420px){
    min-width: 20%;
}

@media (max-width: 1155px){
  min-width: 10%;
}
@media (max-width: 1000px){
  max-width:50px;
}
`;
const ListItems = styled.ul`
  display: flex;
  flex-direction: column;
  height: 450px;
  @media (max-width: 1155px) {
    width:200px;
  }

  @media (max-width: 700px){
  max-width:50px;
}
`;

const StyledLi = styled.li`
  margin: 25px 0 0 35%;
  list-style-type: none;

  &:hover {
    /* background: #ece6ff; */
  }
  @media (max-width: 700px){
  max-width:50px;
}

`;
