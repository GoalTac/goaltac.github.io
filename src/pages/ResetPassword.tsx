import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Box, Button, Center, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, chakra, useToast, Image, } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Canvas from '../components/Beta/Canvas';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);



export default function ResetPassword() {
    console.log("We are in ResetPassword.tsx")
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
    const [email, setEmail] = useState("");
    // // const { client } = useSupabase();
    
    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
    }
    //     try {
    //     await supabase.auth.resetPasswordForEmail( email );
    //     alert("We have sent you an email with instructions to reset your password.");
    //     } catch (error) {
    //     alert(error);
    //     }
    // };

    const ForgotPassword = async function () {
        console.log("We are in ForgotPassword")
        toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)
        if (email === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Please enter your email to reset your password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: '/updatepass',
        });

        if (error) {
            console.log("Error: ", error)
            toast({
                title: error.message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
            // return
        }

        toast({
            title: "Password reset email sent!",
            position: 'bottom',
            status: 'success',
            duration: 5000,
            isClosable: false,
        })
        // return


    }

    
    return (
        <Flex
            flexDirection='column'
            width='100wh'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            color="white"
        >
            <Canvas style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1, }} />
            <Box>
                <Stack
                    flexDir='column'
                    mb='2'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Image src="logo.png" alt="Logo" boxSize="80px" />
        <Box>
            <FormControl onSubmit={onSubmit}>
                <Input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Button 
                type="submit"
                onClick={ForgotPassword}
                >
                    Reset Password
                </Button>
            </FormControl>
        </Box>
                </Stack>
            </Box>
        </Flex>
    );
};

   
