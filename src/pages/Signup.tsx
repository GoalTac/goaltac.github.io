import { FormEvent, MouseEventHandler, useRef, useState } from 'react';
import { Text, Center, Link, Flex, Image, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, FormControl, InputRightElement, useToast, Spinner, useColorModeValue, Checkbox, LinkBox, Heading, Card, useColorMode, Collapse, Slide, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, useSteps, Stepper, Divider, FormHelperText, FormLabel, Avatar, IconButton, Textarea, Tag, TagLabel, TagCloseButton, CheckboxGroup, Badge } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';
import { TbUserCheck, TbUserCircle, TbUserExclamation, TbUserPlus } from 'react-icons/tb';

import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Canvas from '../components/Canvas';
import { ArrowRightIcon, AtSignIcon, CheckIcon, MoonIcon, SunIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import logo from './../images/logo.png'
import bubble from './../images/bubble.svg'
import { useSession } from '../hooks/SessionProvider';
import { RiShieldCheckFill, RiShieldUserFill, RiShieldUserLine, RiUserLocationLine } from 'react-icons/ri';

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
    const [agreementStatus, setAgreementStatus] = useState(false)
    const [signupSuccess, setSignupSuccess] = useState(false)
    const { toggleColorMode, colorMode } = useColorMode();
    const [userName, setUserName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [biography, setBiography] = useState('');
    const [interests, setInterests] = useState<any>([]);

    const userID = useRef(null)

    const [isLoading, setIsLoading] = useState(false); //for login loading
    const loading = () => {
        setIsLoading(true);
    };
    //To display in the stepper
    const steps = [
        { title: 'First', description: 'Email signup' },
        { title: 'Second', description: 'Profile info' },
      ]
      const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })
    

    // UseEffect ----------------------------------------------------------------------

    // Functions ----------------------------------------------------------------------
    const handleShowClick = () => setShowPassword(!showPassword);

    const handleProfileSubmit = () => {        
        async function profileUpdate() {
            //need to create a row level security for this
            const updateInfo = {
                name: displayName, 
                username: userName,
                biography: biography
            };
            const { error } = await supabase
                .from('profiles')
                .update(updateInfo)
                .eq('userid', userID.current)
            if (error) {
            toast({
                title: `There was an error with the info provided!`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            } else {
                //TODO - They shouldn't be directed to dashboard
                //They should be sent to a 'waiting for verificaiton' page
                navigate('/home')
            }
        }
        profileUpdate()
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (email === "" || password === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Seems that you forgot to enter an email or password!",
                position: 'bottom',
                status: 'error',
                duration: 4000,
                isClosable: false,
            })
            return false
        }
        if (!agreementStatus) {
            toast({
                title: "Please accept the terms of use!",
                position: 'bottom',
                status: 'error',
                duration: 4000,
                isClosable: false,
            })
            return false
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
        if (agreementStatus) {
            addAccount().then(async(data: any)=>{
            if (!data) {
                return false
            }
            const email = data?.user?.email
            const isSuccess = await addEmail(email)
            if (isSuccess) {
                //Navigate to check your email page
                userID.current = data?.user?.id
                setSignupSuccess(true)
                setActiveStep(activeStep+1)
                /** currently disabled verificaiton
                toast({
                    title: "Account awaiting verification!",
                    description: `Please check your email at ${email}`,
                    position: 'bottom',
                    status: 'success',
                    duration: 100000,
                    isClosable: true,
                })
                 */
                
            }
            })
        }
        
        
        
            
    };

    const StepsDisplay = () => {
        return (
            <Stepper size='lg' gap='50px' textColor={useColorModeValue('black','white')} colorScheme='blue' index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                <StepIndicator>
                    <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}/>
                </StepIndicator>
        
                <Box flexShrink='0'>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                </Box>
        
                <StepSeparator />
                </Step>
            ))}
            </Stepper>
        )
          
    }

    return (
        <Flex position='relative'
            flexDirection='column'
            minHeight='100vh'
            rowGap='10px'
            justifyContent='center'
            backgroundImage={bubble}
            alignItems='center'
            color="white">
        <Stack flexDirection={['column','row']} padding='10px'>
        <Card padding='20px' alignItems='center' justifyContent='center'>
                <Image src={logo} alt="Logo" width="80px" />

                <Heading size='md' fontWeight='500'>Create an Account</Heading>
                <Heading size='xs' fontWeight='300'>Already have an account? <Link href='/login'>Log in</Link></Heading>
            
            <Box marginTop='20px'>
                <form onSubmit={handleSubmit}>
                    <Stack
                        spacing={4}
                        p='1rem'
                        backgroundColor={useColorModeValue('gray.50','blackAlpha.200')}>
                        <FormControl isDisabled={signupSuccess} isRequired>
                            <InputGroup>
                                <InputRightElement children={<FormLabel/>} />

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
                        <FormControl isRequired isDisabled={signupSuccess}>
                            <InputGroup >
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
                                    onChange={event => setPassword(event.currentTarget.value)}
                                />
                                <InputRightElement paddingRight='30px'>
                                    <IconButton icon={showPassword ? <ViewIcon/> : <ViewOffIcon/>} h='1.75rem' size='sm' variant='unstyled' _hover={{ backgroundColor: 'blackAlpha.100' }} onClick={handleShowClick} aria-label={'password show'}/>

                                    <FormLabel/>

                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl maxWidth='300px' isDisabled={signupSuccess}>
                            <Checkbox type='checkbox' onChange={(e)=>{
                                    setAgreementStatus(e.target.checked)
                                }}>
                                <Text fontSize='12px'>
                                    Please accept the <Link href='/agreements'>Terms of service</Link> and <Link href='/agreements'>Privacy policy</Link>
                                </Text>
                            </Checkbox>
                        </FormControl>

                        <Button isDisabled={signupSuccess}
                            borderRadius={5}
                            type='submit'
                            variant={useColorModeValue('outline','solid')}
                            width='full'
                            colorScheme={email && password && agreementStatus ? 'blue' : 'gray'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                            Sign Up
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Box textColor={useColorModeValue('black','white')}>
                <Link href='/welcome'>
                    Back to Welcome
                </Link>
                <Button onClick={toggleColorMode} right='0' position='absolute' variant='unstyled'>
                    {useColorModeValue(<SunIcon />, <MoonIcon />)}
                </Button>
            </Box>
         </Card> 
         {signupSuccess && <Divider alignSelf='center' width='40px'/>}
         
         <Card padding={signupSuccess ? '20px' : '0px'}>
         <Collapse in={signupSuccess} transition={{exit: {delay: 0.5}, enter: {duration: 1.5}}}>
         <Flex flexDirection='column' rowGap='10px' alignItems='center'>
            <Button marginBottom='10px' borderRadius='full' width='80px' height='80px'>
                <Avatar size='lg' src='' icon={<IoMdPersonAdd />}/>
            </Button>
            <Stack padding='1rem' alignItems='center' width='300px' backgroundColor={useColorModeValue('gray.50','blackAlpha.200')}>
                
                <FormControl isRequired>
                    <InputGroup>
                    <InputRightElement children={<FormLabel/>} />
                    <InputLeftElement pointerEvents='none'
                        children={<FaUserAlt color='#CBD5E0'/>}/>
                    <Input focusBorderColor={useColorModeValue('green.500','green.200')} isRequired type='text' placeholder='Username'
                        value={userName}
                        onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^A-z0-9]/g, '').toLowerCase();
                        }}
                        onChange={(e) => setUserName(e.target.value)}/>
                    </InputGroup>
                    
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                    <InputRightElement children={<FormLabel/>} />
                    <InputLeftElement pointerEvents='none'
                        children={<RiShieldUserFill color='#CBD5E0' />}/>
                    <Input focusBorderColor={useColorModeValue('green.500','green.200')} isRequired type='text' placeholder='Displayed Name'
                        value={displayName}
                        onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^A-z0-9_ ]/g, ''); }}
                        onChange={(e) => setDisplayName(e.target.value)}/>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <Textarea focusBorderColor={useColorModeValue('green.500','green.200')} maxLength={200} resize='none' variant='outline' isRequired placeholder='Biography'
                        value={biography}
                        onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^A-z0-9_ ]/g, ''); }}
                        onChange={(e) => setBiography(e.target.value)}/>
                    <Text fontSize='10px' borderRadius='5px' color='gray.300' position='absolute' bottom='0' right='1'>{biography.length}/200</Text>
                </FormControl>
                <Button marginTop='18px' onClick={handleProfileSubmit} isDisabled={displayName && userName ? false : true}
                    rightIcon={<ArrowRightIcon paddingLeft='5px'/>}
                    borderRadius={5} textColor={useColorModeValue('white','black')}
                    type='submit'
                    variant={useColorModeValue('outline','solid')}
                    width='full'
                    colorScheme={userName && displayName ? 'green' : 'gray'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                    Complete Profile
                </Button>
            </Stack>
            {/** TO BE ADDED FOR INTERESTS
             <FormControl>
                    <Stack maxHeight='100px' overflowY='scroll'>
                    <CheckboxGroup onChange={(e)=>{setInterests(e)}}>
                        <Checkbox value='academics' width='fit-content'>
                            Academics
                        </Checkbox>
                        <Checkbox value='fitness' width='fit-content'>
                            Fitness
                        </Checkbox>
                        <Checkbox value='entrepreneurship' width='fit-content'>
                            Entrepreneurship
                        </Checkbox>
                    </CheckboxGroup>
                    </Stack>
                    
                </FormControl>
             */}
        </Flex>
        </Collapse>
        </Card>

        </Stack>
        <Box padding='20px'>
            <StepsDisplay/>
        </Box>
        
            
        </Flex>
    );
}

export function Verification_Waiting() {
    return <Spinner/>
}
