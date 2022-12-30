import { Box, Center, Flex, Heading, Spacer, Text, useColorMode } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';
import React from 'react';

const AboutUs = () => {
  const { colorMode } = useColorMode();

  return (
    <Center marginBottom={30}>
      <Box bgColor={colorMode === 'dark' ? 'gray.900' : 'gray.100'} borderRadius={10} w="75%" >
      <Center flexDirection="column" gap={5} marginY={10}>
        <Heading alignText="center">
        About Us
        </Heading>
        <Text>
        SUBSTITUTE THIS LATER
        </Text>
      </Center>
    </Box>
    </Center>
    
  );
};

export default AboutUs;