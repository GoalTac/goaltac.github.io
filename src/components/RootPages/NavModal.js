import React from 'react';
import { 
  Box, 
  Button, 
  VStack, 
  useColorMode, 
  Divider, 
  Menu, 
  MenuButton, 
  Flex,
  Text
} from '@chakra-ui/react';
import { useNavigate, NavLink,  } from 'react-router-dom';
import NavItem from './NavItem';
import Settings from './Settings';


export default function NavModal({ isMobile, sections, toggleModal, setOpenModal, openModal }) {
  const closeModal = () => {
    setOpenModal(false);
  };
  const { colorMode } = useColorMode();

  return (
    <Box
      w='100%'
      h='100%'
      position='absolute'
      zIndex='overlay'
    >
      <VStack
        bg={colorMode === 'dark' ? 'gray.900' : 'white'}
        borderRadius={10}
        boxShadow='0px 10px 10px gray'
        position='absolute'
        top='3.5%'
        left='4%'
        padding='2rem 0'
        width='92%'
        transition='0.2s ease-in-out'
      >
        {sections.map((item, index) => {
          return (
            <NavItem 
              key={index}
              navSize={isMobile ? "small" : "large"}
              icon={item.icon} 
              title={item.title}
              description={item.description}
              nav={item.nav}
              isMobile={isMobile}
              />
          );
        })}
      </VStack>
      
    </Box>
  );
}
