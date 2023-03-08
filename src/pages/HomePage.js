import { Box, VStack } from '@chakra-ui/react';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';

function HomePage() {
  return (
    <>
      <Box w='100%' h='100%'>
        <VStack p={4}>
          <AddTask />
          <TaskList />
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
