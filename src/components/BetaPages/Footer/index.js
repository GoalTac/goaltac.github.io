import React from 'react';
import { Form } from '../Form';
import { Box, Image, HStack, Button, VStack, Stack } from '@chakra-ui/react';

import logo from '../resources/images/logo-footer.svg';
import iconFacebook from '../resources/images/icon-facebook.svg';
import iconYoutube from '../resources/images/icon-youtube.svg';
import iconTwitter from '../resources/images/icon-twitter.svg';
import iconPinterest from '../resources/images/icon-pinterest.svg';
import iconInstagram from '../resources/images/icon-instagram.svg';
import { Link, animateScroll as scroll } from 'react-scroll';

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
  iconFacebook,
  iconYoutube,
  iconTwitter,
  iconPinterest,
  iconInstagram,
];

function Footer({ mobile }) {
  return (
    <Stack
      id='about'
      bg='blue.veryDark'
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
          <Box color='blue.light'>Copyright 2023. All Rights Reserved</Box>
        )}
        <Image src={logo} pt='5px' maxWidth={['200px', '150px']} />
        <HStack
          spacing='1rem'
          justifyContent={['space-around', null]}
          width='100%'
        >
          {icons.map((icon, index) => {
            return (
              <Image
                key={index}
                src={icon}
                cursor='pointer'
                height={['32px', '20px']}
                _hover={{
                  filter:
                    'invert(58%) sepia(54%) saturate(470%) hue-rotate(323deg) brightness(103%) contrast(95%)',
                }}
                transition='.4s all ease'
              ></Image>
            );
          })}
        </HStack>
      </Stack>
      <HStack spacing={['5rem', null, '10rem']}>
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
                <Button variant='footer'>{section.name}</Button>
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
                <Button variant='footer'>{section.name}</Button>
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
          <Box color='blue.light'>Copyright 2023. All Rights Reserved</Box>
        )}
      </VStack>
    </Stack>
  );
}

export { Footer };
