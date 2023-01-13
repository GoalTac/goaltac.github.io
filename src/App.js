<<<<<<< HEAD
import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import BetaPage from './pages/BetaPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Schedule from './pages/Schedule';
import ResetPasswordPage from './pages/ResetPasswordPage';
=======
import { VStack } from '@chakra-ui/react';                 
import { Routes, Route } from 'react-router-dom';          
import BetaPage from './pages/BetaPage';                   
import HomePage from './pages/HomePage';                   
import LoginPage from './pages/LoginPage';                 
import SignUpPage from './pages/SignUpPage';               
import Schedule from './pages/Schedule';                   
import NavBar from './components/NavBar';                  
import ResetPasswordPage from './pages/ResetPasswordPage'; 
>>>>>>> 22542869f5eb54eda03bb2214a1d300da11e1a9d
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import './App.css'
function App() {                                           
  return (                                                 
    <VStack>                                               
      <Routes>                                             
        {/* Only add routes that would involve a signed in user. */}
<<<<<<< HEAD
        <Route path="/" element={<HomePage />}>
=======
        <Route path="/" element={<NavBar />}>              
          <Route index element={<HomePage />} />           
>>>>>>> 22542869f5eb54eda03bb2214a1d300da11e1a9d
          <Route path="/schedule" element={<Schedule />} />
        </Route>                                           
                                                       
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
