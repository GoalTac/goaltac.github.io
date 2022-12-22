import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Schedule from './pages/Schedule'

function App() {


  return (
    <VStack p={4} minH="100vh">
      <NavBar />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/schedule" element={<Schedule />} />
        

      </Routes>
    </VStack>
  );
}

export default App;
