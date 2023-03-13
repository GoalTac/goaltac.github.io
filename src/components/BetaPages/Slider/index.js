import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Dots.css';
import React from 'react';
import { Box, Image, Button, VStack } from '@chakra-ui/react';

import person1 from '../resources/images/avatar-ali.png';
import person2 from '../resources/images/avatar-anisha.png';
import person3 from '../resources/images/avatar-richard.png';
import person4 from '../resources/images/avatar-shanai.png';

const comments = [
  {
    image: person1,
    name: 'Ali Bravo',
    text: `“We have been able to cancel so many other subscriptions since using 
        Manage. There is no more cross-channel confusion and everyone is much 
        more focused.” `,
  },
  {
    image: person2,
    name: 'Anisha Li',
    text: `“Manage has supercharged our team’s workflow. The ability to maintain 
        visibility on larger milestones at all times keeps everyone motivated.”`,
  },
  {
    image: person3,
    name: 'Richard Watts',
    text: `“Manage allows us to provide structure and process. It keeps us organized 
        and focused. I can’t stop recommending them to everyone I talk to!” `,
  },
  {
    image: person4,
    name: 'Shanai Gough',
    text: ` “Their software allows us to track, manage and collaborate on our projects 
        from anywhere. It keeps the whole team in-sync without being intrusive.”`,
  },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
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
        What they've said
      </Box>
      <Carousel
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
        showDots={showDots}
        responsive={responsive}
        autoPlay={!showDots ? true : false}
        autoPlaySpeed={2000}
        infinite={true}
      >
        {comments.map((comment, index) => {
          return (
            <VStack
              key={index}
              cursor='grab'
              p='2rem'
              paddingBottom='4rem'
              textAlign='center'
              userSelect='none'
            >
              <Image src={comment.image}></Image>
              <Box fontWeight='800'>{comment.name}</Box>
              <Box color='blue.light'>{comment.text}</Box>
            </VStack>
          );
        })}
      </Carousel>
      <Button variant='solid' mt='3rem'>
        Get Started
      </Button>
    </Box>
  );
}

export { Slider };
