import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box,
    useColorMode,
    Spacer
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
        <Flex className='SideBar Parent'
            color={(colorMode == 'dark' ? 'gray.100' : 'black')}
            backgroundColor={(colorMode == 'dark' ? 'gray.700' : 'white')}
            height='100vh'
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            position='relative'
            
            flexDir="column">

            {/* How to prevent logo resizing? */}
            <Box className='SideBar Parent Logo'
                paddingTop='2vh' 
                paddingX='1vw'>
                <Image className='Sidebar Logo' 
                    maxW='12vw'
                    src={navSize == "small" ? smalllogo : largelogo}/>
            </Box>
            
            
            <Flex className='SideBar Parent Contents'
                height='100vh'
                flexDir='column'
                overflow='hidden'
                paddingX={navSize == "small" ? "" : "12px"}>

                <Box className='SideBar Content Upper'>                
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
                </Box>
                <Spacer />

                <Box className='SideBar Content Lower' mb={4}>
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
                </Box>
            </Flex>
            

            
            
        </Flex>
    )
}