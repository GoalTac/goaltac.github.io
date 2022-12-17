import {
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar, 
  AvatarBadge, 
  AvatarGroup
} from '@chakra-ui/react';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList
}from "react-icons/fa";
import { SettingsIcon, HamburgerIcon } from '@chakra-ui/icons'
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


export default function Settings() { //Session defined from HomePage.js (supabase.auth.getSession())
  
  const[isOpen, setIsOpen] = useState(false);  
  const toggle = () => setIsOpen (!isOpen);


  return (
    <>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton 
                variant='outline'
                colorScheme={isOpen ? 'green' : 'gray'}
                isActive={isOpen} 
                as={Button}>
                <HamburgerIcon/>
              </MenuButton>
              <MenuList>
                <MenuGroup title='Tool Bar'>
                  <MenuItem>
                    <NavLink to="/profile" className="profile" activeclassName="active">
                        <div className="link" style={{display: isOpen ? "block" : "none"}}>
                          {<Avatar bg='red' w='25px' h='25px' />} Profile
                        </div>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Help'>
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                <MenuItem>Download</MenuItem>
                <MenuItem>
                  <NavLink to="/setting" className="setting" activeclassName="active">
                    <div className="link" style={{display: isOpen ? "block" : "none"}}>
                      {<SettingsIcon />} Setting
                    </div>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={() => alert('MY PHUNG')}>Create a Copy</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
    </>
  );
}
