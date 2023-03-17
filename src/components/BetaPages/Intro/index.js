import React from 'react';
import { Box, Flex, Image, Button, VStack } from '@chakra-ui/react';

import illustrationIntro from '../resources/images/illustration-intro.svg';
import createTask from '../../../images/CreateTask.png';

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
        <Box fontSize={['37px', '3.35rem']} fontWeight='700' lineHeight='1.1' bgGradient='linear(to-t, teal.300, blue.500)'
        bgClip='text'>
          Work Harder and Smarter
        </Box>
        <Box color='blue.light' maxWidth={['100%', '80%']} lineHeight='1.7'>
          GoalTac revolutionizes productivity by focusing on the key drivers
          to success that many people do not have: <b>consistency and motivation</b>.
        </Box>
      </VStack>
      <Image src={createTask} width='500px' height='400px' borderRadius='12px' boxShadow='0px 10px 10px gray'></Image>
    </Flex>
  );
}

export { Intro };
