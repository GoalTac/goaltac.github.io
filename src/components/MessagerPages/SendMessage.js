import supabase from '../../supabase';
import { useEffect, useState } from 'react';
import { FormControl, InputGroup, Input, Button } from '@chakra-ui/react';

export default function SendMessage(props) {
  const [message, setMessage] = useState({
    sender_id: null,
    recipient_id: null,
    text: '',
  });
  const { sender_id, recipient_id, text } = message;


  const sendMessage = async () => {
    print('Lets send the message');
    setMessage(message)
    const { error } = await supabase.from('messages').insert(message);
    console.log(task);

  };

  // Keep this so that the add task knows the user's id as it loads LAST in HomePage.js
  useEffect(() => {
    setMessage({ ...message, sender_id: props.userid });
  }, [props.userid]);

  return (
    <>
      <form onSubmit={sendMessage}>
        <FormControl>
          <InputGroup>
            <Input placeholder='send message' value={text}/>
            <Button>Send</Button>
          </InputGroup>
        </FormControl>
      </form>
    </>
  );
}
