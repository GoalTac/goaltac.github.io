import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Link,
    Badge,
    useColorModeValue,
    IconButton,
  } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
  
  export default function StaffProfiles() {
    return (
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}

          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            My Phung
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Founder
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            Entrepreneur, student, chess and guitar enthusiast. Chat with me on Discord @ Wrys#8935
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #weightlifting
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #chess
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #entrepreneurship
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #guitar
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #academics
            </Badge>
          </Stack>
  
            <Stack>
                <Link
                    mt={3}
                    href={"mailto: myphungquoc@gmail.com"}
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    _focus={{
                    bg: 'gray.200',
                    }}>
                    myphungquoc@gmail.com
                </Link>
                
            </Stack>
        </Box>
      </Center>
    );
  }