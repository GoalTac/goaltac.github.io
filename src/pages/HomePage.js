import { Box, Button, HStack, VStack, Center } from '@chakra-ui/react';
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

  const getSession = async function () {
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
    <Center w="100vw">
      <VStack>
        {!(session === undefined) ? (
          <HStack>
            <AddTask /> 
          </HStack>) : <>"No data :("</>
          }
            
          <TaskList />

        {whatAmIShowing()}
      </VStack>
    </Center>
  );
}

export default HomePage;
