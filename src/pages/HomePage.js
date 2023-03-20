import { Box, VStack } from '@chakra-ui/react';
import AddTask from '../components/HomePages/Tasks/AddTask';
import TaskList from '../components/HomePages/TaskPage';

function HomePage() {
  return (
    <>
      <Box w='100%' h='100%'>

        {/* 

        Boolean logic to decide what page to display
        - Dashboard
          - Categories
            - Milestones

        - TaskPage(task)
          - Milestones
            - Tasks

        Create New Task Modal Overlay

        */}

        <VStack p={4}>
          <AddTask />
          <TaskList />
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
