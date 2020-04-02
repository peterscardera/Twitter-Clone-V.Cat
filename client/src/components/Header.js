import React from "react";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import styled from "styled-components";
import { HomeIcon, BookmarkIcon, BellIcon, UserIcon } from "./headerIcons";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavBarLink to="/">
              <HomeIcon /> Home
            </NavBarLink>
          </li>
          <li>
            <NavBarLink to="/me">
              <UserIcon /> Profile
            </NavBarLink>
          </li>
          <li>
            <NavBarLink to="/notifications">
              <BellIcon /> Notifications
            </NavBarLink>
          </li>
          <li>
            <NavBarLink to="/Bookmarks">
              <BookmarkIcon /> Bookmarks
            </NavBarLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const NavBarLink = styled(NavLink)`
  text-decoration: none;

  &.active {
    color: pink;
  }
`;
