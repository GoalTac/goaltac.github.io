import { useState } from 'react';
import {
  Text,
  Center,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { useSession } from '../hooks/SessionProvider';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user: user, supabase: supabase } = useSession();
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data, err } = await supabase.auth.signInWithPassword({
        // this returns data.session = null if incorrect email or password
        email,
        password,
      });
      if (err) throw err;

      // Check if the login was successful
      if (data.session == null) {
        return toast({
          title: 'Authentication Error',
          description: 'Username or password not accepted. Try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

      toast({
        title: 'Authentication Success',
        description: 'Loading...',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/home', { state: { session: data.session } });
      // Save the authentication token in local storage or a cookie
      // so that it can be used on subsequent requests
    } catch (err) {
      console.log(err);
      return toast({
        title: 'Authentication Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Heading
          fontWeight='extrabold'
          bgGradient='linear(to-l, teal.300, blue.500)'
          bgClip='text'
        >
          GoalTac
        </Heading>
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor={
                colorMode === 'light' ? 'whiteAlpha.900' : 'blackAlpha.300'
              }
              boxShadow='md'
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  {/* Email */}
                  <Input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    _autofill={true}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    <CFaLock color='gray.300' />
                  </InputLeftElement>
                  {/* Password */}
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {/* <ViewIcon color="gray.300" />
                      <ViewOffIcon color="gray.300" /> */}
                      {showPassword ? 'hide' : 'show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign='right'>
                  <Link as={Link} to='/resetpassword'>
                    Forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={5}
                type='submit'
                variant='solid'
                width='full'
              >
                Login
              </Button>
              <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New Here?{' '}
        <Link as={Link} to='/signup'>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
