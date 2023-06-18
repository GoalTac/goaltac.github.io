import React from 'react';
import { Box, Flex, Image, Button, VStack } from '@chakra-ui/react';

import illustrationIntro from '../resources/images/illustration-intro.svg';

function Intro() {
  return (
    <Flex
      alignItems='center'
      textAlign='center'
      id='product'
    >
      <VStack>
        <Box fontSize={['37px', '3.35rem']} fontWeight='700' paddingTop='5rem' lineHeight='1.1' bgGradient='linear(to-t, teal.300, blue.500)'
        bgClip='text'>
          Work Harder and Smarter
        </Box>
        <Box maxWidth={['100%', '80%']} lineHeight='1.7'>
          GoalTac revolutionizes productivity by focusing on the key drivers
          to success that many people do not have: <b>consistency and motivation</b>.
        </Box>
      </VStack>
    </Flex>
  );
}

export { Intro };
