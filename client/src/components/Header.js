import React from "react";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import styled from "styled-components";
import { HomeIcon, BookmarkIcon, BellIcon, UserIcon } from "./headerIcons";
import { ReactComponent as Logo } from "../Assets/logo.svg";

import { CurrentUserContext } from "./CurrentUserContext";

//for pot modal

///on click trigger modal. which triggers post 




const Header = () => {
  const { currentUserData } = React.useContext(CurrentUserContext);
  console.log(currentUserData, 'CURRENTUSER IN HEADER****')
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
                <NavBarLink to="/">
                  <HomeIcon /> Home
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink
                  to={`/profile/${currentUserData.profile.handle}`}
                >
                  <UserIcon /> Profile
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink to="/notifications">
                  <BellIcon /> Notifications
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink to="/Bookmarks">
                  <BookmarkIcon /> Bookmarks
                </NavBarLink>
              </StyledLi>
            </ListItems>
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
  color: black;
  &.active {
    color: ${COLORS.primary};
  }
`;

const Styledheader = styled.header`
  min-width: 20%;
  border-right: 1px solid grey;
  /* background:red; */
`;
const ListItems = styled.ul`
  display: flex;
  flex-direction: column;
  height: 450px;
`;

const StyledLi = styled.li`
  margin: 25px 0 0 35%;

  &:hover {
    background: #ece6ff;
  }
`;
