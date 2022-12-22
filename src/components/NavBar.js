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
} from '@chakra-ui/react';
import Settings from './Settings';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Heading
                  fontWeight="extrabold"
                  bgGradient="linear(to-l, teal.300, blue.500)"
                  bgClip="text"
                >
                  GoalTac
                </Heading>
              </Th>
              <Th>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input variant="filled" placeholder="Find a Clan" />
                </InputGroup>
              </Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
    </header>
  );
}
