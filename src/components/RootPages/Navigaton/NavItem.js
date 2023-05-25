import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Box,
    LinkBox,
    useColorMode
} from '@chakra-ui/react'
import { useNavigate, Link, NavLink,  } from 'react-router-dom';

export const NavItem = (props) => {
    const { colorMode } = useColorMode();
    
    const icon = props.icon;
    const title = props.title;
    const description = props.description;
    const nav = props.nav;
    const active = props.active;
    const navSize = props.navSize;
    const isMobile = props.isMobile;

    return (
        <Box>
           <NavLink to={nav}>
                <LinkBox
                    backgroundColor={(colorMode == 'dark' ? (active && "blue.600") : (active && "blue.100"))}
                    px={isMobile ? 2 : 3} 
                    py={isMobile ? 2 : 3}
                    borderRadius={8}
                    boxShadow= {(colorMode == 'dark' ? (active && "0px 0px 1px black") : (active && "0px 0px 1px #82AAAD"))}
                    _hover={{ textDecor: 'none', backgroundColor: (colorMode == 'dark' ?  "blue.600" : "blue.100") }}
                    alignItems='center'
                    margin={props.margin}
                    flexDir="column">
                    <Flex gap='1rem' height='min-content'>
                        <Icon as={icon} fontSize={isMobile ? "sm" : "xl"} color={active ? "#82AAAD" : "gray.500"} />
                        <Text display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                    </Flex>
                </LinkBox>        
            </NavLink> 
        </Box>
        

    )
}