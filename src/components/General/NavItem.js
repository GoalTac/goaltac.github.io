import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Box,
    LinkBox
} from '@chakra-ui/react'
import { useNavigate, Link, NavLink,  } from 'react-router-dom';
import SideBar from "./Sidebar";

export default function NavItem({ icon, title, description, nav, active, navSize }) {

    

//Figure out how to make link expand to entire buttons
    return (
        <LinkBox
            backgroundColor={active && "#AEC8CA"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
            mt={30}
            flexDir="column"
            w={navSize == "large" && "100%"}
            alignItems={navSize == "small" ? "center" : "flex-start"}>
        <NavLink to={nav}>
        <Menu placement="right">
            <MenuButton w='100%'>
                <Flex>
                    <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                    <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                </Flex>
            </MenuButton>
        </Menu>
        </NavLink>
        </LinkBox>
    )
}