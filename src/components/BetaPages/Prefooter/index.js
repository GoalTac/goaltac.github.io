import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import imgBg from '../resources/images/bg-simplify-section-desktop.svg';
import imgBgMobile from '../resources/images/bg-simplify-section-mobile.svg';

function Prefooter() {
  return (
    <Stack
      id='careers'
      direction={['column', null, 'row']}
      bg='red.bright'
      alignItems='center'
      justifyContent={['center', null, 'space-between']}
      py='3rem'
      px={['2rem', null, '7rem']}
      mt='8rem'
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
        color='gray'
        maxWidth={['100%', null, '40%']}
        textAlign={['center', 'left']}
      >
        Simplify how your team works today.
      </Box>
      <Button variant='bgLight' mt='3rem'>
        Get Started
      </Button>
    </Stack>
  );
}

export { Prefooter };
