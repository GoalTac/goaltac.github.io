import React, { useState, useRef } from 'react'

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
import { useIsOverflow } from '../../../hooks/Utilities/CheckOverflow';

export const Sidebar = ({activeItem, highBarItems, lowBarItems}) => {

    const initialState = window.innerWidth < 868 ? "small" : "large";
    const [navSize, changeNavSize] = useState(initialState);
    const { colorMode } = useColorMode();
    
    //this should be changed so that any time web page
    //detects an overflow, the navSize should to "small/large"

    //automatic resizing of sidebar
    React.useEffect(() => {
        
        function handleResize() {
            console.log( useIsOverflow("",document.getElementById("SideBar Parent")) )
            if (useIsOverflow("", document.getElementById("SideBar Parent"))) {
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
            height='100vh'
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            position='relative'
            width='min-content'
            borderWidth='4px'
            flexDir="column">

            {/* How to prevent logo resizing? */}
            <Box className='SideBar Parent Logo' id='SideBar Parent Logo'
                paddingTop='2vh' 
                paddingX='1vw'>
                <Image className='Sidebar Logo' id='SideBar Logo'
                    src={navSize == "small" ? smalllogo : largelogo}/>
            </Box>
            
            
            <Flex className='SideBar Parent Contents' id='SideBar Parent Contents'
                height='100vh'
                overflow='visible'
                marginX='2rem'
                flexDir='column'>

                <Box className='SideBar Content Upper' id='SideBar Content Upper'>                
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

                <Box className='SideBar Content Lower' id='SideBar Content Lower'>
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
                        marginY='1rem'>
                        <Settings session={useSupabaseClient.session} />
                    </Box>
                    
                </Box>
            </Flex>
            

            
            
        </Flex>
    )
}