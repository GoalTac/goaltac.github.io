import { Stack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import BetaPage from './pages/BetaPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Schedule from './pages/Schedule';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import NavBar from './components/HomePages/NavBar';
import './App.css';
function App() {
  return (
    <Stack>
      <NavBar />
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
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Stack>
  );
}

export default App;
