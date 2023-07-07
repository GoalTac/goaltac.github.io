import Calendar from './pages/Calendar';
import BetaPage from './pages/Beta';
import Feed from './pages/Social';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Communities from './pages/Communities';
import SignUp from './pages/Signup';
import CheckVerification from './pages/CheckVerification';
import CommunityView from './pages/CommunityView';
import PrivatePolicy from './pages/PrivatePolicy';
import Finder from './pages/Finder';
import ProfileView from './pages/ProfileView';

import { Route, Routes } from 'react-router-dom';
import Root from './components/Root';

import Market from './pages/Market';
import { useState } from 'react';


// v1
import Beta1 from './pages1/Beta';
import TestRedirect from './components/TestRedirect';
import CommunityCentral from './pages1/Communities/Dashboard/CommunityCentral';
import InsideView from './pages1/Communities/Community/InsideView';

export default function App() {

  const [betaOne, setBetaOne] = useState(null)

  return (

    <Routes>
      <Route path='/'>
        <Route path='beta2' element={<BetaPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='checkyouremail' element={<CheckVerification />} />
        <Route path='privatepolicy' element={<PrivatePolicy />} />

        {/* TODO: conditional on authentication routing */}
        <Route element={<Root />}>
          <Route path='calendar' element={<Calendar />} />
          <Route path='social' element={<Feed />} />
          <Route path='settings' element={<Settings />} />
          <Route path='market' element={<Market />} />
          <Route path='communities' element={<Communities />} />
          <Route path='/community/:communityName' element={<CommunityView />} />

          <Route path='communities1' element={<CommunityCentral />} />
          <Route path='/community1/:communityName' element={<InsideView />} />
          <Route path='/search/:searchElement' element={<Finder />} />
          <Route path='/profile/:profileName' element={<ProfileView />} />
        </Route>

        <Route path='beta1' element={<Beta1 />} />        



        {/* Redirects */}
        <Route path='' element={<TestRedirect link1='beta1' link2='beta2' />} />
      </Route>
    </Routes>
  );
}
