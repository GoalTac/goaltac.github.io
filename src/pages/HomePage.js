import { Box, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';
import NavBar from '../components/HomePages/NavBar';

function HomePage() {
  //React Router DOM
  const navigate = useNavigate();
  const { state } = useLocation();
  //Supabase
  const [session, setSession] = useState();
  const [user, setUser] = useState(undefined);

  const whatAmIShowing = function () {
    supabase.auth.getSession().then(table => {
      if (!table.data?.session) {
        navigate('/login');
      } else {
        setSession(table.data.session);
      }
    });
  };

  const onSignOut = async function () {
    const { error } = await supabase.auth.signOut();
    navigate('/login');
  };

  const getSession = async function () {
    console.log('Entered');
    await supabase.auth.getSession().then(table => {
      if (!table.data?.session) {
        console.log("\nThere's no session");
        navigate('/login');
      } else {
        setSession(table.data);
      }
    });
  };

  useEffect(() => {
    getSession();
  }, []);

  
  return (
    <>
      {whatAmIShowing()}
      {(session === undefined) ? (
        <>"No data :("</>
      ) : (
        <Box w="100%" h="100%">
          <NavBar />


          <HStack>
            <AddTask />
            <Button pr="15px" onClick={onSignOut}>
              Sign Out
            </Button>
          </HStack>


          <TaskList />

        </Box>
      )}
    </>
    
  );
}

export default HomePage;
