import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';

type Props = {
  title: string;
  children: React.ReactNode;
};

/*
NOTICE
THIS WILL BE REMOVED ~ My Phung

*/

export default function CheckAndTitle({ title, children }: Props) {

  // check if the user has entered their name in the user_profile table
  async function check_if_fully_in() {

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return;
    }

    // get user's id from the friend_requests table
    const { data: userRequests, error: requestsError } = await supabase
      .from('friend_requests')
      .select('requests')
      .eq('userid', user.id)

    // check if they have a row in the friend_requests table
    if (requestsError) {
      console.log(requestsError)
    }
    if (userRequests?.length === 0) {
      // if they don't have a row, insert one
      const { error: insertRequestsError } = await supabase
        .from('friend_requests')
        .insert({ userid: user.id })

      if (insertRequestsError) {
        console.log(insertRequestsError)
      }
    }
  }
  return (
    <>
      {children}
    </>
  );
}