import React from 'react';
import {
  Button,
  Box,
  Spacer,
  Img,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
  Spinner,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import logo from '../../images/GoalTac_Logo.png';
import hamburgerIcon from './resources/images/icon-hamburger.svg';
import closeIcon from './resources/images/icon-close.svg';
import imgBg from './resources/images/bg-tablet-pattern.svg';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { SignIn } from './Button.js';

import { Link, animateScroll as scroll } from 'react-scroll';


function Header({ showMenu, openModal, sections, toggleModal }) {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false); //for login loading

  const loading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <>
      {showMenu ? (
        <HStack
          justify='space-between'
          alignItems='center'
          px='3rem'
          py='2rem'>
          <Image src={logo} boxSize='17%' pr='2px' />
          <HStack>
            {sections.map((section, index) => {
              return (
                <Link
                  to={`${section.href}`}
                  spy={true}
                  smooth={true}
                  key={index}
                  duration={500}
                >
                  <Button
                    variant='ghost'
                    fontSize='3xl'
                    background='teal.300'
                    bgClip='text'
                    transition='background 1500ms'
                    
                    _hover={{
                      background: 'blue.500',
                      bgClip: 'text',
                    }}
                  >
                    {section.name}
                    
                  </Button>
                </Link>
              );
            })}
          </HStack>

          {SignIn()}
          
        </HStack>
      ) : (
        <Flex
          justify='space-between'
          alignItems='center'
          px='1rem'
          mr='2rem'
          py='3rem'
        >
          <Image
            src={logo}
            width='45%'
            height='45%'
            pt='6px'
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
            minWidth='0'
          >
            {openModal ? (
              <Image src={closeIcon} position='relative' zIndex='100'></Image>
            ) : (
              <Image src={hamburgerIcon}></Image>
            )}
          </Button>
        </Flex>
      )}
    </>
  );
}

export { Header };
