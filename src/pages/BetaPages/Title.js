import {
    Box,
    Button,
    Flex,
    Img,
    Spacer,
    Text,
    useMediaQuery,
  } from '@chakra-ui/react';
  import React from 'react';

  const Hero = () => {
    return (
      <Flex
        alignItems="center"
        w="full"
        justifyContent="space-between"
        flexDirection='column'
      >
        <Text 
          fontSize="3xl"
          marginBottom={3}>
          Work Better
        </Text>
        <Text fontSize="xl" w='40%'>
          Compete with others in a ladder-style game by accomplishing your goals
        </Text>

      </Flex>
    );
  };
  
  export default Hero;