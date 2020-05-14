import React from "react";
import { Icon, withBaseIcon } from 'react-icons-kit'
import {bookmark} from 'react-icons-kit/feather/bookmark';
import {home} from 'react-icons-kit/feather/home';
import {bell} from 'react-icons-kit/feather/bell';
import {user} from 'react-icons-kit/feather/user';


const SideIconContainer = withBaseIcon({ size: 30, style: { color: 'white', paddingRight:"10px"  }   })



export const HomeIcon = () => <SideIconContainer  icon={home} />
export const BellIcon = () => <SideIconContainer icon={bell} />
export const UserIcon = () => <SideIconContainer icon={user} />
export const BookmarkIcon = () => <SideIconContainer icon={bookmark} />