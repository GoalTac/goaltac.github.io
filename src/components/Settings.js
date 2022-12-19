import {
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar, 
  AvatarBadge, 
  AvatarGroup,
  useColorMode,
  DarkMode,
  Badge,
  Progress
} from '@chakra-ui/react';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaMoon,
  FaLogOut,
  FaSun,
  FaQuestion
}from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"
import { SettingsIcon, HamburgerIcon } from '@chakra-ui/icons'
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import supabase from '../supabase';


export default function Settings() { //Session defined from HomePage.js (supabase.auth.getSession())
  
  const[isOpen, setIsOpen] = useState(false);  
  const toggle = () => setIsOpen (!isOpen);
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate() 

  return (
    <>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton 
                variant='outline'
                colorScheme={isOpen ? 'green' : 'gray'}
                isActive={isOpen}
                onClick={isOpen ? toggle : null}
                as={Button}>
                <Avatar name="Adi C">
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </MenuButton>
              
              <MenuList>
                <MenuGroup>
                  <IconButton
                    aria-label="change theme"
                    rounded='full'
                    size='xs'
                    icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} 
                    colorScheme='gray'
                    onClick={toggleColorMode}
                    variant='outline'
                  />
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem
                    icon={<FaQuestion />}
                    onClick={()=> navigate('/faq')}>
                    Help and Support
                  </MenuItem>
                  <MenuItem 
                    onClick={()=> navigate('/settings')}
                    icon={<SettingsIcon />}>
                      Setting
                  </MenuItem>
                  <MenuItem
                    icon={<FiLogOut />}
                    onClick={async() =>{
                      const { error } = await supabase.auth.signOut()
                      navigate('/login')}}>
                        Sign Out
                  </MenuItem>
                </MenuGroup>
                
              </MenuList>
            </>
          )}
        </Menu>
    </>
    
  );
}
