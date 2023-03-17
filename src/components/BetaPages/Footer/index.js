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

function Footer({ mobile }) {

  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Stack
      id='about'
      bg='gray.900'
      direction={['column-reverse', null, 'row']}
      justifyContent='space-around'
      py='3rem'
      px={['2rem', null, '7rem']}
      spacing={['4rem', null, null]}
    >
      <Stack
        direction={['column-reverse', null, 'column']}
        justifyContent='space-between'
        alignItems='center'
        spacing={['4rem', null]}
      >
        {mobile && (
          <Box color='gray.400'>Copyright 2023. All Rights Reserved</Box>
        )}
        <Image src={logo} pt='5px' maxWidth={['250px', '200px']} />
        <HStack
          spacing='1rem'
          justifyContent={['space-around', null]}
          width='100%'
        >
          {icons.map((icon, index) => {
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
          })}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Stack>
      <HStack spacing={['6rem', null, '6rem']} fontWeight='extrabold'>
        <VStack spacing='.3rem' textAlign='left' alignItems='flex-start'>
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
      <VStack
        justifyContent='space-between'
        alignItems={['center', null, 'flex-end']}
      >
        <Form />
        
        {!mobile && (
          <Box color='gray.400'>Copyright 2023. All Rights Reserved</Box>
        )}
      </VStack>
    </Stack>
  );
}

export { Footer };
