import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import BetaPage from './pages/BetaPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Schedule from './pages/Schedule'

function App() {
  return (
    <VStack p={4} minH="100vh">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beta" element={<BetaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/schedule" element={<Schedule />} />
        

      </Routes>
    </VStack>
  );
}

export default App;
