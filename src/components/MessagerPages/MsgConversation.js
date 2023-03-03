import SendMessage from './SendMessage';
import supabase from '../../supabase';
import { useState, useEffect } from 'react';
import {
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';

export default function MsgConversation() {
  const [user, setUser] = useState(null); //sets user ID not user list
  const [message, setMessage] = useState({
    sender_id: null,
    recipient_id: null,
    text: '',
  });

  async function fetchData() {
    let { data: message, error } = await supabase.from('messages').select('*');
    setMessage(message);
    print('Messages are: \n', message);
  }

  // Bug: this useEffect is causing the page to try printing for some reason
  // useEffect(() => {
  //   fetchData();
  //   print("is this causing print")
  // }, []);

  // useEffect(() => {
  //   if (session == null) {
  //     navigate('/beta');
  //   } else {
  //     setUser(session.user.id);
  //   }
  // }, [user]);

  return (
    <>
      <VStack id='Conversation' w='100%' h='100%'>
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
            <SendMessage userid={user}/>
          </CardFooter>
        </Card>
      </VStack>
    </>
  );
}
