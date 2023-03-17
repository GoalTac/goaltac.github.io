import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Dots.css';
import React from 'react';
import {
  Box,
  Image,
  Button,
  VStack,
  useColorModeValue,
  Avatar,
  Badge,
  Heading,
  Flex,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';

const staffProfiles = [
  {
    name: 'My Phung',
    image: null,
    title: 'Founder',
    desc: 'Entrepreneur, student, chess and guitar enthusiast. Chat with me on Discord @ Wrys#8935',
    badges: [
      'weightlifting',
      'chess',
      'entrepreneurship',
      'guitar',
      'academics',
    ],
    contact: 'myphungquoc@gmail.com',
  },
  {
    name: 'Aditya Chandraker',
    image: null,
    title: 'Lead Developer',
    desc: 'Premed student, CS minor, Pianist, and a fan of spicy food',
    badges: ['tabletennis', 'chess', 'art', 'taekwondo', 'academics'],
    contact: 'aditya.chandraker@uconn.edu',
  },
  {
    name: 'Ibrahima Capo-ChiChi',
    image: null,
    title: 'Developer',
    desc: '',
    badges: [''],
    contact: '',
  },
  {
    name: 'Nikhil Ghosh',
    image: null,
    title: 'Developer',
    desc: '',
    badges: [''],
    contact: '',
  },
  {
    name: 'Jack Cornell',
    image: null,
    title: 'Developer',
    desc: '',
    badges: [''],
    contact: '',
  },
  {
    name: 'Colin Acerbi',
    image: null,
    title: 'Developer',
    desc: '',
    badges: [''],
    contact: '',
  },
  {
    name: 'Jordan Hawkes',
    image: null,
    title: 'Marketing',
    desc: '',
    badges: [''],
    contact: '',
  },
  {
    name: 'Paolo Rangonese',
    image: null,
    title: 'Finance',
    desc: '',
    badges: [''],
    contact: '',
  },
  {
    name: 'Seth Pappalardo',
    image: null,
    title: 'Business',
    desc: '',
    badges: [''],
    contact: '',
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 99999, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

function Slider({ showDots }) {
  return (
    <Box
      gap='4rem'
      paddingTop={['0', null, '2rem']}
      textAlign='center'
      id='community'
    >
      <Box
        fontSize={['30px', '4xl']}
        fontWeight='700'
        lineHeight='1.1'
        px={['2rem', null, '6rem']}
        py='2rem'
      >
        Our Team
      </Box>
      <Carousel
        removeArrowOnDeviceType={[
          'mobile',
          'tablet',
          'desktop',
        ]}
        showDots={showDots}
        responsive={responsive}
        autoPlay={!showDots ? true : false}
        autoPlaySpeed={2000}
        infinite={true}
        focusOnSelect={true}
        arrow={true}
      >
        {staffProfiles.map((staff, index) => {
          return (
            <Box p='0.5rem' paddingY='6rem' pt='2rem'>
              <VStack
                key={index}
                cursor='grab'
                textAlign='center'
                alignItems='center'
                alignContent='center'
                userSelect='none'
                bg='transparent'
                rounded={'lg'}
                transition='boxShadow 3s'
                _hover={{
                  boxShadow: '0px 0px 2px gray',
                }}
                py='2rem'
              >
                <Avatar
                  size={'xl'}
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                  bgGradient='radial(blue.500, teal.300)'
                />
                <Heading fontSize={'2xl'} fontFamily={'body'} >
                  {staff.name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                  {staff.title}
                </Text>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  {staff.desc}
                </Text>
                <Flex
                  flexWrap='wrap'
                  justifyItems='center'
                  alignContent='center'
                  alignItems='center'
                  columnGap={2}
                  rowGap={1}
                  p={3}
                >
                  {staff.badges.map((badge, index) => {
                    return (
                      <Badge
                        px={2}
                        py={1}
                        bg='transparent'
                        fontWeight={'400'}
                        key={index}
                      >
                        {badge}
                      </Badge>
                    );
                  })}
                </Flex>
                <Stack>
                  <Link
                    href={'mailto: ' + `${staff.contact}`}
                    flex={1}
                    fontSize={'sm'}
                    marginBottom={7}
                    _focus={{
                      bg: 'gray.200',
                    }}
                    fontWeight='600'
                  >
                    {staff.contact}
                  </Link>
                </Stack>
              </VStack>
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
}

export { Slider };
