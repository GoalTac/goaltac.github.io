import { useEffect, useState } from 'react';
import {
  VStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Icon,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { BiMessageEdit } from 'react-icons/bi';

export default function MsgSidebar() {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);
  

  // Get contacts history data from Supabase
  async function fetchData() {
    // let { data: contacts, error } = await supabase.from('messages').select('*');
    // setContacts(contacts);
    // print("Contacts are: \n", contacts);
  }

  // Bug: this useEffect is causing the page to try printing for some reason
  // useEffect(() => {
  //   // fetchData();
  //   print("is this causing print")
  // }, []);

  const openConvo = async event => {
    console.log('Open convo with: ', event);
    // switch the MsgConversation() to be for the friend clicked on
  };

  const searchPeople = async event => {
    console.log('searching for ', event);
  };

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
      <VStack id='Sidebar' position='sticky' top='0'>
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
              onChange={e => setSearch(search)}
            />
            <Button>
              <Icon as={BiMessageEdit} boxSize={8} onClick={openConvo} />
            </Button>
          </InputGroup>
        </FormControl>

        {['Person 1', 'Person 2', 'Person 3'].map(
          (
            person // this line will be {contacts.map((person)... after fetching Supabase data
          ) => (
            <Card
              key={person}
              w='100%'
              h='15%'
              onClick={openConvo}
              border='1px'
            >
              <CardHeader fontSize='14px'>
                <Icon as={FaUserCircle} boxSize={4} />
                {person}
              </CardHeader>
              <CardBody fontSize={'12px'}>
                <Text>preview with: {person}.. </Text>
              </CardBody>
            </Card>
          )
        )}
      </VStack>
    </>
  );
}
