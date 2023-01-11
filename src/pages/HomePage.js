import {  
  Center,
  VStack 
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';
import ClearTasks from '../components/Tasks/ClearTasks';


function HomePage() {          
  //React Router DOM           
  const navigate = useNavigate();
                               
  //Supabase                   
  const [session, setSession] = useState();
                               
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
    getSession(); // eslint-disable-next-line
  }, []);                   
  return (            
    <>
      {!(session === undefined) ? 
        <Center w="100vw">
          
          <VStack>
            <AddTask />

            <VStack  overflow='hidden' overflowY='scroll' maxH='75vh'>
              <TaskList />
            </VStack>
            
            <ClearTasks />
          </VStack>
        </Center>
        : //Other case starts here

        <>"No data :("</>

      }</>
  );
}

export default HomePage;
