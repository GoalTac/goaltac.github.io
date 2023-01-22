import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import supabase from '../supabase';

const CFaUserAlt = chakra(FaUserAlt);

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data, err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/updatepassword',
      });

      return toast({
        title: 'Reset link sent.',
        description:
          "We've sent a password reset link to your email from supabase.io.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle the error
      console.log('Error is: ', error);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          fontWeight="extrabold"
          bgGradient="linear(to-l, teal.300, blue.500)"
          bgClip="text"
        >
          GoalTac
        </Heading>
        <p>Enter the email address for your GoalTac account, </p>
        <p>and we'll email you a link to reset your password.</p>
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor={
                colorMode === 'light' ? 'whiteAlpha.900' : 'blackAlpha.300'
              }
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={5}
                type="submit"
                variant="solid"
                width="full"
              >
                Reset
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Remember your password? <Link to="/login">Back to Login</Link>
      </Box>
    </Flex>
  );
}
