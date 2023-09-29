import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, useColorMode, Spacer, Flex, Stack, VStack, HStack, Text, Button, Image, Avatar, Heading, useColorModeValue, Badge, IconButton, Divider, LinkBox, Link, FormControl, Input, InputGroup, InputLeftElement, InputRightElement, useToast, ButtonGroup, Card, Grid, GridItem, Textarea, Editable, EditablePreview, EditableTextarea, EditableInput, SimpleGrid, AvatarGroup, Tag, Tooltip } from "@chakra-ui/react";
import {
    FaDiscord,
    FaFacebookSquare,
    FaInstagram,
    FaLinkedin,
    FaLock,
} from 'react-icons/fa';
import { AddIcon, AtSignIcon, CheckIcon, EmailIcon, InfoIcon, InfoOutlineIcon, MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons';
import logo_name from './../images/GoalTac_Logo.png'
import logo from './../images/logo.png'
import logo_stacked from './../images/GoalTac_TLogo.png'
import ProfileBackground from '../images/ProfileBackground.svg'
import GoalTac_T_Logo from './../images/GoalTac_TLogo.png'

import background_blur from './../images/background_noise.svg'
import collaboration from './../images/collaboration.png'
import one from './../images/ffflux.svg'
import two from './../images/sssurf.svg'
import bubble from './../images/bubble.svg'
import uconn_dark_logo from './../images/CCEI-stacked_white.png'
import uconn_light_logo from './../images/CCEI-stacked_blue.png'
import community_header from './../images/Community_Header.png'
import friend from './../images/Friends.png'
import feed from './../images/Social_Post.png'
import calendar from './../images/Calendar.png'
import calendar_dark from './../images/Calendar_Dark.png'

import task_drawer from './../images/Task_Drawer.png'
import task_drawer_dark from './../images/Task_Drawer_Dark.png'

import SignUpPage from './../pages/Signup'
import { useNavigate } from 'react-router-dom';
import { ReactElement, useRef, useState } from 'react';
import { supabase } from '../supabase';
import { RiNotification2Fill } from 'react-icons/ri';
import { getPicture, measurements } from '../components/Communities/CommunityAPI';
import { TbTarget } from 'react-icons/tb';
import { GiArrowhead } from 'react-icons/gi';
import React from 'react';

export default function LandingPage() {

    function SignInButton() {
        return <Link href='/login'>
            <Button variant='solid'
                width='8rem'
                padding='1.75rem'
                fontSize='1.25rem'
                borderRadius='unset'
                backgroundColor={useColorModeValue('white', 'gray.900')}
                _hover={{
                    fontSize: '1.35rem'
                }}>
                <Text color={useColorModeValue(constants.darkMode, constants.lightMode)}>
                    Login
                </Text>
            </Button>
        </Link>
    }

    function SignUpButton() {
        return <Link href='/signup'>
            <Button variant='solid'
                width='200px'
                backgroundColor={useColorModeValue(constants.darkMode, constants.lightMode)}
                padding='2rem'
                fontSize='1.5rem'
                borderRadius='unset'
                _hover={{
                    fontSize: '1.6rem'
                }}>
                    <Text color={useColorModeValue(constants.lightMode, constants.darkMode)}>
                        Get Started
                    </Text>
                
            </Button>
        </Link>
    }

    function LearnMoreButton() {
        return <Link href='#features'>
            <Button variant='outline'
                width='200px'
                borderColor={useColorModeValue(constants.darkMode, constants.lightMode)}
                padding='2rem'
                fontSize='1.5rem'
                borderRadius='unset'
                _hover={{
                    fontSize: '1.6rem'
                }}>
                <Text color={useColorModeValue(constants.darkMode, constants.lightMode)}>
                    Learn More
                </Text>
            </Button>
        </Link>
    }

    function Header() {
        return (<Stack
            justify='space-between'
            alignItems='center' flexDirection={['column','row']}
            px={['1rem','3rem']}
            py={['1rem','2rem']} overflowX='hidden'>
            <Image src={logo_name} maxWidth='10rem' />
            
            <Spacer/>
            

        </Stack>);
    }

    function Intro() {
        return (
            <Flex
                position='relative'
                alignItems={['center', 'flex-start']}
                textAlign={['center', 'start']}
                id='product' height='fit-content' minH={800}>
                <VStack rowGap='2rem' marginBottom='6rem'>
                    <Flex marginStart={[null,'150px']} marginX={['10px',null]} maxWidth='700px' flexDirection='column' textColor={useColorModeValue(constants.darkMode, constants.lightMode)}>
                        <Heading fontSize={['2rem','4rem']} fontWeight='300' lineHeight='1.1' marginTop='150px' marginBottom='50px'>
                            Collaborate with others to achieve your goals
                        </Heading>
                        <Text maxWidth={[null, '80%']} lineHeight='1.4' fontWeight='200' fontSize={['1.25rem','1.75rem']} marginBottom='50px'>
                            Why use GoalTac? Because GoalTac is the only website to effectively
                            target procrastination at it's source with socialized productivity
                            {/* Replace: Find your community now! */}
                        </Text>
                        <Flex flexDirection={['column','row']} gap='30px'>
                           <SignUpButton /> 
                           <LearnMoreButton />
                        </Flex>
                       
                    </Flex>
                </VStack>

            </Flex>
        );
    }

    function IntroPreLaunch() {
        const email = useRef('')
        const toastEmail = useToast({
            title: "Email is not formatted correctly",
            position: 'bottom',
            status: 'error',
            duration: 4000,
            isClosable: true,
        });
        const toastDuplicate = useToast({
            title: "This email has already been signed up",
            position: 'bottom',
            status: 'error',
            duration: 4000,
            isClosable: true,
        });
        const toastSuccess = useToast({
            title: "Successfully signed up!",
            position: 'bottom',
            status: 'success',
            duration: 4000,
            isClosable: true,
        });
        const isEmail = (checkedEmail: string) => {
            return String(checkedEmail)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        const [correctEmail,setCorrectEmail] = useState(false)
        const handleSubmit = (event: React.SyntheticEvent) => {
            event.preventDefault();

            /**
             * Checks to see if the input string is a valid email type
             * @param checkedEmail 
             * @returns 
             */
            
            //If it's not a valid email then it'll send an error toast
            if(!isEmail(email.current)) {
                toastEmail()
                return
            }

            /**
             * Inserts the user's email into the email list. Only accepts new users
             * @param value 
             * @returns 
             */
            async function addEmail(value: string) {
                const { data:data, error } = await supabase
                    .from('Email_Updates')
                    .insert({email: value})
                    .select()

                if (error) { //send error for attempted pre-registered email
                    if (error.code == '23505') {
                        toastDuplicate()
                    }
                } else {
                    toastSuccess()
                }
                return data
            }
            addEmail(email.current)
        }
        return (
            <Flex position='relative'
                alignItems={'center'}
                textAlign={['center']}
                id='product' height='fit-content' minH={[400,800]}>
                <VStack rowGap='2rem' marginBottom='6rem' marginX='auto'>
                    <Flex maxWidth='700px' flexDirection='column' alignItems='center' textColor={useColorModeValue(constants.darkMode, constants.lightMode)}>
                        <Heading fontSize={['2rem','4rem']} fontWeight='500' lineHeight='1.1' marginTop='150px' marginBottom='50px'>
                            You're a Little Early!
                        </Heading>
                        <Flex padding='2rem' maxWidth='80%' borderRadius={measurements.cards.borderRadius} boxShadow='lg' backgroundColor={useColorModeValue('white', 'gray.900')} flexDirection='column' gap='30px'>
                            <Text lineHeight='1.4' fontWeight='200' fontSize={['1.25rem','1.75rem']}>
                                Add your email here to get the latest updates!
                                {/* Replace: Find your community now! */}
                            </Text>
                            <FormControl>
                                <Input autoFocus type='email' height='4rem' fontSize='lg' placeholder='example@gmail.com'
                                    onChange={(e)=>{
                                            email.current = e.currentTarget.value
                                            if (isEmail(email.current)) {
                                                setCorrectEmail(true)
                                            } else {
                                                setCorrectEmail(false)
                                            }
                                        }}/>
                            </FormControl>
                            <Button height='50px' colorScheme={correctEmail ? 'blue' : 'gray'} fontSize='lg' paddingX='40px' leftIcon={<EmailIcon/>}
                                onClick={(e)=>handleSubmit(e)}>
                                Subscribe
                            </Button>
                            
                        </Flex>
                       
                    </Flex>
                    <LearnMoreButton/>
                    
                </VStack>
            </Flex>
        );
    }

    function SocialFeature() {

        function CommunityFeature() {
            return <Stack id='features' flexWrap={'wrap'} gap={['40px','20px']} justifyContent='space-evenly' flexDirection={['column','row']}>
                <VStack textAlign='center' width={['fit-content','300px']} alignSelf='center' rowGap='1rem'>
                    <Heading width='80%' fontSize='1.75rem'>
                        Join your Community
                    </Heading>
                    <Text fontSize='20px'>
                        People are looking for people like you to join their community
                    </Text>
                </VStack>
                <Card_Header/>
            </Stack>}
        function CommunityTaskFeature() {
            return <Flex flexWrap='wrap-reverse' gap={['40px','20px']} justifyContent='space-evenly' flexDirection={['column-reverse','row']}>
                <Card_Goal/>
                <VStack textAlign={'center'} alignSelf='center' width={['fit-content','300px']} rowGap='1rem'>
                    <Heading width='80%' fontSize='1.75rem'>
                        Share Tasks with Friends
                    </Heading>
                    <Text fontSize='20px'>
                        Share and collaborate on goals suggested by your community and friends!
                    </Text>
                </VStack>
            </Flex>
        }

        function SocialFeedFeature() {
            return <Flex flexWrap='wrap-reverse' gap={['40px','20px']} justifyContent='space-evenly' flexDirection={['column-reverse','row']}>
                <Image maxWidth='600px' width='50%' src={feed}/>
                <VStack alignSelf='center' width={['fit-content','300px']}>
                    <Heading width='80%'>
                        Post your Tasks
                    </Heading>
                    <Text fontSize='20px'>
                        Comment, like, share, and post to your profile. Find your audience and help motivate others
                    </Text>
                </VStack>
            </Flex>
        }

        function Card_Header() {
      
            return <Card paddingBottom='40px' maxWidth='600px' minWidth={constants.cardMinWidth} maxHeight='300px' height='fit-content' backgroundColor={useColorModeValue(constants.lightMode, constants.darkMode)} borderRadius={measurements.cards.borderRadius} position='relative'>
      
              {/* BANNER: The height and width should be set to the size of the banner */}
              <Box borderRadius='inherit' padding='20px' bgImage={ProfileBackground} borderBottomRadius='unset'>
                <Flex borderRadius='20px' left='5%' alignSelf='left'>
                  <Card borderRadius='inherit' backgroundColor={useColorModeValue(constants.lightMode, constants.darkMode)} borderColor='Background' borderWidth='1px' height='100px' width='100px' padding='10px'>
                    <Image src={GoalTac_T_Logo} />
                  </Card>
                </Flex>
              </Box>
      
              {/* TEXTS: Name and description */}
              <Box marginTop='10px' paddingX='5%'>
                <HStack alignSelf='end' marginY='10px'>
                  <Heading fontSize='3xl'> GoalTac</Heading>
                  <Spacer/>
                  <ButtonGroup borderRadius='full'>
                    <Button colorScheme='green' variant='solid'>
                        Join
                    </Button>
                  </ButtonGroup>
                  
                </HStack>
                <Text size='md' maxHeight='80px' overflowY='scroll' width='80%'>
                It is frequently shown that working amongst a community of people who share the same goals as you helps to propell you to your goals and ambitions
                </Text>
                
              </Box>
               
            </Card>
        }

        function Card_Goal() : ReactElement {
            const task = {
                name: 'Do 100 backflips',
                description: 'This is pretty difficult. Follow the steps in the youtube tutorial!',
                owner: '136021e3-4e2c-4ed2-8a32-06803fd800e5',
                members: [''],
                created_by: new Date(),
                type: 'Number', //can be number, boolean, tasks
                reward: 5
              }
            
            
            //NEED TO REDUCE RE RENDER AMOUNT. This is absurd
            return <Card maxWidth='600px' backgroundColor={useColorModeValue(constants.lightMode,constants.darkMode)} minWidth={constants.cardMinWidth} height='300px'
            padding='20px' borderRadius={measurements.cards.borderRadius} position='relative'>
                
                <Flex flexDirection='column' marginEnd='8rem'>
                    <Editable width='80%' defaultValue={task ? task.name : 'Unknown'} fontSize='2xl' fontWeight='bold'>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Text maxW={'600px'} width='80%'>
                        {task ? task.description : 'unknown'}
                    </Text>
                </Flex>
                    
                <Flex position='absolute' gap='20px' right='20px'>
                    <Tooltip label="Amount contributed" aria-label='A tooltip'>
                        <Badge colorScheme='red' borderRadius='5px' padding='10px'>
                            43/100
                        </Badge>
                    </Tooltip>
                    <Tooltip label="Points rewarded to community" aria-label='A tooltip'>
                        <Badge colorScheme='green' borderRadius='5px' padding='10px'>
                            {task ? task.reward : 0} pts
                        </Badge>
                    </Tooltip>
                </Flex>

                <Flex position='absolute' right='20px' bottom='20px'>
                    <Tooltip label='Add your tasks when you are done drafting!'>
                        <Button colorScheme='green' variant='solid' leftIcon={<AddIcon/>}>
                            Add
                        </Button> 
                    </Tooltip>
                    
                </Flex>

                <Flex position='absolute' left='20px' bottom='20px'>
                    <Tooltip label="Task participants" aria-label='A tooltip'>
                        <AvatarGroup size='md' max={2}>
                            <Avatar name='Nikhil G'/>
                            <Avatar name='My Phung'/>
                            <Avatar name='Aditiya C'/>
                            <Avatar name='Andrew Rayski'/>
                            <Avatar name='Mayur X'/>
                            <Avatar name='Seth Pappalardo'/>
                            <Avatar name='Jack C'/>
                            <Avatar name='Michael S'/>
                            <Avatar name='Jordan Hawkes'/>
                            <Avatar name='Max H'/>
                        </AvatarGroup>
                    </Tooltip>
                </Flex>
                
            </Card>
        }

        return (<Flex paddingY='50px' flexDirection='column' gap='100px' maxWidth={constants.maxWidth} marginX='auto'>
            <SimpleGrid marginX={['2px','50px']} spacing={['40px','100px']}>
                <CommunityFeature/>
                <CommunityTaskFeature/>
            </SimpleGrid>
        </Flex>);
    }

    function ProductiveFeature() {

        function CalendarFeature() {
            return <Flex flexWrap='wrap' gap={['40px','20px']} justifyContent={['center','space-evenly']} flexDirection={['column','row']}>
                <VStack textAlign='center' alignSelf={'center'} width={['fit-content','300px']} rowGap='1rem'>
                    <Heading width='80%' fontSize='1.75rem'>
                        Expansive Customization
                    </Heading>
                    <Text fontSize='20px'>
                        Pivot from a top-level view to a focused view, or anything in between, with ease
                    </Text>
                </VStack>
                <Image maxWidth='600px' width='100%' height='auto' src={useColorModeValue(calendar, calendar_dark)}/>

            </Flex>
        }

        function TaskCreateFeature() {

            

            return <Stack flexWrap={'wrap'} gap={['40px','20px']} justifyContent='space-evenly' flexDirection={['column','row']}>
                <VStack textAlign={'center'} flexGrow={1} width={['fit-content','300px']} alignSelf='center'>
                    <Heading fontSize='2rem'>
                        Freedom to Create Tasks Your Way
                    </Heading>
                    <Text fontSize='1rem'>
                        Create your tasks the way you vision it with our many flexible options!
                    </Text>
                    <Image maxWidth='600px' width='100%' height='auto' src={useColorModeValue(task_drawer, task_drawer_dark)}/>
                </VStack>
                
            </Stack>
        }

        return (<Flex id='productivity' paddingY='50px' flexDirection='column' gap='100px' maxWidth={constants.maxWidth} marginX='auto'>
            <SimpleGrid marginX={['2px','50px']} spacing={['40px','100px']}>
                <CalendarFeature/>

            </SimpleGrid>
        </Flex>);
    }

    function Slider() {
        return (<Box backgroundColor={useColorModeValue('','gray.00')}
            gap='2rem' paddingX='10px'
            textAlign='center'
            pt={"3rem"}>
            <Box fontSize={['30px', '4xl']} fontWeight='700' >Our Team</Box>
            <Carousel
                /*removeArrowOnDeviceType={[
                    'mobile',
                    'tablet',
                    'desktop',
                ]}*/
                showDots={true}
                draggable={true}
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={4000}
                infinite={true}
                
                focusOnSelect={true}
                arrows={true}>
                {staffProfiles.map((staff, index) => {
                    return (
                        <Box p='0.5rem' paddingY='6rem' pt='2rem' key={index}>
                            <VStack
                                cursor='grab'
                                userSelect='none'
                                rounded={'lg'}
                                transition='boxShadow 3s'
                                _hover={{
                                    boxShadow: '0px 0px 2px gray',
                                }}
                                pt='2rem'>
                                <Avatar size={'xl'} mb={4} pos={'relative'} src={staff.image ? staff.image : ''} bgGradient='radial(blue.500, teal.300)' />
                                <Heading fontSize={'2xl'} fontFamily={'body'} >{staff.name} </Heading>
                                <Text fontWeight={600} color={'gray.500'} mb={4}>{staff.title}</Text>
                                <Text textAlign={'center'} color={useColorModeValue('gray.800', 'gray.200')} px={3}>{staff.desc}</Text>
                                <Box>
                                    {staff.badges.map((badge, i) => {
                                        return (<Badge bgColor='transparent' key={i} colorScheme='blue'>{badge}</Badge>);
                                    })}
                                </Box>
                                <Box pb={"20px"}>{staff.contact}</Box>
                            </VStack>
                        </Box>
                    );
                })}
            </Carousel>
            <br />
        </Box>);
    }

    function PreFooter() {
        return (<Stack id='careers'
            direction={'column'}
            alignItems='center'
            justifyContent={['center', null, 'space-between']}
            rowGap='50px'
            py='3rem'
            px={['2rem', null, '7rem']}
            position='relative'>
            <Stack direction={['column']} gap={['20px','40px']} alignItems={'center'}>
                <Heading fontSize={['35px', '4xl']}
                    textAlign={'center'}
                    fontWeight='400'
                    lineHeight='1.1'>
                    Join a community for free at GoalTac
                </Heading>
                
            </Stack>
            
            <Stack>
                <Text fontWeight='500' fontSize='1.5rem' textAlign='center'>
                    Supported by
                </Text>
                <HStack>
                    <Image width='200px' src={useColorModeValue(uconn_light_logo, uconn_dark_logo)}/>
                </HStack>
            </Stack>
            
            
        </Stack>
        );
    }

    function Footer() {

        function MediaIcons() {

            const icons = [
                {
                    icon: <FaFacebookSquare size={25} color={useColorModeValue('rgba(66, 103, 178)', '')} />,
                    href: 'https://www.facebook.com/goaltacmedia',
                    label: 'Facebook'
                },
                {
                    icon: <FaLinkedin size={25} color={useColorModeValue('rgb(0,119,181)', '')} />,
                    href: 'https://www.linkedin.com/company/goaltac/',
                    label: 'LinkedIn'
                },
                {
                    icon: <FaDiscord size={25} color={useColorModeValue('rgb(114,137,218)', '')} />,
                    href: 'https://discord.gg/EzFPQDAKGf',
                    label: 'Discord'
                },
                {
                    icon: <FaInstagram size={30} />,
                    href: 'https://www.instagram.com/goaltac/',
                    label: 'Instagram'
                },
            ];

            return (
                <HStack>
                    {icons.map((icon, index) => (
                        <Link href={icon.href} target='_blank' key={index}>
                            <IconButton
                                variant='unstyled'
                                cursor='pointer'
                                aria-label={icon.label}
                                transition='.4s all ease'
                                icon={icon.icon}
                                _hover={{
                                    filter:
                                        'invert(58%) sepia(54%) saturate(470%) hue-rotate(323deg) brightness(103%) contrast(95%)',
                                }} />
                        </Link>
                    ))}
                </HStack>
            );
        }
        const { toggleColorMode, colorMode } = useColorMode();

        return (
            <VStack
                justifyContent='center'
                w={constants.maxWidth}
                paddingX='3rem'>
                <Stack
                    flexDir={['column','row']}
                    paddingX='2rem'
                    maxWidth='100vw'
                    width={constants.maxWidth}
                    alignSelf='center'>

                    <Image alignSelf={['center','left']} src={logo_name} maxWidth='200px' />
                    <Spacer/>
                    <HStack alignSelf={['center','right']}>
                        <MediaIcons />
                        <Button onClick={toggleColorMode} variant='ghost'>
                            {useColorModeValue(<SunIcon />, <MoonIcon />)}
                        </Button>
                    </HStack>
                    
                </Stack>
                <Stack flexDirection={['column', 'row']} 
                paddingX='2rem'
                columnGap='20px'
                maxWidth='100vw' width={constants.maxWidth}
                justifyContent ={['center', 'left']}>
                    <Text>
                        Copyright @ 2023 GoalTac LLC.
                    </Text>
                    <Spacer/>
                    <Link href='/agreements'>
                        Privacy Policy
                    </Link>
                    <Link href='/agreements'>
                        Terms of Service
                    </Link>
                    <Link href='/versions'>
                        Dev-Logs
                    </Link>
                </Stack>
            </VStack>
        )
    }

    const constants = {
        maxWidth: '1400px',
        cardMinWidth: '225px',
        lightMode: 'white',
        darkMode: 'gray.800'
    }

    return (
        <Flex flexDirection='column' minH='100vh' overflowX='hidden'>
            <Flex>
                <Box overflowX='hidden' width='100%'
                    bgColor={useColorModeValue(constants.lightMode, constants.darkMode)} >
                    <Box>
                       
                        <Box backgroundImage={bubble} backgroundSize='cover' maxWidth='100%' backgroundColor={useColorModeValue(constants.lightMode, constants.darkMode)}>
                            <Box maxW={constants.maxWidth} marginX='auto'>
                                <Header />
                                <IntroPreLaunch/>
                            </Box>
                        </Box>
                        <Box backgroundColor={useColorModeValue('blue.50','blackAlpha.300')}>
                           <SocialFeature />
                        </Box>
                        <ProductiveFeature/>

                        <Box maxW={constants.maxWidth} marginX='auto'>
                            <Slider />
                            <PreFooter  />
                        </Box>
                    </Box>


                </Box>


            </Flex>

            <Spacer alignSelf='center' w={constants.maxWidth}
                bgColor={useColorModeValue(constants.lightMode, constants.darkMode)} />

            <Flex id='footer'
                flexDirection='column'
                alignSelf='center'
                maxW={constants.maxWidth}
                bgColor={useColorModeValue(constants.lightMode, constants.darkMode)}
                py='3rem'
                bottom='0'>
                <Divider marginBottom='3rem' />
                <Footer />
            </Flex>

        </Flex>
    );
}

export const contents = [
    
    {
        number: '01',
        title: 'Meet new friends',
        text: `Join or create your own community specified towards a topic of choice!
            Communities are ranked based on how many points they earn. The more
            productive you and your community are, the higher you place! This will
            give that accountability rarely seen on online platforms, especially in
            a productive setting.`,
    },
    {
        number: '02',
        title: 'Everything you need in one place',
        text: `Want to just organize your tasks? No problem.
            Want to use the app to meet other people? You can do that too.
            GoalTac's app allows you to use it in any way you like without
            jeopordizing your experience!`
    },
    {
        number: '03',
        title: 'Superior organization',
        text: `We prioritize high customizability in task creation,
            which can be visualized in many ways! Use GoalTac to track
            progress towards any goal you aspire to accomplish.`,
    },
    {
        number: '04',
        title: 'Have fun with it!',
        text: `Goal execution is gamified and will help make work fun!
            Reach significant milestones whilst competing with
            your peers to accomplish shared goals through various
            challenges and games.`,
    },
];

export const goalTacDesc = [
    {
        name: 'Background',
        desc: 'Motivation to better oneself is declining in this day and age and we want to make a dent in this issue.'
    },
    {
        name: 'Productivity Apps Now',
        desc: 'We want to cater to the least motivated people by pitching in the help of others, keeping you accountable! There is an inherent flaw in productivity apps today, which have very few strong extrinsic motivators to come back to the app.'
    },
    {
        name: 'Details',
        desc: 'We promote a new lifestyle where you and your peers hold yourself accountable. You have the option to join user-made communities specific to the goal you want to accomplish. Not only are you surrounded by like minded people, but you also have the option to compete with them through the various goals that can be posted!'
    }
]

export const staffProfiles = [
    {
        name: 'My Phung',
        image: 'https://media.licdn.com/dms/image/D4E03AQGzcOT2TD9yeg/profile-displayphoto-shrink_400_400/0/1680054603274?e=1700697600&v=beta&t=Ezzap2gNI0qwtsjfN8vnvbNpfor2HSYWBHSuyaNpo3Q',
        title: 'Founder',
        desc: 'Entrepreneur, student, chess and guitar enthusiast. Chat with me on Discord @ Wrys#8935',
        badges: [
            'weightlifting',
            'chess',
            'entrepreneurship',
            'guitar',
            'academics',
        ],
        contact: 'myphungquoc@gmail.com',
    },
    {
        name: 'Aditya Chandraker',
        image: null,
        title: 'Lead Developer',
        desc: 'Premed student, CS minor, Pianist, and a fan of spicy food',
        badges: ['tabletennis', 'chess', 'art', 'taekwondo', 'academics'],
        contact: 'aditya.chandraker@uconn.edu',
    },
    {
        name: 'Ibrahima Capo-ChiChi',
        image: null,
        title: 'Developer',
        desc: '',
        badges: [''],
        contact: '',
    },
    {
        name: 'Mayur Somalinga',
        image: null,
        title: 'Developer',
        desc: 'Senior UConn Psychology Student — I used to be allergic to potatoes',
        badges: ['music', 'academics', 'photography'],
        contact: 'mayurapriyan.somalinga@uconn.edu',
    },
    {
        name: 'Nikhil Ghosh',
        image: null,
        title: 'Developer',
        desc: '',
        badges: [''],
        contact: '',
    },
    {
        name: 'Colin Acerbi',
        image: null,
        title: 'Developer',
        desc: '',
        badges: [''],
        contact: '',
    },
    {
        name: 'Jordan Hawkes',
        image: null,
        title: 'Marketing',
        desc: '',
        badges: [''],
        contact: '',
    },
    {
        name: 'Paolo Rangonese',
        image: null,
        title: 'Finance',
        desc: 'Hard working enthusiasts, and beloved father. "The snow goose need not bathe to make itself white. Neither need you do anything but be yourself." -Lao Tzu',
        badges: [''],
        contact: '',
    },
];

export const responsive = {
    desktop: {
        breakpoint: { max: 99999, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
    },
};