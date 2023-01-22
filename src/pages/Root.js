import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import '../App.css';
import theme from '../components/theme';
import { Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router';
// TODO: create universalish nav bar

export default function Root() {
  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Stack>
          <NavBar />
          <Outlet />
        </Stack>
      </ChakraProvider>
    </>
  );
}
