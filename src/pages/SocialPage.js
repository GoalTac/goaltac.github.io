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

export default function SocialPage() {
  return (
    <Flex w='100%' h='100%' padding='10' gap={15}>
      <Sidebar />
      <Explore />
    </Flex>
  );
}
