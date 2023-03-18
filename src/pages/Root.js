import { 
  ChakraProvider, 
  ColorModeScript, 
  HStack,
  Flex,
  Box,
  useColorMode,
  Stack,
  Spacer,
  Center
} from '@chakra-ui/react';
import React, { useState } from 'react'

import '../App.css';
import theme from '../components/theme';
import { Outlet } from 'react-router';
import { supabaseClient } from '../supabaseClient';
import { SessionProvider } from '../hooks/SessionProvider';
import SideBar from '../components/RootPages/Sidebar';
import Header from '../components/RootPages/Header';

import { useLocation } from 'react-router-dom';

import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import { FaUserFriends, FaStore } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

//TODO When people zoom in far enough create a HEADER to replace the sidebar

//Chooses what to display to each page
const notSideBarPages = [
  '/beta', '/updatepassword','/resetpassword',
  '/signup','/signin'
]
const highBarItems = [
  {
      icon: FiHome,
      title: 'Home',
      description: '',
      nav: '/',

  },
  {
      icon: FaUserFriends,
      title: 'Community',
      description: '',
      nav: '/social',

  },
  {
      icon: FaStore,
      title: 'Market',
      description: '',
      nav: '/market',

  },
]
const lowBarItems = [
  {
      icon: RiMessage2Fill,
      title: 'Messages',
      description: '',
      nav: '/messages',

  },
  {
      icon: FiDollarSign,
      title: 'Profile Test',
      description: '',
      nav: '/profile/Test2333',

  },
  {
      icon: FiDollarSign,
      title: 'Calendar',
      description: '',
      nav: '/calendar',

  }
]

export default function Root() {
  const { colorMode } = useColorMode();
  const initialState = window.innerWidth < 400 ? true : false;
  const [showHeader, setShowHeader] = React.useState(initialState); //This is to display header
  const [openModal, setOpenModal] = React.useState(false); //This is to open/close modal
  const locate = useLocation();

  //toggle opening/closing of modal
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  //decides to show header or not in real time
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 400) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showHeader]);

  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SessionProvider supabase={supabaseClient}>
          {!notSideBarPages.includes(locate.pathname) ? (
            <Box bg={colorMode === 'dark' ? 'grey.100' : 'white'}>
              
              {showHeader ? <Header activeItem={locate.pathname} 
              sections={highBarItems}
              toggleModal={toggleModal}
              setOpenModal={setOpenModal}
              openModal={openModal}
              /> :  <></>}
              <Flex>
                {showHeader ? <></> :  <SideBar activeItem={locate.pathname} 
                highBarItems={highBarItems} lowBarItems={lowBarItems}/>}
                
                <Box
                  position='relative'
                  zIndex='100'
                  width='100%'
                  height='100%'
                >
                  <Outlet />
                </Box>
              </Flex>
            </Box>
          ) : (
              <Stack>  
                <Outlet />
              </Stack>
          )}
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
