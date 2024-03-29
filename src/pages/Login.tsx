import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Box, Button, Center, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, chakra, useToast, Image, useColorModeValue, Spinner, } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Canvas from '../components/Canvas';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import logo from './../images/GoalTac_TLogo.png'
import background from './../images/background_blur.svg'
import bubble from './../images/bubble.svg'


export default function Login() {

    // Variables ----------------------------------------------------------------------
    // navigates to calendar page if authenticated
    const navigate = useNavigate();

    //For Supabase
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [googleLoading, setGoogleLoading] = useState<Boolean>(false)

    // Showing Password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    //ChakraUI
    const toast = useToast()


    // useEffect ----------------------------------------------------------------------

    // Functions ----------------------------------------------------------------------

    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })

        if (error) {
            toast({
                title: error.message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        } else {
            navigate('/home')
        }
    }

    const handleSubmit = async function (event: React.SyntheticEvent) {
        event.preventDefault();
        toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)
        if (email === "" || password === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Seems that you forgot to enter your email or password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }
        try {
            const { data } = await supabase.auth.signInWithPassword({
                email, password
            })
            
            if (data.session) {
                // it worked
                navigate('/home')

            } else {
                toast({
                    title: "Please check your information or sign up!",
                    position: 'bottom',
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                })
            }
        } catch (err) {
            toast({
                title: (err as Error).message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        }
    }

    // const ForgotPassword = async function () {
    //     toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)
    //     if (email === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
    //         toast({
    //             title: "Please enter your email to reset your password!",
    //             position: 'bottom',
    //             status: 'error',
    //             duration: 5000,
    //             isClosable: false,
    //         })
    //         return
    //     }

    //     const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //         redirectTo: '/updatepass',
    //     });

    //     if (error) {
    //         toast({
    //             title: error.message,
    //             position: 'bottom',
    //             status: 'error',
    //             duration: 3000,
    //             isClosable: false,
    //         })
    //     }

    //     toast({
    //         title: "Password reset email sent!",
    //         position: 'bottom',
    //         status: 'success',
    //         duration: 5000,
    //         isClosable: false,
    //     })


    // }

    return (

        <Flex
            flexDirection='column'
            width='100wh'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            color="white"
            backgroundImage={bubble}
            backgroundSize='cover'>
            <Box>
                <Stack
                    flexDir='column'
                    mb='2'
                    justifyContent='center'
                    alignItems='center'>
                    <Image src={logo} alt="Logo" width="200px" />
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Stack backgroundColor={useColorModeValue('gray.50','blackAlpha.200')}
                                spacing={4}
                                p='1rem'>
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
                                            textColor={useColorModeValue('black','white')}
                                            onChange={event => setEmail(event.target.value)}
                                            _autofill={{ backgroundColor: 'transparent' }}
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
                                            color={useColorModeValue('black','white')}
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleShowClick} bg={password ? 'whiteAlpha.400' : 'whiteAlpha.100'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                                                {showPassword ? 'hide' : 'show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText textAlign='right'>
                                        <Link to='/resetpassword'>
                                            Forgot password?
                                        </Link>
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    borderRadius={5}
                                    type='submit'
                                    variant={useColorModeValue('outline','solid')}
                                    width='full' _hover={{ backgroundColor: 'blackAlpha.100' }}>
                                    Login
                                </Button>
                                <Button w={'full'}
                                    borderRadius={5}
                                    variant={useColorModeValue('outline','solid')}
                                    type='submit' _hover={{ backgroundColor: 'blackAlpha.100' }}
                                    leftIcon={googleLoading ? <></> : <FcGoogle/>}
                                    onClick={()=>{
                                        setGoogleLoading(true)
                                        supabase.auth.signInWithOAuth({
                                            provider: 'google', options: { redirectTo: 'https://goaltac.net/home' }
                                        })
                                    }}>
                                        {googleLoading ? <Spinner/> : 'Sign in with Google'}
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Box>
            <Box textColor={useColorModeValue('black','white')}>
                New Here?{' '}
                <Link to='/signup'>
                    Sign Up
                </Link>
            </Box>
        </Flex>
    );
}
