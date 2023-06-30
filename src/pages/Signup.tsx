import { FormEvent, useState } from 'react';
import { Text, Center, Flex, Image, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, FormControl, InputRightElement, useColorMode, useToast, Spinner } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import Canvas from '../components/Beta/Canvas';
import { AtSignIcon } from '@chakra-ui/icons';

const CFaLock = chakra(FaLock);

export default function SignUpPage() {

    // navigates to check your email
    const navigate = useNavigate();

    const { colorMode } = useColorMode();

    // login stuff
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    //Check for an existing userName
    //Pass the email and password into Supabase Signup Method
    //-- Display any issues with sign up to the user
    //(Must check that account has been made) Insert username and other data into profiles table
    // Supabase
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false); //for login loading
    const loading = () => {
        setIsLoading(true);
        console.log(isLoading);
    };

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('submitting signup!');

        try {
            // sign up
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                throw error;
            }

            //Insert username and other data into profiles table
            const { error: insertError } = await supabase.from('profiles').update([{ userid: data?.user?.id }]);
            if (insertError) {
                throw insertError;
            }

            //Navigate to check your email page
            navigate('/checkyouremail');


        } catch (err) {
            return toast({
                title: 'You may already have an account',
                description: "Check your email for verification (might be under spam)",//(err as Error).message,
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
            color="white"
        >
            <Stack
                flexDir='column'
                mb='2'
                justifyContent='center'
                alignItems='center'
            >

                <Canvas style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                <Image src="logo.png" alt="Logo" boxSize="80px" />

                <Box>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p='1rem'
                            backgroundColor={'blackAlpha.400'}
                            boxShadow='md'
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<AtSignIcon color='gray.300' />}
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
                                        <Button h='1.75rem' size='sm' bg={"whiteAlpha.300"} _hover={{ backgroundColor: 'whiteAlpha.400' }} onClick={handleShowClick}>
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
                                bg={"whiteAlpha.300"} _hover={{ backgroundColor: 'whiteAlpha.400' }}
                            >
                                Sign Up
                            </Button>
                            <Center>Or</Center>
                            <Button
                                w={'full'}
                                maxW={'md'}
                                variant={'solid'}
                                leftIcon={<FcGoogle />}
                                bg={"blackAlpha.600"} _hover={{ bg: "black" }}
                            >
                                <Center>
                                    <Text>Sign up with Google</Text>
                                </Center>
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Link onClick={loading} to='/login'>
                    {isLoading == true ? <Spinner /> : 'Back to Login'}
                </Link>
            </Stack>
        </Flex>
    );
}
