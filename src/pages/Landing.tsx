import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, useColorMode, Spacer, Flex, Stack, VStack, HStack, Text, Button, Image, Avatar, Heading, useColorModeValue, Badge, IconButton, Divider } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaDiscord,
    FaFacebookSquare,
    FaInstagram,
    FaLinkedin,
} from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function LandingPage() {

    function SignInButton() {
        return <Link to='/login'>
            <Button variant='ghost'
                padding='2rem'
                fontSize='1.5rem'
                bgClip='text'
                bgGradient='linear(to-l, teal.300, blue.500)'
                borderRadius='1rem'
                _hover={{
                    color: 'unset'

                }}>
                Sign In
            </Button>
        </Link>
    }

    function SignUpButton() {
        return <Link to='/signup'>
            <Button variant='ghost'
                padding='2rem'
                fontSize='1.5rem'
                borderWidth='3px'
                bgClip='text'
                bgGradient='linear(to-l, teal.300, blue.500)'
                borderRadius='1rem'
                _hover={{
                    color: 'unset'
                }}>
                Sign Up
            </Button>
        </Link>
    }

    function Header() {
        return (<HStack
            justify='space-between'
            alignItems='center'
            px='3rem'
            py='2rem'>
            <Image src={'GoalTac_Logo.png'} boxSize='17%' pr='2px' />
            <SignInButton />

        </HStack>);
    }

    function Intro() {
        return (
            <Flex
                alignItems={['center', 'flex-start']}
                textAlign={['center', 'start']}
                id='product'>
                <VStack rowGap='2rem' marginBottom='6rem'>
                    <Box fontSize='4rem' fontWeight='700' lineHeight='1.1' bgGradient='linear(to-t, teal.300, blue.500)'
                        bgClip='text'>
                        Productive Together
                    </Box>
                    <Box maxWidth={['90%', '70%']} lineHeight='1.4' fontSize='1.5rem'>
                        Have a goal that you want to work towards? Data shows that people may be
                        inclined to feel more motivated and disciplined when they around like-minded peers.
                        Join a community at GoalTac today to attack the goals you share together!
                    </Box>
                    <SignUpButton />
                </VStack>
            </Flex>
        );
    }

    function Features() {

        return (
            <Stack
                id='features'
                direction={['column', null, 'row']}
                spacing='6rem'
                mt='8rem'
                px={['1rem', null, '6rem']}
                py='3rem'
                bgColor={useColorModeValue('gray.100','gray.700')}
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
        return (<Stack
            id='careers'
            direction={['column', null, 'row']}
            alignItems='center'
            justifyContent={['center', null, 'space-between']}
            marginY='6rem'
            py='3rem'
            px={['2rem', null, '7rem']}
            position='relative'>
            <Box
                fontSize={['35px', '4xl']}
                fontWeight='700'
                lineHeight='1.1'
                maxWidth={['100%', null, '40%']}
                textAlign={['center', 'left']}>
                Be the change you want to see today.
            </Box>
            <SignUpButton />
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
                        <Link to={icon.href} target='_blank' key={index}>
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

                    <Image alignSelf={['center','left']} src={'GoalTac_Logo.png'} maxWidth='200px' />
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
        <Flex 
            flexDirection='column'
            minH='100vh'>

            <Flex justifyContent='center' alignItems='center'>
                <Box overflowX='hidden' 
                    bgColor={useColorModeValue(constants.lightMode, constants.darkMode)}
                    maxW={constants.maxWidth}>

                    <Header />

                    <Box>
                        <Flex paddingTop='6rem'
                            columnGap='6rem'
                            rowGap='2rem'
                            alignItems='center'
                            paddingX='4rem'
                            flexDirection={['column-reverse', 'row']}>
                            <Intro />
                            <Image src={'CreateTask.png'} maxW='400px' maxH='350px' borderRadius='12px' />
                        </Flex>


                        <Box>
                            <Features />
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
                w={constants.maxWidth}
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