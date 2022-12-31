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
  FormControl,
  InputRightElement,
  useColorMode
} from '@chakra-ui/react';
import { FaLock, ViewIcon, ViewOffIcon } from 'react-icons/fa';
import supabase from '../supabase';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const CFaLock = chakra(FaLock);

export default function UpdatePasswordPage() {

    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const {state} = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setPassword] = useState('');
    const [session, setSession] = useState();
    const [user, setUser] = useState(undefined);
  
    const handleShowClick = () => setShowPassword(!showPassword);
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const { data, err } = await supabase.auth.updateUser({
            password: newPassword
        });
            console.log(data);
            console.log('After calling supabase.updateUser');

            navigate('/login', { state: {session: data.session}})
            // Save the authentication token in local storage or a cookie
            // so that it can be used on subsequent requests
        } catch (error) {
            // Handle the error
            console.log("The try-catch has an error: ");
            console.log(error);
        }
        console.log("Did it succeed?");
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
                GoalTac Reset Password
            </Heading>
            <Box>
                <form onSubmit={handleSubmit}>
                <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor={colorMode === 'light' ? 'whiteAlpha.900' : 'blackAlpha.300'}
                    boxShadow="md"
                >
                    <FormControl>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                        />
                        <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={event => setPassword(event.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                            {/* <ViewIcon color="gray.300" />
                            <ViewOffIcon color="gray.300" /> */}
                            {showPassword ? 'hide' : 'show'}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                    </FormControl>
                    <Button
                    borderRadius={5}
                    type="submit"
                    variant="solid"
                    width="full"
                    >
                    Update
                    </Button>
                </Stack>
                </form>
            </Box>
            </Stack>
        </Flex>
    );
}
