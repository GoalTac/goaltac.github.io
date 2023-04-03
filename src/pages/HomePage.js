import React, { useState, useEffect } from 'react';
import { Box, VStack, useColorMode } from '@chakra-ui/react';
import AddTask from '../components/HomePages/Tasks/AddTask';
import TaskPage from '../components/HomePages/TaskPage';
import DashboardPage from '../components/HomePages/DashboardPage';
import AddCategory from '../components/HomePages/AddCategory';
import { useSession } from '../hooks/SessionProvider';

function HomePage() {
  const { user, session, supabase } = useSession();
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(true);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    supabase.from('todos').select('*').then(
      (response) => {
        let { data: tasks, error } = response
        setTasks(tasks)
        setLoading(false)
      })
  }

  return  (
    <>
      <Box w='100%' h='100%' backgroundColor={colorMode === 'dark' ? 'grey.800' : 'white'}>

        {/* 

        Boolean logic to decide what page to display
        - Dashboard
          - Categories
            - Milestones

        - TaskPage(task)
          - Milestones
            - Tasks

        Create New Task Modal Overlay
<DashboardPage />
        */}

        

        <VStack p={4} >
          <AddTask />
          <TaskPage />
          {isLoading == false && <AddCategory initialTasks={tasks}/>}

          
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
