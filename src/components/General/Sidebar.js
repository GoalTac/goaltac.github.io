import React, { useState } from 'react'
import {
    Flex,
    Box,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Image,
    Menu
} from '@chakra-ui/react'
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
import NavItem from '../General/NavItem'
import { FaUserFriends, FaStore } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import largelogo from '../../images/GoalTac_Logo.png';
import smalllogo from '../../images/logo.png';
import Settings from '../HomePages/Settings';
import { useSupabaseClient } from '../../hooks/SessionProvider';

export default function Sidebar({activeItem}) {

    const initialState = window.innerWidth < 768 ? "small" : "large";
    const [navSize, changeNavSize] = React.useState(initialState);
    

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

    //automatic resizing of sidebar
    React.useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 768) {
            changeNavSize("small");
          } else {
            changeNavSize("large");
          }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);


    return (
        <Flex
            left="5"
            zIndex='overlay'
            minH="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between">
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav">

                <Image src={navSize == "small" ? smalllogo : largelogo}/>
                
                {highBarItems.map((item, index) => {
                    return (
                        <NavItem 
                        key={index}
                        navSize={navSize} 
                        icon={item.icon} 
                        title={item.title}
                        description={item.description}
                        nav={item.nav}
                        active={activeItem == item.nav ? true : false}
                        />
                    );
                })}
                
            </Flex>

            <Box
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}>
                <Divider display={navSize == "small" ? "none" : "flex"} />
                {lowBarItems.map((item, index) => {
                    return (
                        <NavItem 
                        key={index}
                        navSize={navSize} 
                        icon={item.icon} 
                        title={item.title}
                        description={item.description}
                        nav={item.nav}
                        active={activeItem == item.nav ? true : false}
                        />
                    );
                })}
                <Divider display={navSize == "small" ? "none" : "flex"} />

                <Box mt='2rem'>
                    <Settings session={useSupabaseClient.session} />
                </Box>
            </Box>
            
        </Flex>
    )
}