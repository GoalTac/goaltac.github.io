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
import { useNavigate, Link } from 'react-router-dom';
import { AuthApiError } from '@supabase/supabase-js';

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
    
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      // console.log("Auth.signup returns: ", data, error);
      if (error) throw error; // the word "error" is a variable name, not a code-breaking error

      if (isValidUserName()) {
        //add profile data to the profiles table
      }
      else {
        //Display that an email for authentication has been sent to their email
        return toast({
          title: 'Account being created',
          description:
            "We've sent a verification link to your email from supabase.io.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
    }

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
    let { data, error } = await supabase
      .from('usernames')
      .select()
      .eq('username', userName);
    console.log("userNameQuery returns: ", data)

  
    //Throw a toast if username is too long or too short
    if (userName.length < 8 && userName.length > 20) {
      toast({
        title: 'Authentication Error',
        description: "Username must be between 8 and 20 characters",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return false;
    }

    //Throw a toast if username does not pass char checks
    if (!(/^[A-Za-z0-9]*$/.test(userName))) {
      toast({
        title: 'Authentication Error',
        description: "Usernames can only contain alphanumeric characters",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });  
      return false;
    }

    //Throw a toast if username already exists
    if (data.length > 0) {
      toast({
        title: 'Authentication Error',
        description: "This username is already taken",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
