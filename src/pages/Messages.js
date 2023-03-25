import MsgSidebar from '../components/MessagerPages/MsgSidebar';
import MsgConversation from '../components/MessagerPages/MsgConversation';
import { useEffect, useState } from 'react';
import { Flex, HStack, Divider } from '@chakra-ui/react';
import { useSession } from '../hooks/SessionProvider';

/*

  //https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/

  Messages File

  1. Query messages data from the database (only username and profile picture) sorted by recent time
  2. Input data into the sidebar component which will return the sidebar
  -- Create callback function to change the current variable that was initialized in Messages.js to then pass into msgConversations
  3. Show msgConversation of the default 'current' variable

  Functionality
  1. Options button
  -- Delete, mute, invite to community, block, mark unread
  2. Searching for DMs
  -- Search by person, keywords

  3. Create new message
  -- Modal to prompt user to enter username of person to DM
  -- Callback function




  1. A function to open the conversation selected in the sidebar
  -- Uses a button and calls 'on User Click' 
  -- Parameters may include the user clicking the button, and the user they want to talk to

  2. Return the entire component of specific data to the person they are DMing
  -- Returns the component


  Supabase tables
  - Users Conversation
  -- Conversations
  ---- Message

  Users conversation
  - User ID
  - List of conversations
  - List of blocked
  - etc.. (related to how user wants to view individual conversations)

  Conversations
  - List of users who can view the conversation
  - List of messages

  Message
  - Sender ID
  - Conversation ID
  - Time created

*/





export default function Messages() {
  const { user: user, supabase: supabase } = useSession();
  console.log('Messages has loaded.');

  const openConvo = async event => {
    console.log('Open convo with: ', event);
    // switch the MsgConversation() to be for the friend clicked on
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
          <Divider orientation='vertical' />
          <MsgConversation />
        </HStack>
      </Flex>
    </>
  );
}
