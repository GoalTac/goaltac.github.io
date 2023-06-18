import React from 'react';
import { Form } from '../Form';
import {
  Box,
  Image,
  HStack,
  Button,
  VStack,
  Stack,
  IconButton,
  useColorMode,
  Flex,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';

import { Link, animateScroll as scroll } from 'react-scroll';
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import logo from '../../../images/GoalTac_Logo.png';

const sectionsLeft = [
  {
    href: 'home',
    name: 'Home',
  },
  {
    href: 'pricing',
    name: 'Pricing',
  },
  {
    href: 'product',
    name: 'Product',
  },
  {
    href: 'about',
    name: 'About Us',
  },
];

const sectionsRight = [
  {
    href: 'careers',
    name: 'Careers',
  },
  {
    href: 'community',
    name: 'Community',
  },
  {
    href: 'policy',
    name: 'Privacy Policy',
  },
];

const icons = [
  {
    icon: <FaFacebookSquare size={25} color='rgba(66, 103, 178)' />,
    href: '',
  },
  {
    icon: <FaYoutube size={25} color='rgba(255,0,0)' />,
    href: '',
  },
  {
    icon: <FaDiscord size={25} color='rgba(114,137,218)' />,
    href: 'https://discord.gg/EzFPQDAKGf',
  },
  {
    icon: <FaTiktok size={25} color='white' />,
    href: '',
  },
  {
    icon: <FaInstagram size={30} color='white' />,
    href: '',
  },
];

function Footer({ contentWidth }) {

  const { toggleColorMode, colorMode } = useColorMode();

  return (
      <Flex
        maxW={contentWidth}
        px='3rem'
        w='100%'>

      <Flex 
        flexDirection='column'
        gap='1rem'
        alignItems='center'>

        <Image src={logo} pt='5px' maxWidth='200px'/>
        <HStack>
          {mediaIcons}
        </HStack>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        
      </Flex>

      <Spacer/>

      <HStack spacing='1rem' fontWeight='extrabold'>
        <VStack spacing='.2rem' textAlign='left' alignItems='flex-start'>
          {sectionsLeft.map((section, index) => {
            return (
              <Link
                to={`${section.href}`}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                key={index}
              >
                <Button
                  variant='footer'
                  bgColor='white'
                  bgClip='text'
                  fontWeight='bold'
                  _hover={{
                    bgGradient: 'linear(to-l, teal.300, blue.500)',
                  }}
                >
                  {section.name}
                </Button>
              </Link>
            );
          })}
        </VStack>
        <VStack spacing='.3rem' height='173px' alignItems='flex-start'>
          {sectionsRight.map((section, index) => {
            return (
              <Link
                to={`${section.href}`}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                key={index}
              >
                <Button
                  variant='footer'
                  bgColor='white'
                  bgClip='text'
                  fontWeight='bold'
                  _hover={{
                    bgGradient: 'linear(to-l, teal.300, blue.500)',
                  }}
                >
                  {section.name}
                </Button>
              </Link>
            );
          })}
        </VStack>
      </HStack>

      <Spacer/>

      <Form />
      
    </Flex>
  );
}

const mediaIcons = icons.map((icon, index) => {
  return (
    <a href={icon.href} target='_blank' key={index}>
      <IconButton
        variant='unstyled'
        cursor='pointer'
        transition='.4s all ease'
        icon={icon.icon}
        _hover={{
          filter:
            'invert(58%) sepia(54%) saturate(470%) hue-rotate(323deg) brightness(103%) contrast(95%)',
        }}
      />
    </a>
  );
})

export { Footer };
