import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box,
    useColorMode
} from '@chakra-ui/react'
import NavItem from '../Navigaton/NavItem'
import largelogo from '../../../images/GoalTac_Logo.png';
import smalllogo from '../../../images/logo.png';
import Settings from '../Settings';
import { useSupabaseClient } from '../../../hooks/SessionProvider';

export default function Sidebar({activeItem, highBarItems, lowBarItems}) {

    const initialState = window.innerWidth < 868 ? "small" : "large";
    const [navSize, changeNavSize] = React.useState(initialState);
    const { colorMode } = useColorMode();




    //automatic resizing of sidebar
    React.useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 868) {
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
            color={(colorMode == 'dark' ? 'gray.100' : 'black')}
            backgroundColor={(colorMode == 'dark' ? 'gray.700' : 'white')}

            
            zIndex='overlay'
            minH="100vh"
            paddingX={navSize == "small" ? "" : "12px"}
            paddingTop='10px'
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between">
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems='center'
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
                        active={activeItem == item.nav ? true : false}/>
                        
                    );
                })}
                
            </Flex>

            <Flex
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

                <Flex mt='2rem'>
                    <Settings session={useSupabaseClient.session} />
                </Flex>
            </Flex>
            
        </Flex>
    )
}