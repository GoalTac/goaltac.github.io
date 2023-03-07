import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import '../App.css';
import theme from '../components/theme';
import { Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { supabaseClient } from '../supabaseClient';
import { SessionProvider } from '../hooks/SessionProvider';

export default function Root() {
  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SessionProvider supabase={supabaseClient}>
          <Stack>
            <NavBar />
            <Outlet />
          </Stack>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
