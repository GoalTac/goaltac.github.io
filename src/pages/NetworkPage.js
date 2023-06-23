import {
  Box,
  Center,
  HStack,
  Stack,
  VStack,
  Flex,
  useColorModeValue,
  Image,
  Spacer,
  Heading,
  Text,
} from '@chakra-ui/react';
import Explore from '../components/NetworkPages/Explore';
import Sidebar from '../components/NetworkPages/Sidebar';
import CommunitySide from '../components/NetworkPages/CommunitySide';

export default function NetworkPage() {



  return (
    <Flex overflowY='scroll'> 
      <Sidebar />
      <Explore/>
    </Flex>
  );
}
