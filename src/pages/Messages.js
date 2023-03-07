import MsgSidebar from '../components/MessagerPages/MsgSidebar';
import MsgConversation from '../components/MessagerPages/MsgConversation';
import supabase from '../supabase';
import { useEffect, useState } from 'react';
import { Flex, HStack, Divider } from '@chakra-ui/react';

export default function Messages() {
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
