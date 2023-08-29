import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, useColorMode, Spacer, Flex, Stack, VStack, HStack, Text, Button, Image, Avatar, Heading, useColorModeValue, Badge, IconButton, Divider, LinkBox, Link, FormControl, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from "@chakra-ui/react";
import {
    FaDiscord,
    FaFacebookSquare,
    FaInstagram,
    FaLinkedin,
    FaLock,
} from 'react-icons/fa';
import { AtSignIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import logo_name from './../images/GoalTac_Logo.png'
import logo from './../images/logo.png'
import logo_stacked from './../images/GoalTac_TLogo.png'

import background_blur from './../images/background_noise.svg'
import collaboration from './../images/collaboration.png'
import one from './../images/ffflux.svg'
import two from './../images/sssurf.svg'
import bubble from './../images/bubble.svg'
import uconn_dark_logo from './../images/CCEI-stacked_white.png'
import uconn_light_logo from './../images/CCEI-stacked_blue.png'

import SignUpPage from './../pages/Signup'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabase';

export default function LandingPage() {

    function SignInButton() {
        return <Link href='/login'>
            <Button variant='outline'
                width='8rem'
                borderColor={useColorModeValue(constants.darkMode, constants.lightMode)}
                padding='1.75rem'
                fontSize='1.25rem'
                borderRadius='unset'
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
        return (<HStack
            justify='space-between'
            alignItems='center'
            px={['1rem','3rem']}
            py={['1rem','2rem']} overflowX='hidden'>
            <Image src={logo_name} maxWidth='10rem' />
            
            <Spacer/>
            
            <SignInButton />

        </HStack>);
    }

    function Intro() {
        return (
            <Flex
                position='relative'
                alignItems={['center', 'flex-start']}
                textAlign={['center', 'start']}
                id='product' height='fit-content'>
                <VStack rowGap='2rem' marginBottom='6rem'>
                    <Flex marginStart={['0px','150px']} marginX={['10px',null]} maxWidth='700px' flexDirection='column' textColor={useColorModeValue(constants.darkMode, constants.lightMode)}>
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

    function Features() {

        return (
            <Stack
                id='features'
                spacing='6rem'
                mt='8rem'
                px={['1rem', null, '6rem']}
                py='3rem'
                bgColor={useColorModeValue('gray.100','gray.700')}>
                <Stack direction={['column', null, 'row']}
                    maxWidth={constants.maxWidth} marginX='auto'
                    position='relative'>
                     <VStack
                        alignItems={['center', null, 'flex-start']}
                        textAlign={['center', null, 'left']}
                        minWidth='50%'
                        spacing='2rem'>
                        <Heading fontSize='3rem' bgGradient='linear(to-t, teal.300, blue.500)' fontWeight='700' lineHeight='1.1' bgClip='text'>
                            What is GoalTac?
                        </Heading>

                        <VStack rowGap='2rem' paddingStart={['', null, '2rem']} maxWidth={['100%', '80%']} fontSize='1rem'>
                            {goalTacDesc.map((desc, index) => (
                                <Box key={index}>
                                    <Heading fontSize='1rem'>{desc.name}</Heading>
                                    <Text paddingStart={['', null, '2rem']}>
                                        {desc.desc}
                                    </Text>
                                </Box>
                            ))}
                        </VStack>
                    </VStack>

                    <VStack spacing='2rem'>
                        {contents.map((vstack, index) => (
                            <VStack key={index}>
                                <Flex width='100%' alignItems='center'>
                                    <Box p='.3rem 1rem' fontWeight='600'>{vstack.number}</Box>
                                    <Box fontWeight='600' pl='20px'>{vstack.title}</Box>
                                </Flex>
                                <Box p='.3rem 1rem'>{vstack.text}</Box>
                            </VStack>
                        ))}
                    </VStack>
                </Stack>
                
            </Stack>
        );
    }

    function Slider() {
        return (<Box
            gap='2rem'
            textAlign='center'
            pt={"3rem"}>
            <Box fontSize={['30px', '4xl']} fontWeight='700' >Our Team</Box>
            <Carousel
                removeArrowOnDeviceType={[
                    'mobile',
                    'tablet',
                    'desktop',
                ]}
                showDots={true}
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={2000}
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
                                <Avatar size={'xl'} mb={4} pos={'relative'} bgGradient='radial(blue.500, teal.300)' />
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
                <SignUpButton />
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
                    href: '',
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
                    href: '',
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
                        <Button onClick={toggleColorMode} 
                        variant='ghost' borderWidth='2px'>
                            {useColorModeValue(<SunIcon />, <MoonIcon />)}
                        </Button>
                    </HStack>
                    
                </Stack>
                <Stack flexDirection={['column', 'row']} 
                paddingX='2rem'
                maxWidth='100vw' width={constants.maxWidth}
                justifyContent ={['center', 'left']}>
                    <Text>
                        Copyright @ 2023 GoalTac LLC. All rights reserved.
                    </Text>
                    <Spacer/>
                    <Text>
                        Privacy Policy
                    </Text>
                    <Text>
                        Terms of Service
                    </Text>
                </Stack>
            </VStack>
        )
    }

    const constants = {
        maxWidth: '1400px',
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
                                <Intro />
                            </Box>
                        </Box>

                        <Features />
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
        image: null,
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
        name: 'Nikhil Ghosh',
        image: null,
        title: 'Developer',
        desc: '',
        badges: [''],
        contact: '',
    },
    {
        name: 'Jack Cornell',
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
        desc: '',
        badges: [''],
        contact: '',
    },
    {
        name: 'Seth Pappalardo',
        image: null,
        title: 'Business',
        desc: '',
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