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
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import supabase from '../supabase';
import { Navigate, useNavigate } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);

export default function ResetPasswordPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');

  const handleSuccess = () => {
    <> 
      <p>Check your email for a password reset link from "supabase"!</p>
    </>
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data, err } = await supabase.auth.resetPasswordForEmail(
        email, { redirectTo: "http://localhost:3000/updatepassword" }
      );
      handleSuccess();

    } catch (error) {
      // Handle the error
      console.log(error);
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
              backgroundColor="whiteAlpha.900"
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
        Remember your password? <Link href="login">Back to Login</Link>
      </Box>
    </Flex>
  );
}
