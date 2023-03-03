import { FaDiscord } from 'react-icons/fa';
import {
  Button,
  Box,
  Spacer,
  Img,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spinner,
  Component,
} from '@chakra-ui/react';
import logo from '../../images/logo.png';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false); //for login loading

  const loading = () => {
    setIsLoading(true);
    console.log(isLoading);
  };

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
        <Link href='https://discord.gg/EzFPQDAKGf'>
          <IconButton
            variant='unstyled'
            icon={<FaDiscord size='100%' color='rgba(114,137,218)' />}
          />
        </Link>

        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Button
          variant='solid'
          bgGradient='linear(to-l, teal.300, blue.500)'
          onClick={loading}
        >
          <Link as={Link} to='/login'>
            {isLoading == true ? <Spinner /> : 'Login'}
          </Link>
        </Button>
      </Stack>
    </Box>
  );
};

export default Nav;
