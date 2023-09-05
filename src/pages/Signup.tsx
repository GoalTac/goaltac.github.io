import { FormEvent, useState } from 'react';
import { Text, Center, Flex, Image, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, FormControl, InputRightElement, useToast, Spinner, useColorModeValue } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import Canvas from '../components/Canvas';
import { AtSignIcon } from '@chakra-ui/icons';
import logo from './../images/GoalTac_TLogo.png'
import bubble from './../images/bubble.svg'

const CFaLock = chakra(FaLock);

export default function SignUpPage() {

    // Variables ----------------------------------------------------------------------

    // navigates to check your email
    const navigate = useNavigate();

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
    };

    // UseEffect ----------------------------------------------------------------------

    // Functions ----------------------------------------------------------------------
    const handleShowClick = () => setShowPassword(!showPassword);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (email === "" || password === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Seems that you forgot to enter an email or password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        try {
            // sign up
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                toast({
                    title: `${error}`,
                    position: 'bottom',
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                })
                throw error;
            }

            //Insert username and other data into profiles table

            const { error: insertError } = await supabase.from('profiles').update([{ userid: data?.user?.id }]).eq('userid', data?.user?.id);
            if (insertError) {
                throw insertError;
            }

            toast({
                title: "Successfully created account!",
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            //Navigate to check your email page
            navigate('/checkyouremail');


        } catch (err) {
            return toast({
                title: `${err}`,
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
            backgroundImage={bubble}
            alignItems='center'
            color="white">

            <Image src={logo} alt="Logo" width="200px" marginBottom='10px' />
            <Box>
                <form onSubmit={handleSubmit}>
                    <Stack
                        spacing={4}
                        p='1rem'
                        backgroundColor={useColorModeValue('gray.50','blackAlpha.200')}>
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
                                    color={useColorModeValue('black','white')}
                                    onChange={event => setPassword(event.target.value)}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm'bg={password ? 'whiteAlpha.400' : 'whiteAlpha.100'} _hover={{ backgroundColor: 'blackAlpha.100' }} onClick={handleShowClick}>
                                        {showPassword ? 'hide' : 'show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button
                            borderRadius={5}
                            type='submit'
                            variant={useColorModeValue('outline','solid')}
                            width='full'
                            bg={email && password ? 'whiteAlpha.400' : 'whiteAlpha.100'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                            Sign Up
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Box textColor={useColorModeValue('black','white')}>
                <Link to='/welcome'>
                    Back to Welcome
                </Link>
            </Box>
        </Flex>
    );
}
