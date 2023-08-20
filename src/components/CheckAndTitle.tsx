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

  // changes title
  useEffect(() => {
    document.title = title;
  }, [title]);

  // set up state variables for the name modal and user name input fields
  const [showNameModal, setShowNameModal] = useState(false);
  const [userName, setUserName] = useState('');
  
  // for error messages
  const toast = useToast();

  
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      // not logged in
      if (error) {
        navigate('/login');
      } else {
        // check if they got a username
        check_if_fully_in();
      }
    };
    getUser();
  }, []);


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

    // get the user's name from the profiles table
    const { data: userProfileData, error: userProfileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('userid', user.id)

    if (userProfileError) {
      console.log(userProfileError)
      return
    }

    if (userProfileData.length === 0 || userProfileData[0].username === null) {
      setShowNameModal(true);
    }
  }


  // insert the user's name in the user_profile table
  const handleNameSubmit = async () => {
    // get the user's information
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('profiles')
      .update({ username: userName})
      .eq('userid', user?.id)
      .select()
    if (error) {
      console.log(error)
      toast({
        title: `${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setShowNameModal(false);
    }
  };


  return (
    <>
      {children}
      {/* modal for username */}
      {showNameModal && (
        <Modal isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Finish Account Setup</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Alphanumeric and lowercase letters only"
                  value={userName}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^a-z0-9]/g, '');
                  }}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleNameSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}