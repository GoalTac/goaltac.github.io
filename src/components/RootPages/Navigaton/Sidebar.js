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
import { NavItem } from '../Navigaton/NavItem'
import largelogo from '../../../images/GoalTac_Logo.png';
import smalllogo from '../../../images/logo.png';
import Settings from '../Settings';
import { useSupabaseClient } from '../../../hooks/SessionProvider';
import { useIsOverflow } from '../../../hooks/Utilities/CheckOverflow';

export const Sidebar = ({activeItem, highBarItems, lowBarItems}) => {

    const initialState = window.innerWidth < 1100 ? "small" : "large";
    const [navSize, changeNavSize] = useState(initialState);
    const { colorMode } = useColorMode();
    
    React.useEffect(() => {
        
        function handleResize() {
            console.log( useIsOverflow("",document.getElementById("Root Parent")) )
            if (window.innerWidth < 1100) {
                changeNavSize("small");
            } else {
                changeNavSize("large");
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <Box
            left='0'
            top='0'
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.1)">
        <Flex className='SideBar Parent' id='SideBar Parent'
            color={(colorMode == 'dark' ? 'gray.100' : 'black')}
            backgroundColor={(colorMode == 'dark' ? 'gray.700' : 'white')}
            minH='100vh'
            maxWidth='15vw'
            width='min-content'
            alignItems='center'
            
            flexDir="column">

            {/* How to prevent logo resizing? */}
            <Box className='SideBar Parent Logo' id='SideBar Parent Logo'
                margin='0.5rem' 
                marginLeft={navSize == 'small' ? '1rem' : null}
                boxSize={navSize == 'small' ? '50%' : '90%'}>
                <Image className='Sidebar Logo' id='SideBar Logo'                
                    src={navSize == 'small' ? smalllogo : largelogo}/>
            </Box>
            
            
            <VStack className='SideBar Parent Contents' id='SideBar Parent Contents'
                marginX={navSize == 'small' ? '0.5rem' : '1.5rem'}
                justify='space-between'
                flexDir='column'>
                <Box className='SideBar Nav Content' id='SideBar Nav Content'>
                    {highBarItems.map((item, index) => {
                        return (
                            <Box key={index} marginY='0.5rem'>

                                <NavItem
                                    margin='0.5rem'
                                    
                                    navSize={navSize} 
                                    icon={item.icon} 
                                    title={item.title}
                                    description={item.description}
                                    nav={item.nav}
                                    active={activeItem == item.nav ? true : false}/>
                            </Box>
                        );
                    })}
                    <Divider orientation='horizontal' size='lg' colorScheme='black'/>
                    {lowBarItems.map((item, index) => {
                        return (
                            <Box key={index} marginY='0.5rem'>

                                <NavItem
                                    margin='0.5rem'
                                    
                                    navSize={navSize} 
                                    icon={item.icon} 
                                    title={item.title}
                                    description={item.description}
                                    nav={item.nav}
                                    active={activeItem == item.nav ? true : false}/>
                            </Box>
                        );
                    })}
                </Box>            
                    
                <Divider />
                <Box className='SideBar Settings' id='SideBar Settings'
                    marginY='1rem'>
                    <Settings session={useSupabaseClient.session} />
                </Box>
            </VStack>
        </Flex>
        </Box>
        
    )
}