import React from 'react';
import { Flex, Button, VStack, Icon, Img } from '@chakra-ui/react';
import { Link, animateScroll as scroll } from 'react-scroll';
import logo from '../../images/GoalTac_Logo.png';
import Modal from '../RootPages/Modal';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

// <Image src={navSize == "small" ? smalllogo : largelogo}/>

export default function Header({ activeItem, sections, toggleModal, setOpenModal, openModal }) {


  return (
    <Flex
      justify='space-between'
      alignItems='center'
      px='1rem'
      py='3rem'
      _after={{
        content: "''",
        position: 'absolute',
        left: '12%',
        top: '-5%',
        zIndex: '-2',
        width: '134%',
        height: '18%',
      }}
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
          <> 
          <Icon as={CloseIcon}  position='relative' zIndex='100'/>
          <Modal sections={sections} 
          toggleModal={toggleModal} 
          setOpenModal={setOpenModal} 
          openModal={openModal}/>
          </>
         
        ) : (
          <Icon as={HamburgerIcon}/>
        )}
      </Button>
    </Flex>
  );
}
