import React, { useEffect, useState } from 'react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import BetaPage from './pages/BetaPage';
import HelpPage from './pages/HelpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MarketPage from './pages/MarketPage';
import Profile from './pages/Profile';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Root from './pages/Root';
import Schedule from './pages/Schedule';
import SettingsPage from './pages/SettingsPage';
import SignUpPage from './pages/SignUpPage';
import SocialPage from './pages/SocialPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import supabase from './supabase';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('Top of use effect');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Specific getSession call');
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, newSession) => {
      console.log('Event change detected:' + _event);
      console.log(newSession);
      const { data, error } = await supabase.auth.getSession();
      // Changing tabs will fire a SIGNED_IN event. We only want to update the session
      // when a user changes from being signed out to signed in. The condition below
      // checks for that scenario
      console.log(data);
      if (_event === 'SIGNED_IN' && !data && newSession) {
        console.log('Setting le new session');
        setSession(newSession);
      } else if (_event === 'SIGNED_OUT') {
        console.log('Session signed out');
        setSession(null);
      }
    });
  }, []);

  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root session={session} />}>
        <Route index element={<HomePage session={session} />} />
        <Route path='schedule' element={<Schedule session={session} />} />
        <Route path='social' element={<SocialPage />} />
        <Route path='market' element={<MarketPage />} />
        <Route path='beta' element={<BetaPage />} />
        <Route path='profiles'>
          <Route path=':username' element={<Profile />} />
        </Route>
        <Route path='settings' element={<SettingsPage session={session} />} />
        <Route path='help' element={<HelpPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='resetpassword' element={<ResetPasswordPage />} />
        <Route path='updatepassword' element={<UpdatePasswordPage />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
