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

// edit this file to change the content of the beta page
import { contents, goalTacDesc, staffProfiles, responsive } from '../components/Beta/BetaContent';

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