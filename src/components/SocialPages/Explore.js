import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

/*
    Creates an empty template from which data will be drawn from the database to fill each
    'card' up
    When the user scrolls down it loads in more cards
  */

export default function Explore() {
  //loading icon while taking data from the database (prevents lag)

  //list of posts (25 initially)

  //loops through list and creates a new card for each one

  //When the user hits the bottom of the page, call the function again

  return (
    <Box>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'310px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={
              'https://st.depositphotos.com/1909871/5015/i/600/depositphotos_50152811-stock-photo-parkour-men.jpg'
            }
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Backflip
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            6 Month Progress Update
          </Heading>
          <Text color={'gray.500'}>
            If I told myself that I would be able to do a backflip in 6 months,
            I wouldn't have believed myself. But here I am, 6 months later, and
            I can do a backflip. I'm so proud of myself.
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Adi</Text>
            <Text color={'gray.500'}>Jan 08, 2023</Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
