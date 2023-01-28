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
  InputRightElement,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import supabase from '../supabase';
import { useNavigate } from 'react-router-dom';
import { AuthApiError } from '@supabase/supabase-js';

import { Link } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function SignUpPage() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  //Check for an existing userName
  //Pass the email and password into Supabase Signup Method
  //-- Display any issues with sign up to the user
  //(Must check that account has been made) Insert username and other data into profiles table
  const handleSubmit = async event => {
    event.preventDefault();
    console.log('submitting!');
    isValidUserName();

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      console.log('Auth.signup returns: ', data, error);

      if (isValidUserName()) {
        //add profile data to the profiles table
      }

      //Display that an email for authentication has been sent to their email

      if (error) throw error;
      return toast({
        title: 'Account being created',
        description:
          "We've sent a verification link to your email from supabase.io.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: 'Authentication Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const isValidSignUp = async event => {
    let { data: emailQuery, error } = await supabase
      .from('users')
      .select()
      .eq('email', email);
    console.log(emailQuery);

    //Display a toast if email already exists
    if (emailQuery != null) {
      console.log('Caught returning user!');
    }
  };

  const isValidUserName = async event => {
    let { data: userNameQuery, error } = await supabase
      .from('profiles')
      .select()
      .eq('username', userName);
    console.log(userNameQuery);

    //Throw a toast if username does not pass char checks
    //Throw a toast if username already exists
    //Throw a toast if username is too long or too short
    if (userNameQuery.length > 0) {
      console.log('Caught returning user!');
      return false;
    }
    return true;
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
          GoalTac Sign Up
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
                  {/* Username */}
                  <Input
                    type='text'
                    id='userName'
                    placeholder='Username'
                    value={userName}
                    onChange={event => setUserName(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  {/* Email */}
                  <Input
                    type='email'
                    id='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    children={<CFaLock color='gray.300' />}
                  />
                  {/* Password */}
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    id='password'
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
              </FormControl>
              <Button
                borderRadius={5}
                type='submit'
                variant='solid'
                width='full'
              >
                Sign Up
              </Button>
              <Center>Or</Center>
              <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign up with Google</Text>
                </Center>
              </Button>
            </Stack>
          </form>
        </Box>
        <Link as={Link} to='/login'>
          Back to Login
        </Link>
      </Stack>
    </Flex>
  );
}
