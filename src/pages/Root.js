import { 
  ChakraProvider, 
  ColorModeScript, 
  HStack,
  Flex,
  Box,
  useColorMode,
  Stack,
  Spacer,
  Center
} from '@chakra-ui/react';
import '../App.css';
import theme from '../components/theme';
import { Outlet } from 'react-router';
import { supabaseClient } from '../supabaseClient';
import { SessionProvider } from '../hooks/SessionProvider';
import SideBar from '../components/General/Sidebar';
import { useLocation } from 'react-router-dom';

//TODO When people zoom in far enough create a HEADER to replace the sidebar

//Chooses what to display to each page
const sideBarPages = [
  '/', '/market','/profile',
  '/social','/messages','/help',
  '/settings','/calendar'
]

export default function Root() {
  const { colorMode } = useColorMode();
  const locate = useLocation();

  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SessionProvider supabase={supabaseClient}>
          {sideBarPages.includes(locate.pathname) ? (
            <Box bg={colorMode === 'dark' ? 'grey.100' : 'white'}>
              <Flex>
                <SideBar activeItem={locate.pathname} />
                <Box
                  position='relative'
                  zIndex='100'
                  width='100%'
                  height='100%'
                >
                  <Outlet />
                </Box>
              </Flex>
            </Box>
          ) : (
              <Stack>  
                <Outlet />
              </Stack>
          )}
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
