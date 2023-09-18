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

    const handleSubmit = (event: { preventDefault: () => void; }) => {
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
        /**
         * Checks if the input email is both in the email list, and if it is - also signed in already
         * @param email
         * @returns 
         */
        async function checkDuplicate(email: any) {
                const { data: data, error: error } = await supabase
                    .from('Email_Updates')
                    .select()
                    .eq('email', email).single();
                if (error) {
                    return false
                } else {
                    if (data) {
                        const signedIn : any = data?.['signed_in']
                        if (signedIn) {
                            return true //the user has both added their email and registered their account already
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
                
            }
        
        /**
         * Officially signs the user up if the email isn't duplicated
         * @returns account data object
         */
        async function addAccount() {
            //Check for duplicate email upon attempt sign up
            //if true, that means user's email has been registered and added to the email list
            const isDuplicate = await checkDuplicate(email)
            if (isDuplicate) {
                toast({
                    title: "This email has already been signed up",
                    position: 'bottom',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
                return false
            }

            //After checking for duplicate email, call supabase to authenticate new user
            //User could have email already added, or not yet
            const { data, error } = await supabase.auth
                .signUp({ email: email, password: password });

            console.log(data)

            if (error) {
                toast({
                    title: `${error}`,
                    position: 'bottom',
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                })
                throw Error(error.message);
            }
            return data
        }

        /**
         * After authenticating the user, add them to the email listing
         * @param userData
         */
        async function addEmail(value: string) {
            const { data: data, error } = await supabase
                .from('Email_Updates')
                .upsert({email: value, signed_in: true }, { onConflict: 'email', ignoreDuplicates: false }) //using upsert here because user may have added email to email list
                .select()
            if (error) {
                if (error.code == '23505') {
                    toast({
                        title: "This email has already been signed up",
                        position: 'bottom',
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                }
                return false
            } else {
                return true
            }

        }
        addAccount().then(async(data: any)=>{
            if (!data) {
                return false
            }
            const email = data?.user?.email
            const isSuccess = await addEmail(email)
            if (isSuccess) {
                //Navigate to check your email page
                toast({
                    title: "Account awaiting verification!",
                    description: `Please check your email at ${email}`,
                    position: 'bottom',
                    status: 'success',
                    duration: 100000,
                    isClosable: true,
                })
            }
        })
        
        
            
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
                                    textColor={useColorModeValue('black','white')}
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
