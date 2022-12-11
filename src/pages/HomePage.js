import { VStack } from '@chakra-ui/react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

function HomePage() {
  return (
    <VStack justifyContent={'center'}>
      <AddTask />
      <TaskList />
    </VStack>
  );
}

export default HomePage;
