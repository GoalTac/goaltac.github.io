import React from 'react';
import CircleIcon from './CircleIcon';
import { SearchIcon } from '@chakra-ui/icons'
import {
  useColorMode,
  Text,
  Heading,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  Badge,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Tag,
  TagLeftIcon,
  TagLabel,
  Icon,
  Progress,
  HStack,
  Center,
  VStack,
} from '@chakra-ui/react';
import Settings from './Settings';
import { Outlet } from 'react-router-dom';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack>
      <HStack>
        <Heading
          fontWeight="extrabold"
          bgGradient="linear(to-l, teal.300, blue.500)"
          bgClip="text"
        >
          GoalTac
        </Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input w='30vw' variant="filled" placeholder="Find a Clan" />
        </InputGroup>
        <Settings />
      </HStack>
      <Outlet />
    </VStack>
  );
}
