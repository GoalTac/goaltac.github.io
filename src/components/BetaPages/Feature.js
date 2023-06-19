import React from 'react';
import { Box, Flex, VStack, Stack, Text, HStack, Heading } from '@chakra-ui/react';
import imgBg from './resources/images/bg-tablet-pattern.svg';

const content = [
  {
    number: '01',
    title: 'Have fun with it!',
    text: <p>Goal execution is gamified and will help make work fun!
            Reach significant milestones whilst competing with 
            your peers to accomplish shared goals through various
            challenges and games. &#x1F60A;</p>,
  },
  {
    number: '02',
    title: 'Meet new friends',
    text: <p>Join or create your own community specified towards a topic of choice! 
            Communities are ranked based on how many points they earn. The more
            productive you and your community are, the higher you place! This will
            give that accountability rarely seen on online platforms, especially in
            a productive setting.
          </p>,
  },
  {
    number: '03',
    title: 'Everything you need in one place',
    text: <p>Want to just organize your tasks? No problem.
            Want to use the app to meet other people? You can do that too.
            GoalTac's app allows you to use it in any way you like without
            jeopordizing your experience! 
          </p>,
  },
  {
    number: '04',
    title: 'Superior organization',
    text: <p>We prioritize high customizability in task creation,
            which can be visualized in many ways! Use GoalTac to track
            progress towards any goal you aspire to accomplish.
          </p>,
  }
];

function Features({ hideBgFeatureTitle }) {
  return (
    <Stack
      id='features'
      direction={['column', null, 'row']}
      spacing='6rem'
      mt='8rem'
      px={['1rem', null, '6rem']}
      py='3rem'
      position='relative'>
        
      <VStack
        alignItems={['center', null, 'flex-start']}
        textAlign={['center', null, 'left']}
        minWidth='50%'
        spacing='2rem'>

        <Box fontSize='3rem' bgGradient='linear(to-t, teal.300, blue.500)' fontWeight='700' lineHeight='1.1' bgClip='text'>
          What is GoalTac?
        </Box>
        
        <VStack rowGap='2rem' paddingStart={['', null, '2rem']} maxWidth={['100%', '80%']} fontSize='1.5rem'>
          
          <Box >
            <Heading >Background</Heading>
            <Text paddingStart={['', null, '2rem']}>
            Motivation to better oneself is declining 
            in this day and age and <b>we want to make a dent in this issue. </b>
          </Text>
          </Box>
          
          <Box>
            <Heading >What is out There</Heading>
            <Text paddingStart={['', null, '2rem']}>
            <b>We want to cater to the least motivated people by pitching in the help of others, keeping you accountable! </b>
            There is an inherent flaw in productivity apps today, which have very few strong
            extrinsic motivators to come back to the app.
            </Text>
          </Box>

          <Box>
            <Heading>Details</Heading>
            <Text paddingStart={['', null, '2rem']}>
            <b>We promote a new lifestyle where you and your peers hold yourself accountable. </b>
            You have the option to join user-made communities specific to the goal you want to accomplish.
            Not only are you surrounded by like minded people,
            but you also have the option to compete with them through the various goals that can be posted!
            </Text>
          </Box>
        </VStack>
      </VStack>
      <VStack spacing='2rem'>
        {content.map((vstack, index) => (
          <VStack key={index}>
            <Flex width='100%' alignItems='center'>
              {hideBgFeatureTitle && (
                <Box
                  width='92%'
                  bgColor='red.light'
                  height='34px'
                  position='absolute'
                  zIndex='1'
                  left='46px'
                ></Box>
              )}
              <Box
                layerStyle='bgRed'
                borderRadius='99px'
                p='.3rem 1rem'
                fontWeight='600'
                width='55px'
                textAlign='center'
                position='relative'
                zIndex='5'
              >
                {vstack.number}
              </Box>
              <Box
                fontWeight='600'
                position='relative'
                zIndex='5'
                marginLeft='20px'
              >
                {vstack.title}
              </Box>
            </Flex>
            <Box paddingLeft={['0', '75px']}>
              {vstack.text}
            </Box>
              
          </VStack>
          
        ))}
      </VStack>
    </Stack>
  );
}

export { Features };
