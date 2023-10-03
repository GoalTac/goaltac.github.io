import { useRef, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { Box, Button, Center, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, chakra, useToast, Image, useColorModeValue, } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Canvas from '../components/Canvas';
import { AtSignIcon } from '@chakra-ui/icons';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import bubble from './../images/bubble.svg'
import logo from './../images/GoalTac_TLogo.png'

export default function ResetPassword() {
    // // Variables ----------------------------------------------------------------------
    // // navigates to calendar page if authenticated
    // const navigate = useNavigate();

    // //For Supabase
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // // Showing Password
    // const [showPassword, setShowPassword] = useState(false);
    // const handleShowClick = () => setShowPassword(!showPassword);

    // //ChakraUI
    // const toast = useToast()
    // return (
    //     <Text>Reset Password</Text>
    // )
    const toast = useToast()
    const email = useRef("");
    // // const { client } = useSupabase();
    
    //     try {
    //     await supabase.auth.resetPasswordForEmail( email );
    //     alert("We have sent you an email with instructions to reset your password.");
    //     } catch (error) {
    //     alert(error);
    //     }
    // };
    const navigate = useNavigate()
    const ForgotPassword = async(event: React.SyntheticEvent) => {
        event.preventDefault();

        toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)
        if (email.current === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Please enter your email to reset your password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }
        const { error } = await supabase.auth.resetPasswordForEmail(email.current, {
            redirectTo: 'http://localhost:3000/updatepass',
        });

        if (error) {
            toast({
                title: error.message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
            // return
        } else {
            
            navigate('/login')
            toast({
                title: "Password reset email sent!",
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: false,
            })
        }

        
        // return


    }

    
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
                <form onSubmit={ForgotPassword}>
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
                                    textColor={useColorModeValue('black','white')}
                                    onChange={event => email.current = event.target.value}
                                />
                            </InputGroup>
                        </FormControl>
                        <Button onClick={(e)=>ForgotPassword(e)}
                            borderRadius={5}
                            type='submit'
                            variant={useColorModeValue('outline','solid')}
                            width='full'
                            bg={email ? 'whiteAlpha.400' : 'whiteAlpha.100'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                            Reset Password
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
};

   
