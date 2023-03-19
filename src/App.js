import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Calendar from './components/schedule/Calendar';
import BetaPage from './pages/BetaPage';
import HelpPage from './pages/HelpPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import MarketPage from './pages/MarketPage';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Root from './pages/Root';
import Schedule from './pages/Schedule';
import SettingsPage from './pages/SettingsPage';
import SignUpPage from './pages/SignUpPage';
import SocialPage from './pages/SocialPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route path='/'>
          <Route index element={<BetaPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='help' element={<HelpPage />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='resetpassword' element={<ResetPasswordPage />} />
          <Route path='profile'>
            <Route path=':username' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute redirectPath={'/signin'} />}>
            <Route path='market' element={<MarketPage />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path='social' element={<SocialPage />} />
            <Route path='settings' element={<SettingsPage />} />
            <Route path='updatepassword' element={<UpdatePasswordPage />} />
            <Route path='messages' element={<Messages />} />
            <Route path='calendar' element={<Calendar />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
