import React from 'react';
import { Box, Flex, Image, Button, VStack } from '@chakra-ui/react';

import illustrationIntro from '../resources/images/illustration-intro.svg';

function Intro() {
  return (
    <Flex
      gap={['50px', null, '110px']}
      flexDirection={['column-reverse', null, 'row']}
      alignItems='center'
      px={['1rem', null, '6rem']}
      py='3rem'
      id='home'
    >
      <VStack
        alignItems={['center', null, 'flex-start']}
        textAlign={['center', null, 'left']}
        spacing='30px'
      >
        <Box fontSize={['37px', '3.35rem']} fontWeight='700' lineHeight='1.1'>
          Bring everyone together to build better products
        </Box>
        <Box color='blue.light' maxWidth={['100%', '70%']} lineHeight='1.7'>
          Manage makes it simple for software teams to plan day-to-day tasks
          while keeping the larger team goals in view.
        </Box>
        <Button variant='solid'>Get Started</Button>
      </VStack>
      <Image src={illustrationIntro}></Image>
    </Flex>
  );
}

export { Intro };
