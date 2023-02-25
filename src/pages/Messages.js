import {
  Flex,
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  StackDivider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

// I need help with the below import lines, the import isn't working and I can't figure out why
// import { MsgSidebar } from '../components/MessagerPages/MsgSidebar';
// import { MsgHistory } from '../components/MessagerPages/MsgHistory';

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  console.log('Messages has loaded.');

  // Get message history data from Supabase
  async function fetchData() {
    // let { data: contacts, error } = await supabase.from('profiles').select('*');
    // setContacts(contacts);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // If the user has no messages, display something different
//   if (!contacts || !contacts.length) {
//     return (
//       <Box align='center'>
//         <Text>No messages yet!</Text>
//       </Box>
//     );
//   }

  return (
    <>
      <Flex p='5' alignItems='center'>
        <Box >
          <Heading>Messages</Heading>
          <HStack
            divider={<StackDivider />}
            borderColor='gray.100'
            borderWidth='2px'
            p='5'
            borderRadius='lg'
            alignItems='center'
          >
            {/* <MsgSidebar /> 
             <MsgHistory /> */}
            <VStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<FaSearch color='gray.300' />}
                  />
                  <Input id='search' placeholder='search for person' />
                </InputGroup>
              </FormControl>
              {['Person 1', 'Person 2', 'Person 3'].map((person) => ( // this line will be {contacts.map(... after fetching Supabase data 
                <Card key={person} size='sm'>
                  <CardHeader>
                    <Heading size='sm'> 
                      <Icon as={FaUserCircle} boxSize={4} />{person}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>preview with {person}.. </Text>
                  </CardBody>
                </Card>
            ))}
            </VStack>

            <VStack>
              <Heading size='sm'> 
                <Icon as={FaUserCircle} boxSize={5} />
                Person X
              </Heading>
              <Card size='lg'>
                <CardBody>
                  (message history with person)
                  <Text>Newer message</Text>
                </CardBody>
                <CardFooter>
                  <FormControl>
                    <InputGroup>
                      <Input placeholder='send message' />
                      <Button>Send</Button>
                    </InputGroup>
                  </FormControl>
                </CardFooter>
              </Card>
            </VStack>
          </HStack>
        </Box>
      </Flex>
    </>
  );
}
