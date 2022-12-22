import { HStack, VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import BetaPage from './pages/BetaPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Schedule from './pages/Schedule'
import NavBar from './components/NavBar';

function App() {
  return (
    <VStack p={4}>
      <Routes>

        {/* Only add routes that would involve a signed in user. */}
        <Route path="/" element= {<NavBar />}> 
          <Route index element={<HomePage />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>


        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />


        <Route path="/beta" element={<BetaPage />} />

      </Routes>
    </VStack>
  );
}

export default App;
