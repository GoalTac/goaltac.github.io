import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Root from './pages/Root';
import SignUpPage from './pages/SignUpPage';
import BetaPage from './pages/BetaPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Schedule from './pages/Schedule';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import './App.css';
import React, { useEffect, useState } from 'react';
import supabase from './supabase';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root session={session} />}>
        <Route path='home' element={<HomePage session={session} />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='beta' element={<BetaPage />} />
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
