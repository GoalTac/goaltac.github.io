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
import Settings from './HomePages/Settings';
import logo from '../images/logo.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Nav from './BetaPages/Nav';
import { useEffect, useState } from 'react';
import supabase from '../supabase';

export default function NavBar({ session }) {
  const navigate = useNavigate();
  const locate = useLocation();
  const colorModeV = useColorModeValue('gray.100', 'gray.900');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabase
        .from('usernames')
        .select('username')
        .eq('userid', session.user.id)
        .limit(1)
        .single();
      console.log(session.user.id);
      console.log(data);
      setUsername(data.username);
    }

    getUsername();
  }, []);

  const GeneralNavBar = function () {
    return (
      <Box bg={colorModeV} opacity='0.9' px={4} top='0' position='sticky'>
        <Stack direction={'row'} spacing={12} padding={3}>
          <Link as={Link} to=''>
            {/*insert link in the "" */}
            <Img src={logo} alt='logo' width='40px' height='40px' />
          </Link>
          <Link as={Link} to='social'>
            <Icon as={FaUserFriends} boxSize={9} />
          </Link>
          <Link as={Link} to='market'>
            <Icon as={FaStore} boxSize={9} />
          </Link>
          <Link as={Link} to='beta'>
            Beta Page
          </Link>
          <Link as={Link} to={'profiles/' + username}>
            Edit Profile
          </Link>
          <Spacer />
          <Settings session={session} />
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

      case '/updatepassword':
      case '/resetpassword':
      case '/signup':
      case '/login':
        return <></>;

      default:
        return <GeneralNavBar />;
    }
  };

  useEffect(() => {
    console.log(locate);
  }, [locate]);
  return <Display />;
}
