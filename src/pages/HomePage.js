import React, { useState, useEffect } from 'react';
import { Box, VStack, useColorMode } from '@chakra-ui/react';
import AddTask from '../components/HomePages/Tasks/AddTask';
import TaskPage from '../components/HomePages/TaskPage';
import CategoryDisplay from '../components/HomePages/Category/CategoryDisplay';
import AddCategory from '../components/HomePages/Category/AddCategory';
import { useSession } from '../hooks/SessionProvider';

/**
 * 
 * 1. Gather data on the tasks[taskID, title, desc, ...] and categories[category[[taskIDs, title, desc, ...]]]
 * 2. Iterate through categories and use the categoryItem component to create the UI
 */

function HomePage() {
  const { user, session, supabase } = useSession();
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(true);
  

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
          <AddCategory/>
          <CategoryDisplay />
          
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
