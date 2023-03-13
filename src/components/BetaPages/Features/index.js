import React from 'react';
import { Box, Flex, VStack, Stack } from '@chakra-ui/react';
import imgBg from '../resources/images/bg-tablet-pattern.svg';

const content = [
  {
    number: '01',
    title: 'Track company-wide progress',
    text: `See how your day-to-day tasks fit into the wider vision. Go from 
        tracking progress at the milestone level all the way done to the 
        smallest of details. Never lose sight of the bigger picture again.`,
  },
  {
    number: '02',
    title: 'Advanced built-in reports',
    text: `Set internal delivery estimates and track progress toward company 
        goals. Our customisable dashboard helps you build out the reports 
        you need to keep key stakeholders informed.`,
  },
  {
    number: '03',
    title: 'Everything you need in one place',
    text: `Stop jumping from one service to another to communicate, store files, 
        track tasks and share documents. Manage offers an all-in-one team 
        productivity solution.`,
  },
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
      >
        <Box fontSize={['30px', '4xl']} fontWeight='700' lineHeight='1.1'>
          What’s different about Manage?
        </Box>
        <Box maxWidth={['100%', '70%']} color='blue.light'>
          Manage provides all the functionality your team needs, without the
          complexity. Our software is tailor-made for modern digital product
          teams.
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
            <Box paddingLeft={['0', '75px']} color='blue.light'>
              {vstack.text}
            </Box>
          </VStack>
        ))}
      </VStack>
    </Stack>
  );
}

export { Features };
