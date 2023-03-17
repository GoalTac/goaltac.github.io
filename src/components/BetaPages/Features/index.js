import React from 'react';
import { Box, Flex, VStack, Stack } from '@chakra-ui/react';
import imgBg from '../resources/images/bg-tablet-pattern.svg';

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
      id='product'
      direction={['column', null, 'row']}
      spacing='6rem'
      mt='8rem'
      px={['1rem', null, '6rem']}
      py='3rem'
      position='relative'
      
      _after={{
        content: "''",
        background: [
          `center/55% no-repeat url(${imgBg})`,
          null,
          `center/38% no-repeat url(${imgBg})`,
        ],
        position: 'absolute',
        left: ['32%', null, '-48%'],
        top: ['-117%', null, '79px'],
        zIndex: '-2',
        width: ['145%', null, '91%'],
        height: '178%',
      }}
    >
      <VStack
        alignItems={['center', null, 'flex-start']}
        textAlign={['center', null, 'left']}
        minWidth='40%'
        spacing='2rem'
        mb='4rem'
      >
        <Box fontSize={['30px', '4xl']} fontWeight='700' lineHeight='1.1'>
          Why is GoalTac Better?
        </Box>
        <Box paddingStart={5} maxWidth={['100%', '80%']} color='blue.light'>
          Compared to other goal tracking apps, GoalTac is a 
          shot of energy that will keep you motivated to
          become your most productive and accomplished self
        </Box>
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
