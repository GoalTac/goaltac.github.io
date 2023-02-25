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
  Divider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { BiMessageEdit } from 'react-icons/bi'

// I need help with the below import lines, the import isn't working and I can't figure out why
// import { MsgSidebar } from '../components/MessagerPages/MsgSidebar';
// import { MsgConversation } from '../components/MessagerPages/MsgConversation';

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState([]);
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

  const openConvo = async event => {
    console.log('Open convo with: ', event);
    // switch the MsgConversation() to be for the friend clicked on
  };
  
  const searchPeople = async event => {
    console.log('searching');
  };
  
  const MsgSidebar = () => {
    return (
      <>
        <VStack id='Sidebar'>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<FaSearch color='gray.300' />}
              />
              <Input 
                placeholder='search for person' 
                type='text'
                value={search}
                onChange={e => setSearch({search:search})}
              />
              <Icon as={BiMessageEdit} boxSize={8} onClick={openConvo}/>
            </InputGroup>
          </FormControl>

          {['Person 1', 'Person 2', 'Person 3'].map(
            (person) => ( // this line will be {contacts.map(... after fetching Supabase data
              <Card key={person} w='100%' h='15%' onClick={openConvo} border='1px'>
                <CardHeader>
                  <Heading fontSize='14px'>
                    <Icon as={FaUserCircle} boxSize={4} />
                    {person}
                  </Heading>
                </CardHeader>
                <CardBody fontSize={'12px'}>
                  <Text>preview with {person}.. </Text>
                </CardBody>
              </Card>
            )
          )}
        </VStack>
      </>
    );
  };
  
  const MsgConversation = () => {
    return (
      <>
        <VStack id='Conversation' w='100%' h='100%' >
          <Card w='95%' h='95%' border='1px'>
            <CardHeader align='center'>
              <Icon as={FaUserCircle} boxSize={5} />
              Person X
            </CardHeader>
            <CardBody verticalAlign={'bottom'}>
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
      </>
    );
  };
  
  return (
    <>
      <Flex w='100wh' h='100wh' justify='center'>
        <HStack
          p='10px'
          borderColor='gray.200'
          borderWidth='2px'
          borderRadius='lg'
          spacing='1%'
        >
          <MsgSidebar />
          <Divider orientation='vertical'/>
          <MsgConversation />
        </HStack>
      </Flex>
    </>
  );
}

