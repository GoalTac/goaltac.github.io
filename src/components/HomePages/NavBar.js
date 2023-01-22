import React from 'react';
import { FaUserFriends, FaStore } from 'react-icons/fa';

import {
  Icon,
  Box,
  Spacer,
  Img,
  Stack,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import Settings from './Settings';
import logo from '../../images/logo.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Nav from '../BetaPages/Nav';
import { useEffect } from 'react';

export default function NavBar() {
  const navigate = useNavigate();
  const locate = useLocation();
  const colorModeV = useColorModeValue('gray.100', 'gray.900');

  const GeneralNavBar = function () {
    return (
      <Box bg={colorModeV} opacity='0.9' px={4} top='0' position='sticky'>
        <Stack direction={'row'} spacing={12} padding={3}>
          <Link as={Link} to='/beta'>
            {/*insert link in the "" */}
            <Img src={logo} alt='logo' width='40px' height='40px' />
          </Link>
          <Link as={Link} to=''>
            <Icon as={FaUserFriends} boxSize={9} />
          </Link>
          <Link as={Link} to=''>
            <Icon as={FaStore} boxSize={9} />
          </Link>
          <Spacer />
          <Settings />
        </Stack>
      </Box>
    );
  };

  const Display = function () {
    // if (!(locate.pathname === '/beta')) return <GeneralNavBar />;
    // return <Nav />

    switch (locate.pathname) {
      case '/beta':
        return <Nav />;

      default:
        return <GeneralNavBar />;
    }
  };

  useEffect(() => {
    console.log(locate);
  }, []);
  return <Display />;
}
