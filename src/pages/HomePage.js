import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';
import Calendar from '../components/Calendar';
import supabase from '../supabase';
import NavBar from '../components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Settings from '../components/Settings';


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
        {!(session === undefined) ? 
          <HStack>
            <AddTask /> 
            
            <Button pr='15px' onClick={onSignOut}>Sign Out</Button>


          </HStack> : 
          <>"No data :("</>
          }
            
          <TaskList />

        {whatAmIShowing()}
      </VStack>
    </Center>
  );
}

export default HomePage;
