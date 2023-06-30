import { Button, Container, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Toast, useToast } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../components/Calendar/Column';
import { ColumnType } from '../components/Calendar/utils/enums';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const getColumns = () => {

  // stuff for calendar dates
  const startDate = new Date();
  const days = [
    ColumnType.SUNDAY,
    ColumnType.MONDAY,
    ColumnType.TUESDAY,
    ColumnType.WEDNESDAY,
    ColumnType.THURSDAY,
    ColumnType.FRIDAY,
    ColumnType.SATURDAY,
  ];

  const startDay = startDate.getDay();
  const reorderedDays = [...days.slice(startDay), ...days.slice(0, startDay)];

  return reorderedDays.map((day, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return <Column key={index} column={day} />;
  });
};

function Calendar() {
  // failsafe redirect to login if not authenticated
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data)
        console.log(data);
      if (error) {
        navigate('/login');
      }
    };
    getUser();
  }, []);

  // changes the title of page to Calendar
  useEffect(() => {
    document.title = 'Calendar';
  }, []);

  // set up state variables for the name modal and user name input fields
  const [showNameModal, setShowNameModal] = useState(false);
  const [userName, setUserName] = useState('');

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

  // call the check_if_fully_in function to check if the user has entered their name
  check_if_fully_in();

  // insert the user's name in the user_profile table
  const handleNameSubmit = async () => {
    // get the user's information
    const { data: { user } } = await supabase.auth.getUser()

    console.log(user?.id);

    const { data, error } = await supabase
      .from('profiles')
      .insert({ username: userName, userid: user?.id});

    if (error) {
      toast({
        title: 'Username Taken',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log(data);
      setShowNameModal(false);
    }
  };

  const toast = useToast();


  const columns = getColumns();
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={6}>

          {/* calendar */}
          <SimpleGrid columns={{ base: 1, md: 7 }} spacing={{ base: 16, md: 2 }} pt={10}>
            {columns}
          </SimpleGrid>

          {/* modal for name and username */}
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
        </Container>
      </DndProvider>
    </main>
  );
}

export default Calendar;