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
import SideBar from '../components/RootPages/Navigaton/Sidebar';
import NavHeader from '../components/RootPages/Navigaton/NavHeader';
import NavFooter from '../components/RootPages/Navigaton/NavFooter';
import MainPanel from '../components/RootPages/Information/MainPanel';
import AdPanel from '../components/RootPages/Information/AdPanel';
import StatsPanel from '../components/RootPages/Information/StatsPanel';
import PremiumPanel from '../components/RootPages/Information/PremiumPanel';
import CommunitiesPanel from '../components/RootPages/Information/CommunitiesPanel';
import QuestsPanel from '../components/RootPages/Information/QuestsPanel';
import ChatRoomPanel from '../components/RootPages/Information/Community/ChatRoomPanel';
import OnlineMembersPanel from '../components/RootPages/Information/Community/OnlineMembersPanel';
import FriendsPanel from '../components/RootPages/Information/FriendsPanel';

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
const noNavPages = [
  '/', '/updatepassword','/resetpassword',
  '/signup','/signin'
]
const highBarItems = [
  {
      icon: FiHome,
      title: 'Home',
      description: '',
      nav: '/home',

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

const infoPanels = [<PremiumPanel />, <QuestsPanel />, <AdPanel />]
function filteredPanels(currentPage) {
  if (currentPage.includes('/community/')) {
    return [<PremiumPanel />, <ChatRoomPanel />, <OnlineMembersPanel />, <AdPanel />]
  }
  switch(currentPage) {
      case '/home': 
          return [<PremiumPanel />, <StatsPanel />, <QuestsPanel />, <AdPanel />]
      case '/social': 
          return [<PremiumPanel />, <CommunitiesPanel />, <FriendsPanel />, <AdPanel />]
      default: 
          return infoPanels

  }
}

export default function Root() {
  const { colorMode } = useColorMode();
  const initialState = window.innerWidth < 700 ? true : false;
  const [isMobile, setMobile] = React.useState(initialState); //This is to display header & footer
  const [openModal, setOpenModal] = React.useState(false); //This is to open/close modal
  const allItems = highBarItems.concat(lowBarItems)
  const locate = useLocation();

  //toggle opening/closing of modal
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  //decides to show header or not in real time
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}  />
        <SessionProvider supabase={supabaseClient}>
          {!noNavPages.includes(locate.pathname) ? (
            <Box className='Root' height='100vh'>

            <Flex flexDirection='column'>

              {isMobile ? <NavHeader activeItem={locate.pathname} 
              sections={lowBarItems}
              toggleModal={toggleModal}
              setOpenModal={setOpenModal}
              openModal={openModal}
              isMobile={isMobile}
              /> :  <></>}
              <Flex
              w='100%'
              height='100vh'>
                {isMobile ? <></> :  <SideBar activeItem={locate.pathname} 
                highBarItems={highBarItems} lowBarItems={lowBarItems}/>}

                {/* Using spacers to center a component is extremely scuffed. Find a better way later */}
                <Spacer />
                <Flex
                marginTop='30px'
                w='1200px'
                maxH='100%'
                maxW='100%'
                flexDirection='row'>
                  <Outlet />
                  <Spacer />
                  
                    {isMobile ? <></> :  
                    <Box 
                    paddingEnd='10px'>
                      <MainPanel infoPanels={filteredPanels(locate.pathname)} />
                    </Box>
                    }
                </Flex>
                <Spacer />
                
                
                {/* Sidebar on the right for advertisements, notifications, etc. */}
              </Flex>
              {isMobile ? <NavFooter activeItem={locate.pathname} sections={highBarItems} isMobile={isMobile}/> :  <></>}
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
