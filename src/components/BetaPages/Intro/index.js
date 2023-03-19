import React from 'react';
import { Box, Flex, Image, Button, VStack } from '@chakra-ui/react';

import illustrationIntro from '../resources/images/illustration-intro.svg';
import createTask from '../../../images/CreateTask.png';

function Intro() {
  return (
    <Flex
      gap={['30px', null, '110px']}
      flexDirection={['column-reverse', null, 'row']}
      alignItems='center'
      px={['1rem', null, '4rem']}
      py='3rem'
      id='product'

    >
      <VStack
        alignItems={['center', null, 'flex-start']}
        textAlign={['center', null, 'left']}>
        <Box fontSize={['37px', '3.35rem']} fontWeight='700' lineHeight='1.1' bgGradient='linear(to-t, teal.300, blue.500)'
        bgClip='text'>
          Work Harder and Smarter
        </Box>
        <Box maxWidth={['100%', '80%']} lineHeight='1.7'>
          GoalTac revolutionizes productivity by focusing on the key drivers
          to success that many people do not have: <b>consistency and motivation</b>.
        </Box>
      </VStack>
      <Image src={createTask} width='400px' height='350px' borderRadius='12px' boxShadow='0px 10px 10px gray'/>
    </Flex>
  );
}

export { Intro };
