import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Box
} from '@chakra-ui/react'
import { useNavigate, Link, NavLink } from 'react-router-dom';
import SideBar from "./Sidebar";

export default function NavItem({ icon, title, description, nav, active, navSize }) {

    

//Figure out how to make link expand to entire buttons
    return (
        <Flex
            backgroundColor={active && "#AEC8CA"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
            mt={30}
            flexDir="column"
            w={navSize == "large" && "100%"}
            alignItems={navSize == "small" ? "center" : "flex-start"}>
        <Menu placement="right">
        <NavLink to={nav}>
            <MenuButton w='100%'>
                <Flex>
                    <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                    <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                </Flex>
            </MenuButton>
        </NavLink>
        </Menu>
        </Flex>
    )
}