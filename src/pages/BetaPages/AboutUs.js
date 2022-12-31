import { Box, Center, Flex, Heading, Spacer, Text, useColorMode } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';
import React from 'react';

const AboutUs = () => {
  const { colorMode } = useColorMode();

  return (
    <Center marginBottom={30}>
      <Box boxShadow={"2xl"} bgColor={colorMode === 'dark' ? 'gray.900' : 'gray.100'} borderRadius={10} w="75%" >
      <Center flexDirection="column" gap={3} margin={10}>
        <Heading>
        About Us
        </Heading>
        <h1>
          Mission
        </h1>
        <Text>
          Build your community and attack your goals!
        </Text>

        <h2>
          Values
        </h2>
        <Text>
          Work is tough! We know that no amount of schedules, sticky notes, and to-do lists 
          can help you feel more motivated to accomplish your goals than that sense of 
          accountability derived from friends holding you responsible, and game that we seamlessly 
          incorporate into GoalTac. Find your community and strive towards your goals together!
        </Text>

        <h2>
          Story
        </h2>
        <Text>
          GoalTac started as simply an idea to empower students to improve their work
          ethic. As a student I have many responsibilities, and juggling those can be quite
          a chore; I tried many different methods of organizing my tasks but I would jump ship
          after not being able to keep up with them anymore.
          That's not the problem.
          We need more than just a vessel to write our goals down to incite us to go after
          them. We need a combination of discipline and motivation that is derived from
          being accountable and passionate for your responsibilities.

        </Text>
      </Center>
    </Box>
    </Center>
    
  );
};

export default AboutUs;