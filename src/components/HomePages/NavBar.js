import React from 'react';
import { FaDiscord, FaHome, FaUserFriends, FaStore } from 'react-icons/fa';
import HomePage from '../../pages/HomePage';

import {
  Icon,
  Box,
  Spacer,
  TabPanel,
  Img,
  Stack,
  IconButton,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import Settings from './Settings';
import logo from '../../images/logo.png';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import BetaPage from '../../pages/BetaPage';

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} opacity='0.9' px={4} top='0' zIndex={'99999'} position='sticky'>
      <Stack direction={'row'} spacing={12} padding={3}>

        //NEED HELP
        // How do I redirect users to different pages using tabs???

        <Img src={logo} alt="logo" width="40px" height="40px" />
        <Tabs defaultIndex={0} size={'lg'} >
          <TabList>
            <Tab>
               <FaHome size={40}/>
            </Tab>

            <Tab>
              <FaUserFriends size={40}/>
            </Tab>

            <Tab>
              <FaStore size={40}/>
            </Tab>
          </TabList>
          
        </Tabs>
        
        
        

        
        <Spacer />

        <Settings />
      </Stack>
    </Box>
  );
}
