import { FaUserFriends, FaStore } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

import {
  Icon,
  Box,
  Spacer,
  Img,
  Stack,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import Settings from './HomePages/Settings';
import logo from '../images/logo.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSupabaseClient, useSession } from '../hooks/SessionProvider';
import SideBar from './General/Sidebar';

export default function NavBar() {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const locate = useLocation();
  const colorModeV = useColorModeValue('gray.100', 'gray.900');
  /* const [username, setUsername] = useState(null); //this does not seem needed

  useEffect(() => {
    async function getUsername() {
      try {
        const { data, error } = await supabase
          .from('usernames')
          .select('username')
          .eq('userid', session.user.id)
          .limit(1)
          .single();
        console.log(session.user.id);
        console.log(data);
        setUsername(data.username);
      } catch(err) {
        console.log(err)
      }
      
    }

    getUsername();
  }, []); */

  const GeneralNavBar = function () {
    return (
      <Box
        zIndex={999}
        bg={colorModeV}
        opacity='0.9'
        px={4}
        top='0'
        position='sticky'
      >
        <Stack direction={'row'} spacing={12} padding={3}>
          <Tooltip label='Home'>
            <Link as={Link} to=''>
              {/*insert link in the "" */}
              <Img src={logo} alt='logo' width='40px' height='40px' />
            </Link>
          </Tooltip>

          <Tooltip label='Social'>
            <Link as={Link} to='/social'>
              <Icon as={FaUserFriends} boxSize={9} />
            </Link>
          </Tooltip>

          <Tooltip label='Market'>
            <Link as={Link} to='/market'>
              <Icon as={FaStore} boxSize={9} />
            </Link>
          </Tooltip>

          <Spacer />

          <Tooltip label='Messages'>
            <Link as={Link} to='/messages'>
              <Icon as={RiMessage2Fill} boxSize={9} />
            </Link>
          </Tooltip>

          <Link as={Link} to='/profile/Test2333'>
            Profile test
          </Link>
          <Settings session={session} />

          <Link as={Link} to='/calendar'>
            Calendar test
          </Link>
        </Stack>
      </Box>
    );
  };

  const Display = function () {

    const sideBarPages = [
      '/', '/market','/profile',
      '/social','/messages'
    ]
    

    if (sideBarPages.includes(locate.pathname)) {
      return <SideBar />;
    } else {
      return <></>;
    }

    
  };

  useEffect(() => {
    console.log(locate);
  }, []);
  return <Display />;
}
