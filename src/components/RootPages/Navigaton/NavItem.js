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
import SideBar from "./Sidebar";

export default function NavItem({ icon, title, description, nav, active, navSize, isMobile}) {
const { colorMode } = useColorMode();

    

//Figure out how to make link expand to entire buttons
    return (
        <Box minW={isMobile ? '' : `${navSize == 'small' ? '' : '160px'}`}>
        
        <NavLink to={nav}>
            <LinkBox
            backgroundColor={(colorMode == 'dark' ? (active && "blue.600") : (active && "blue.100"))}
            px={isMobile ? 2 : 3} 
            py={isMobile ? 2 : 3}

            borderRadius={8}
            boxShadow= {(colorMode == 'dark' ? (active && "0px 0px 1px black") : (active && "0px 0px 1px #82AAAD"))}
            _hover={{ textDecor: 'none', backgroundColor: (colorMode == 'dark' ?  "blue.600" : "blue.100") }}
            mt={isMobile ? 0 : 30} 
            flexDir="column"
            w={navSize == "large" && "100%"}
            alignItems={navSize == "small" ? "center" : "flex-start"}>
            <Flex>
                <Icon as={icon} fontSize={isMobile ? "sm" : "xl"} color={active ? "#82AAAD" : "gray.500"} />
                <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
        </LinkBox>        
        </NavLink>
        </Box>

    )
}