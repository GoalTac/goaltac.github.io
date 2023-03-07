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
import { useSupabaseClient } from '../hooks/SessionProvider';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function SignInPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const supabase = useSupabaseClient();
  const { colorMode } = useColorMode();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const onChangeHandler = e =>
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data, err } = await supabase.auth.signInWithPassword(formData);
      if (err) throw err;
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
        duration: 10000,
        isClosable: true,
      });
      navigate('/');
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
                    name='email'
                    placeholder='Email Address'
                    onChange={onChangeHandler}
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
                    name='password'
                    placeholder='Password'
                    onChange={onChangeHandler}
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
                Sign In
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
