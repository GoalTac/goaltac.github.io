import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import BetaPage from './pages/BetaPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Schedule from './pages/Schedule';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import './App.css';
function App() {
  return (
    <VStack>
      <Routes>
        {/* Only add routes that would involve a signed in user. */}
        <Route path="/" element={<HomePage />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/schedule" element={<Schedule />} />
        <Route path="/beta" element={<BetaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="/updatepassword" element={<UpdatePasswordPage />} />
      </Routes>
    </VStack>
  );
}

export default App;
