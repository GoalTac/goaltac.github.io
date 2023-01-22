import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import {
  Button,
  Box,
  Spacer,
  Link,
  Img,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import logo from '../../images/logo.png';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Nav = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      opacity='0.9'
      px={4}
      top='0'
      position='sticky'
    >
      <Stack direction={'row'} spacing={7} padding={3}>
        <Img src={logo} alt='logo' width='40px' height='40px' />
        <Spacer />
        <Link isExternal href='https://discord.gg/EzFPQDAKGf'>
          <IconButton
            variant='outlined'
            icon={<FaDiscord size='sm' color='rgba(114,137,218)' />}
          />
        </Link>

        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Box>
  );
};

export default Nav;
