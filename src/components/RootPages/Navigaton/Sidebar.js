import React, { useState, useRef } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box,
    useColorMode,
    Spacer,
    VStack
} from '@chakra-ui/react'
import NavItem from '../Navigaton/NavItem'
import largelogo from '../../../images/GoalTac_Logo.png';
import smalllogo from '../../../images/logo.png';
import Settings from '../Settings';
import { useSupabaseClient } from '../../../hooks/SessionProvider';
import { useIsOverflow } from '../../../hooks/Utilities/CheckOverflow';

export const Sidebar = ({activeItem, highBarItems, lowBarItems}) => {

    const initialState = window.innerWidth < 1400 ? "small" : "large";
    const [navSize, changeNavSize] = useState(initialState);
    const { colorMode } = useColorMode();
    
    //this should be changed so that any time web page
    //detects an overflow, the navSize should to "small/large"

    //automatic resizing of sidebar
    
    React.useEffect(() => {
        
        function handleResize() {
            console.log( useIsOverflow("",document.getElementById("Root Parent")) )
            if (window.innerWidth < 1400) {
                changeNavSize("small");
            } else {
                changeNavSize("large");
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <Flex className='SideBar Parent' id='SideBar Parent'
            color={(colorMode == 'dark' ? 'gray.100' : 'black')}
            backgroundColor={(colorMode == 'dark' ? 'gray.700' : 'white')}
            minH='100vh'
            
            width='min-content'
            overflow='scroll'
            flexDir="column">

            {/* How to prevent logo resizing? */}
            <Box className='SideBar Parent Logo' id='SideBar Parent Logo'
                paddingTop='2vh' 
                paddingX='1vw'>
                <Image className='Sidebar Logo' id='SideBar Logo'
                    src={largelogo}/>
            </Box>
            
            
            <VStack className='SideBar Parent Contents' id='SideBar Parent Contents'
                marginX='1.5rem'
                justify='space-between'
                flexDir='column'>

                <Box className='SideBar Content Upper' id='SideBar Content Upper'
                    height='min-content'>                
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
                <Divider orientation='horizontal' size='lg' colorScheme='black'/>
                <Box className='SideBar Content Lower' id='SideBar Content Lower'
                    height='min-content'>
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
                    <Divider />
                    <Box className='SideBar Settings' id='SideBar Settings'
                        zIndex='overlay'
                        marginY='1rem'>
                        <Settings session={useSupabaseClient.session} />
                    </Box>
                    
                </Box>
            </VStack>
        </Flex>
    )
}