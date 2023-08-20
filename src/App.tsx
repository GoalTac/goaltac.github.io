import Dashboard from './pages/TaskDashboard';
import Landing from './pages/Landing';
import Feed from './pages/Social';
import Login from './pages/Login';
import Settings from './pages/Settings';
import SignUp from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import CheckVerification from './pages/CheckVerification';
import CheckPassword from './pages/CheckPassword';
import PrivatePolicy from './pages/PrivatePolicy';
import Finder from './pages/Finder';
import ProfileView from './pages/ProfileView';

import { Route, Routes, Navigate } from 'react-router-dom';
import Root from './components/Root';

import Market from './pages/Market';
import { useState } from 'react';
import { useSession, useSupabaseClient } from '../src/hooks/SessionProvider';


// v1
import CommunityCentral from './components/Communities/Dashboard/CommunityCentral';
import InsideView from './components/Communities/Community/InsideView';
import { Tutorial } from './pages/Tutorial';

export default function App() {
  
  function ProtectedRoute({ children, redirectPath }:any) {
    const { user: user, profile: profile } = useSession();

    return user ? <Root /> : <Navigate to={redirectPath} replace={true} />;
  }

  //NOTE FOR LATER
  //Need to direct user to tutorial react element when user is set, but profile is not
  //Direct user to root if user is set and profile is set
  //Direct user to login if user is not set and profile is not set
  
  return (

    <Routes>
      <Route path='/'>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='resetpassword' element={<ResetPassword />} />
        <Route path='updatepass' element={<CheckPassword />} />
        <Route path='checkyouremail' element={<CheckVerification />} />
        <Route path='privatepolicy' element={<PrivatePolicy />} />   
        <Route path='welcome' element={<Landing />} />

        {/* TODO: conditional on authentication routing  */}
        <Route element={<Root />}>
          <Route element={<ProtectedRoute redirectPath={'/login'} />}>
            <Route path='' element={<Dashboard />} />
            
            {/* Tutorial is here temporarily */}
            <Route path='tutorial' element={<Tutorial />} />

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='social' element={<Feed />} />
            <Route path='settings' element={<Settings />} />
            <Route path='market' element={<Market />} />
            <Route path='community'>
              <Route index element={<CommunityCentral />} />
              <Route path=':communityName' element={<InsideView />} />
            </Route>
            
            <Route path='/search/:searchElement' element={<Finder />} />
            <Route path='/profile/:profileName' element={<ProfileView />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
