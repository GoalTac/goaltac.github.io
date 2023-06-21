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
import Explore from '../components/SocialPages/Explore';
import Sidebar from '../components/SocialPages/Sidebar';
import CommunitySide from '../components/SocialPages/CommunitySide';

export default function NetworkPage() {



  return (
    <Flex overflowY='scroll'> 
      <Explore/>
      
    </Flex>
  );
}
