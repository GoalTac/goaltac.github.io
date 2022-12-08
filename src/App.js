import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

function App() {
  return (
    <VStack p={4} minH="100vh">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </VStack>
  );
}

export default App;
