import React from 'react';
import { Box, Flex, Image, Button, VStack } from '@chakra-ui/react';
import { SignUp } from './Button.js';

import illustrationIntro from './resources/images/illustration-intro.svg';

function Intro() {
  return (
    <Flex
      alignItems={['center', 'flex-start']}
      textAlign={['center', 'flex-start']}
      id='product'
    >
      <VStack rowGap='2rem'>
        <Box fontSize='4rem'  fontWeight='700' lineHeight='1.1' bgGradient='linear(to-t, teal.300, blue.500)'
        bgClip='text'>
          Productive Together
        </Box>
        <Box maxWidth={['90%', '70%']} lineHeight='1.4' fontSize='1.5rem'>
          Have a goal that you want to work towards? Data shows that people may be
          inclined to feel more motivated and disciplined when they around like-minded peers.
          Join a community at GoalTac today to attack the goals you share together!
        </Box>
        {SignUp()}
      </VStack>
    </Flex>
  );
}

export { Intro };