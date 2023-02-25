import { Box, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';

function HomePage({ session }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState(null); //sets user ID not user list

  useEffect(() => {
    if (session == null) {
      navigate('/login');
    } else {
      setUser(session.user.id);
    }
  }, [user]);
  return (
    <>
      <Box w='100%' h='100%'>
        <VStack p={4}>
          <AddTask userid={user} />
          <TaskList />
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
