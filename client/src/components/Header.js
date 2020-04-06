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
                <NavBarLink to="/">
                  <HomeIcon /> Home
                </NavBarLink>
              </StyledLi>
              <StyledLi>
                <NavBarLink to={`/profile/${currentUserData.profile.handle}`}>
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
  color: black;
  &.active {
    color: ${COLORS.primary};
  }
`;

const Styledheader = styled.header`
  min-width: 20%;
  position: fixed;
  /* background:red; */
`;
const ListItems = styled.ul`
  display: flex;
  flex-direction: column;
  height: 450px;
`;

const StyledLi = styled.li`
  margin: 25px 0 0 35%;
  list-style-type: none;

  &:hover {
    /* background: #ece6ff; */
  }
`;
