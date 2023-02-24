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
  const [profile, setProfile] = useState({
    name: '',
    biography: '',
    userid: null,
  });
  const [username, setUsername] = useState({
    username: '',
    userid: null,
  })

  const handleShowClick = () => setShowPassword(!showPassword);

  //Check for an existing userName
  //Pass the email and password into Supabase Signup Method
  //-- Display any issues with sign up to the user
  //(Must check that account has been made) Insert username and other data into profiles table
  const handleSubmit = async event => {
    event.preventDefault();
    console.log('submitting signup!');

    try {
      if (isValidUserName()) {
        const { data, err } = await supabase.auth.signUp({ email, password });
        if (err) throw err; // the word "err" is a variable name, not a code-breaking error

        //add profile data to the profiles table (userid, name, biography)
        //what does data return if user successfully signs in?
        if (!data.isEmpty()) {
          const { data: { user } } = await supabase.auth.getUser();
          setProfile({name: userName, biography:'', userid: data.user.id})
          setUsername({username: userName, userid: data.user.id})
          
          const { err2 } = await supabase
            .from('profiles') //Table name
            .insert(profile); 
          const { err3 } = await supabase
          .from('usernames') //Table name
          .insert(username); 
        }
        



        //Display that an email for authentication has been sent to their email
        return toast({
          title: 'Account being created',
          description:
            "We've sent a verification link to your email from supabase.io.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.log(
          'signup failed isValidUserName(). Did it run Supabase.auth signup() anyway?'
        );
      }
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


  const isValidUserName = async event => {
    //Throw a toast if username is too long or too short
    if (userName.length < 8 && userName.length > 20) {
      toast({
        title: 'Authentication Error',
        description: 'Username must be between 8 and 20 characters',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    //Throw a toast if username does not pass char checks
    if (!/^[A-Za-z0-9]*$/.test(userName)) {
      toast({
        title: 'Authentication Error',
        description: 'Usernames can only contain alphanumeric characters',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    //Throw a toast if username already exists
    let { data, err } = await supabase
      .from('usernames')
      .select()
      .eq('username', userName);
    console.log('userNameQuery returns: ', data);
  
    if (data.length > 0) {
      toast({
        title: 'Authentication Error',
        description: 'This username is already taken',
        status: 'error',
        duration: 5000,
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
