import { Heading, VStack } from '@chakra-ui/react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import NavBar from './components/NavBar';

function App() {
  return (
    <VStack p={4} minH="100vh">
      <NavBar />
      <AddTask />
      <TaskList />
    </VStack>
  );
}

export default App;
