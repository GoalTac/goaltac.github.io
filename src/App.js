import { VStack } from '@chakra-ui/react';
import TaskList from './components/TaskList';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <VStack p={4} minH="100vh">
      <NavBar />
      <HomePage />
      <TaskList />
    </VStack>
  );
}

export default App;
