import React from 'react';
import { FaDiscord, FaHome, FaUserFriends, FaStore } from 'react-icons/fa';
import HomePage from '../../pages/HomePage';

import {
  useColorMode,
  Box,
  Spacer,
  Link,
  Img,
  Stack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import Settings from './Settings';
import logo from '../../images/logo.png';
import { useNavigate, Outlet } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} opacity='0.9' px={4} top='0' zIndex={'99999'} position='sticky'>
      <Stack direction={'row'} spacing={12} padding={3}>

        <Img src={logo} alt="logo" width="40px" height="40px" />
        <IconButton 
          variant="unstyled"
          onClick={()=>{
            //direct user to home page
            //put dark bar underneath icon
          }}
          icon={<FaHome size={40}/>} />
        
        <IconButton 
          variant="unstyled"
          onClick={()=>{
            //direct user to home page
            //put dark bar underneath icon
          }}
          icon={<FaUserFriends size={40}/>} />

        <IconButton 
          variant="unstyled"
          onClick={()=>{
            //direct user to home page
            //put dark bar underneath icon
          }}
          icon={<FaStore size={40}/>} />
        <Spacer />
        <Link isExternal href="https://discord.gg/EzFPQDAKGf">
          <IconButton
            variant="outlined"
            icon={<FaDiscord size="sm" color="rgba(114,137,218)" />}
          />
        </Link>

        <Settings />
      </Stack>
    </Box>
  );
}
