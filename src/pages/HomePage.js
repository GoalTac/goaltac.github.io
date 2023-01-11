import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';


function HomePage() {
  //React Router DOM
  const navigate = useNavigate();

  //Supabase
  const [session, setSession] = useState();

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
          
          <AddTask />
          
          : //Other case starts here

          <>"No data :("</>

        }
            
          <TaskList />

        {whatAmIShowing()}
      </VStack>
    </Center>
  );
}

export default HomePage;
