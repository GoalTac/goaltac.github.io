import React, { useState } from 'react';
import { Box, VStack, useColorMode } from '@chakra-ui/react';
import AddTask from '../components/HomePages/Tasks/AddTask';
import TaskPage from '../components/HomePages/TaskPage';
import DashboardPage from '../components/HomePages/DashboardPage';

function HomePage() {
  const { colorMode } = useColorMode();

  return (
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
        
          
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
