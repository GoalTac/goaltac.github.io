import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, useColorMode, Spacer, Flex, Stack, VStack, HStack, Text, Button, Image, Avatar, Heading, useColorModeValue, Badge, IconButton } from "@chakra-ui/react";
import Canvas from "../components/Beta/Canvas";
import { Link, useNavigate } from "react-router-dom";
import {
    FaDiscord,
    FaFacebookSquare,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaTiktok,
    FaLinkedin,
} from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

// edit this file to change the content of the beta page
import { contents, goalTacDesc, staffProfiles, responsive } from '../components/Beta/BetaContent';
import { useEffect } from 'react';
import { supabase } from '../supabase';
import TestRedirect from '../components/TestRedirect';

export default function BetaPage() {

    return (
        <VerisonOne/>
    );
}

function VerisonOne() {

    function SignInButton() {
        return <Link to='/signin'>
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
                borderWidth='1px'
                borderColor='gray.900'
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
        return(<HStack
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
              <VStack rowGap='2rem'>
                <Box fontSize='4rem'  fontWeight='700' lineHeight='1.1' bgGradient='linear(to-t, teal.300, blue.500)'
                bgClip='text'>
                  Productive Together
                </Box>
                <Box maxWidth={['90%', '70%']} lineHeight='1.4' fontSize='1.5rem'>
                  Have a goal that you want to work towards? Data shows that people may be
                  inclined to feel more motivated and disciplined when they around like-minded peers.
                  Join a community at GoalTac today to attack the goals you share together!
                </Box>
                <SignUpButton/>
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
                icon: <FaFacebookSquare size={25} color='rgba(66, 103, 178)' />,
                href: '',
                label: 'Facebook'
                },
                {
                icon: <FaLinkedin size={25} color='rgba(255,0,0)' />,
                href: 'https://www.linkedin.com/company/goaltac/',
                label: 'LinkedIn'
                },
                {
                icon: <FaDiscord size={25} color='rgba(114,137,218)' />,
                href: 'https://discord.gg/EzFPQDAKGf',
                label: 'Discord'

                },
                {
                icon: <FaInstagram size={30} color='white' />,
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
                        }}/>
                    </Link>
                ))}
                </HStack>
            );
        }
        const { toggleColorMode, colorMode } = useColorMode();

        return (
            <Flex
                maxW={measurements.maxWidth}
                px='3rem'
                w='100%'>
                <Flex 
                    flexDirection='column'
                    gap='1rem'
                    alignItems='center'>

                    <Image src={'GoalTac_Logo.png'} pt='5px' maxWidth='200px'/>
                    <HStack>
                        <MediaIcons />
                    </HStack>
                    <Button onClick={toggleColorMode}>
                        {useColorModeValue(<SunIcon />, <MoonIcon />)}
                    </Button>
                </Flex>
            </Flex>
        )
    }

    const measurements = {
        maxWidth: '1400px',
      
    }

    return(
        <Flex 
        flexDirection='column'
        minH='100vh'
        bgGradient={
        useColorModeValue(
        'linear(to-b, teal.300, blue.500)', 'linear(to-b, gray.700, teal.700, blue.500)')}>
      
      <Flex justifyContent='center' alignItems='center' >
        <Box overflowX='hidden'
          bgColor={useColorModeValue('white','gray.700')}
          maxW={measurements.maxWidth}>

          <Header />
          
          <Box>
            <Flex
            paddingTop='6rem'
            columnGap='6rem'
            rowGap='2rem'
            alignItems='center'
            paddingX='4rem'
            flexDirection={['column-reverse', 'row']}>
              <Intro />
              <Image src={'CreateTask.png'} maxW='400px' maxH='350px' borderRadius='12px'/>
            </Flex>
            

            <Box>
              <Features />
              <Slider  />
              <PreFooter />
            </Box>
          </Box>
         
          
        </Box>

        
      </Flex>
      
      <Spacer alignSelf='center' w={measurements.maxWidth} 
      bgColor={useColorModeValue('white', 'gray.700')}/>

    <HStack 
        minW='100%'
        id='about'
        bg='gray.900'
        justifyContent='center'
        py='3rem'
        bottom='0'>
        <Footer />
    </HStack>
      
    </Flex>
    );
}

function VersionTwo() {

    // Variables ----------------------------------------------------------------------
    const navigate = useNavigate();

    // useEffects ----------------------------------------------------------------------
    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            // if the user is logged in, redirect them to the calendar page
            if (data.user != null)
                navigate('/calendar');
        };
        getUser();
    }, []);

    return (
        <Box position="relative">


            {/* 1st Page */}
            <Canvas style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }} />
            <Stack position="absolute" top={0} left={0} justifyContent={'center'} h={'100vh'} w={'100vw'} pl={5} pr={5}>
                <Box fontSize={["60px", "80px", "120px"]} fontWeight='700' lineHeight='1.1' textColor='white'>
                    Productive Together
                </Box>
                <Box lineHeight='1.7' textColor='white'>
                Have a goal that you want to work towards? Data shows that people may be
                inclined to feel more motivated and disciplined when they around like-minded peers.
                Join a community at GoalTac today to attack the goals you share together!
                </Box>

            </Stack>
            <Box h="100vh"></Box> {/*keep this to allow the first page to actually take space*/}

            {/* 2nd page */}
            <Stack
                direction={['column', null, 'row']}
                p={2}
            >
                <VStack
                    height="100vh"
                    alignItems={['center', null, 'flex-start']}
                    justifyContent="center"
                    textAlign={['center', null, 'left']}
                    p={4}
                >
                    <Image src="logo.png" alt="GoalTac Logo" display="block" mx="auto" />
                    <Box fontSize={['30px', '4xl']} fontWeight='1rem' lineHeight='1.1'>
                        What is GoalTac?
                    </Box>
                    <VStack rowGap='2rem' paddingStart={['', null, '2rem']} maxWidth={['100%', '80%']} fontSize='1rem'>
                        {goalTacDesc.map((desc, index) => (
                            <Box>
                                <Heading fontSize='1rem'>{desc.name}</Heading>
                                <Text paddingStart={['', null, '2rem']}>
                                    {desc.desc}
                                </Text>
                            </Box>              
                        ))}
                        
                    </VStack>
                </VStack>

                <VStack spacing='2rem' pt='2rem' pb='2rem'>
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


            {/* 3rd page */}
            <Box
                gap='2rem'
                textAlign='center'
                pt={"3rem"}
                bgColor={useColorModeValue('gray.50', 'blue.900')}
            >
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
                    arrows={true}
                >
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
                                    pt='2rem'
                                >
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
            </Box>

            {/* Footer */}
            <Stack direction={['column', null, 'row']} p={2}>

                <Stack direction={'row'} mt={4} ml={4} mr={4}>
                    <IconButton as="a" href="https://discord.com/" target="_blank" rel="noopener noreferrer" aria-label="Discord" icon={<FaDiscord />} />
                    <IconButton as="a" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" icon={<FaFacebookSquare />} mr={2} />
                    <IconButton as="a" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" icon={<FaInstagram />} mr={2} />
                    <IconButton as="a" href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" icon={<FaTwitter />} mr={2} />
                    <IconButton as="a" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" icon={<FaYoutube />} mr={2} />
                    <IconButton as="a" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok" icon={<FaTiktok />} />
                </Stack>

                <Box p={4} ml={'auto'}>
                    <Text>Copyright 2023. All Rights Reserved.</Text>
                    <Link to={'privatepolicy'} style={{ fontWeight: 'bold' }}>Private Policy</Link>
                </Box>

            </Stack>

            <TestRedirect link1='/1' link2='/2' />



            {/* Button to Login (must be rendered last to be on top)*/}
            <Button as={Link} to="/login" position="fixed" top={4} right={120} style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0)' }} textColor='white'>Login</Button>
            <Button as={Link} to="/signup" position="fixed" top={4} right={4} style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0)' }} textColor='white'>Sign Up</Button>
        </Box >
    );
}