import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Avatar, 
  AvatarBadge, 
  useColorMode,
  Switch,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  Stack,
  StackDivider,
  Box,
  HStack,
  Tag,
  TagLeftIcon
} from '@chakra-ui/react';
import {
  FaMoon,
  FaSun,
  FaQuestion
}from "react-icons/fa";
import { BiMessageError } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { SettingsIcon } from '@chakra-ui/icons';
import CircleIcon from './CircleIcon';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';


export default function Settings() { //Session defined from HomePage.js (supabase.auth.getSession())
  
  const[isOpen, setIsOpen] = useState(false);  
  const toggle = () => setIsOpen (!isOpen);
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate() 

  return (
    <>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton 
                variant='contained'
                isActive={isOpen}
                as={Button}>
                <Avatar name="Adi C" bg={isOpen ? 'cyan' : null}>
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </MenuButton>
              
              <MenuList>
                <MenuGroup>
                  <HStack>
                    <Box align='center' margin='10px'>
                      <Avatar id='avatar' name='Adi C' bg='yellow'>
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                      </Avatar>
                    </Box>
                    <Card margin='20px' variant='elevated' size='sm' w='50%'>
                      <CardBody>
                        <Box>
                        <Tag size="lg" colorScheme="orange" borderRadius="full">
                          <TagLeftIcon as={CircleIcon} />
                          <Text>&nbsp;1508</Text>
                        </Tag>
                        </Box>
                      </CardBody>
                    </Card>
                  </HStack>
                    
                  <MenuDivider />
                </MenuGroup>

                <MenuGroup>
                  <MenuItem
                    closeOnSelect={false}
                    onClick={toggleColorMode}
                    icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                    >
                      Dark mode <Switch id='darkMode' isChecked={colorMode === "dark" ? true : false} />
                  </MenuItem>
                  <MenuItem
                    icon={<FaQuestion />}
                    onClick={()=> navigate('/faq')}>
                      Help and support
                  </MenuItem>
                  <MenuItem
                    icon={<BiMessageError />}
                    onClick={()=> navigate('/faq')}>
                      Give feedback
                  </MenuItem>
                  <MenuItem 
                    onClick={()=> navigate('/settings')}
                    icon={<SettingsIcon />}>
                      Settings
                  </MenuItem>
                  <MenuItem
                    icon={<FiLogOut />}
                    onClick={async() =>{
                      const { error } = await supabase.auth.signOut()
                      navigate('/login')}}>
                        Sign Out
                  </MenuItem>
                </MenuGroup>
                
              </MenuList>
            </>
          )}
        </Menu>
    </>
    
  );
}
