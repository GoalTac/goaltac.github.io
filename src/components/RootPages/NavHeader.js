import React from 'react';
import { Flex, Button, VStack, Icon, Img, Box } from '@chakra-ui/react';
import { Link, animateScroll as scroll } from 'react-scroll';
import logo from '../../images/GoalTac_Logo.png';
import Modal from './NavModal';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

// <Image src={navSize == "small" ? smalllogo : largelogo}/>

export default function NavHeader({ isMobile, activeItem, sections, toggleModal, setOpenModal, openModal }) {


  return (
    <Flex
      justify='space-between'
      alignItems='center'
      px='1rem'
    >
      <Img
        src={logo}
        width='45%'
        height='45%'
        position='relative'
        zIndex='100'
      />
      <Button
        variant='icon'
        onClick={() => {
          toggleModal();
        }}
        paddingInlineStart='0'
        paddingInlineEnd='0'
        paddingEnd={8}
        minWidth='0'
      >
        {openModal ? (
          <Box> 
          <Icon as={CloseIcon}  position='relative' zIndex='100'/>
          <Modal sections={sections} 
          toggleModal={toggleModal} 
          setOpenModal={setOpenModal} 
          openModal={openModal} isMobile={isMobile}/>
          </Box>
         
        ) : (
          <Icon as={HamburgerIcon}/>
        )}
      </Button>
    </Flex>
  );
}
