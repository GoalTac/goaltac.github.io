import React from 'react';
import { Box, Button, Stack, Spinner } from '@chakra-ui/react';
import imgBg from '../resources/images/bg-simplify-section-desktop.svg';
import imgBgMobile from '../resources/images/bg-simplify-section-mobile.svg';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { useState } from 'react';
function Prefooter() {
  const [isLoading, setIsLoading] = useState(false); //for login loading

  const loading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <Stack
      id='careers'
      direction={['column', null, 'row']}
      alignItems='center'
      justifyContent={['center', null, 'space-between']}
      py='3rem'
      px={['2rem', null, '7rem']}
      spacing='2rem'
      height={['390px', null, '220px']}
      position='relative'
      _before={{
        content: "''",
        background: [
          `0 17%/23% no-repeat url(${imgBgMobile})`,
          null,
          `20px/114% no-repeat url(${imgBg})`,
        ],
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        backgroundPosition: { base: '0% 43%', md: '1px -154px' },
      }}
    >
      <Box
        fontSize={['35px', '4xl']}
        fontWeight='700'
        lineHeight='1.1'
        maxWidth={['100%', null, '40%']}
        textAlign={['center', 'left']}
      >
        Be the change you want to see today.
      </Box>
      <NavLink
        to='/signup'
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''}>
        <Button
          width={250}
          height={100}
          variant='solid'
          fontWeight='800'
          fontSize={30}
          onClick={loading}
          bgColor='blackAlpha.600'
          bgClip='text'
          borderRadius='30px'
          boxShadow='0 6px 6px black'
          _active={{}}
          _hover={{
            boxShadow: '0px 1px 1px black',
          }}>
        
          {isLoading == true ? <Spinner color='black' /> : 'Get Started'}
        </Button>
      </NavLink>
    </Stack>
  );
}

export { Prefooter };
