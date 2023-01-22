import {
  Box,
  Heading,
  HStack,
  useColorModeValue,
  Link,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';

export default function HelpPage() {
  return (
    <Center>
      <Box
        maxW={'600px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        m={6}
        overflow={'hidden'}
      >
        <HStack>
          <Link isExternal href='https://discord.gg/EzFPQDAKGf'>
            <IconButton
              variant='outlined'
              icon={<FaDiscord size='sm' color='rgba(114,137,218)' />}
            />
          </Link>
          <p>&nbsp;</p>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Join the Discord and Post the question under the bugs channel
          </Heading>
        </HStack>
      </Box>
    </Center>
  );
}
