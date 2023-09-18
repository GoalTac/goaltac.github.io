/**
 * This home page will have
 * 1. Feed of posts
 * 2. Header for options
 * 3. Sidebar for task display
 */

import { Avatar, Badge, Box, Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, HStack, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Spacer, Spinner, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Tooltip, VStack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import { twoColumns } from "../hooks/Utilities";
import { FcLike, FcSettings } from "react-icons/fc";
import { FaFilter, FaThumbsUp } from "react-icons/fa";
import { ArrowDownIcon, ArrowUpIcon, ChatIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { RxAvatar } from "react-icons/rx";
import { TbTableOptions, TbTrendingUp } from "react-icons/tb";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { _getUserTasks } from "../components/Tasks/TaskAPI";
import { useSession } from "../hooks/SessionProvider";
import { measurements } from "../components/Communities/CommunityAPI";
import premiumLogo from './../images/premium_logo.png';
import premiumName from './../images/premium_logo_name.png';
import { useNavigate, useNavigation } from "react-router-dom";
export default function Homepage() {
    const [taskIDs, setTaskIDs] = useState<any>();
    const [loading, setLoading] = useState<Boolean>(true)
    const { user: user } = useSession();
    const navigate = useNavigate()

    const [examples, setExamples] = useState<any>({
        taskID: 0,
        title: 'Example Task',
        description: 'This is an example',
        likes: 12,
        comments: 32,
        progress: 10,
        requirement: 100,
        poster: 'Wrys', //will be some user's UUID
        interests: ['Boxing'],
        created_at: new Date(),
        image: 'https://www.goaltac.net/assets/Calendar.bdf78867.png'
    })

    function SocialFeed() {
        function OptionMenu() {

        }
        function Header() {
            return <Card maxWidth='inherit' padding='20px'>
                <Stack flexDirection='row' >
                    <Flex maxWidth='100px'>
                       <TaskDrawer/> 
                    </Flex>
                    
                    <Spacer/>
                    <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton isActive={isOpen} variant='solid' colorScheme='gray' as={Button} rightIcon={(isOpen ? <ArrowUpIcon/> : <ArrowDownIcon/>)}>
                            Options
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<RxAvatar/>}>For you</MenuItem>
                            <MenuItem isDisabled icon={<StarIcon/>}>New</MenuItem>
                            <MenuItem isDisabled icon={<TbTrendingUp/>}>Trending</MenuItem>
                            <MenuItem isDisabled icon={<FaFilter/>}>Filter</MenuItem>

                        </MenuList>
                        </>)}
                    </Menu>
                </Stack>
                
            </Card>
        }
        /**
         * Renders limited number of posts. If user attempts to scroll further 
         * then it will render another 'max' number of posts again
         * @returns Render of max posts allowable
         */
        function Posts() {
            function Post() {
                const progress: number = examples.progress
                const requirement: number = examples.requirement
    
                const isComplete = progress/requirement >= 1
    
                return <Card width='inherit' padding='20px' maxWidth='inherit' height='fit-content'>
                    <Stack flexWrap='wrap' flexDirection='row' paddingBottom='10px'>
                        <HStack flexDir={'row'}>
                            <Text fontWeight='500'>
                                {examples.interests}
                            </Text>
                            <Text fontWeight='200'>
                                - {examples.poster}
                            </Text>
                        </HStack>
                        <Spacer/>
                        <HStack>
                            <Tooltip fontSize='8px' hasArrow label={`${progress}/${requirement}`}>
                                <Badge variant='subtle' borderRadius='3px' colorScheme={isComplete ? 'green' : 'orange'} fontSize='10px' paddingX='10px' paddingY='2px' width='fit-content'>
                                    {((progress/requirement) * 100).toFixed(2)}%
                                </Badge>
                            </Tooltip>
                    
                        </HStack>
                    </Stack>
                    
                    <Flex flexDirection='row'>
                        <Box marginRight='20px'>
                            <Avatar name='My Phung' src='https://media.licdn.com/dms/image/D4E03AQGzcOT2TD9yeg/profile-displayphoto-shrink_800_800/0/1680054603274?e=2147483647&v=beta&t=2Orm7yEP0-ZgHvY4E5v9r9fQ11sXxSawk83FiQllBcs' />
                        </Box>
                        <Box overflowY='hidden' maxHeight='300px'>
                            <Heading>
                                {examples.title}
                            </Heading>  
                            <Text>
                                {examples.description}
                            </Text>
                            <Image src={examples.image}/>
                        </Box>
                    </Flex>
                    <Divider color='gray.300' paddingY='10px'/>
                    <HStack flexDirection='row' >
                        <ButtonGroup paddingY='10px' columnGap='20px' variant='ghost' size='md' >
                            <Button colorScheme='green' leftIcon={<FaThumbsUp />}>{examples.likes}</Button>
                            <Button colorScheme='blue' leftIcon={<ChatIcon />}>{examples.comments} comments</Button>

                        </ButtonGroup>
                        <Spacer/>
                        <IconButton isDisabled variant='ghost' isRound colorScheme='gray' icon={<SlOptions />} aria-label='Settings Icon'/>
                    </HStack>
                        
                        
                </Card>
            }
            const rows = [];
            for (let i = 0; i < 10; i++) {
                rows.push(<Post key={i}/>);
            }
            return <SimpleGrid columns={1} spacing='20px'>
                {rows}
            </SimpleGrid>
        }
        return <Flex flexDirection='column' rowGap='20px' maxWidth='600px' width='fit-content'>
            <Header/>
            <Posts/>
        </Flex>
    }

    function TaskManagement() {
        const [userTasks, setUserTasks] = useState<any>([]);

        useEffect(()=>{
            async function fetchUserTasks() {
                if(user) {
                    setUserTasks(await _getUserTasks(user?.['id']))
                }
            }
            fetchUserTasks().finally(()=>setLoading(false))
        },[])

        function Premium(){
            const { colorMode } = useColorMode()
        
            return( <Card padding='10px'
                flexDirection='column' 
                position='relative'
                rowGap='1rem' 
                borderColor={(colorMode == 'dark' ? 'yellow.500' : 'orange.300')}>
                <Image zIndex='hide' position='absolute' top='0px' right='0px' width='25%' src={premiumLogo}/>
                <VStack alignItems='left'>
                    <Image width='50%' src={premiumName} />
                    <Box paddingStart='0.6rem' rowGap='1rem'>
                        <Heading fontSize='1.2rem'>
                            Try Premium for free
                        </Heading>
                        <Text lineHeight='1.5rem'>
                            No ads, more features, full access!
                        </Text>
                    </Box>
                </VStack>
                    <Button borderRadius='15px'
                        _active={{
                            bgColor: 
                            (colorMode == 'dark' ? 
                            'rgb(236, 201, 75)' : 
                            'rgb(251, 211, 141)')
                        }}
                        boxShadow={(colorMode == 'dark' ? 
                        '0px 2px 8px rgb(214, 158, 46)' : 
                        '0px 2px 8px rgb(237, 137, 54)')}
                        textColor='white' 
                        marginX='1rem' 
                        borderWidth='1px' 
                        _hover={{
                            boxShadow: (colorMode == 'dark' ? 
                        '0px 2px 14px rgb(214, 158, 46)' : 
                        '0px 2px 14px rgb(237, 137, 54)')
                        }}
                        bgColor={(colorMode == 'dark' ? 'yellow.500' : 'orange.300')}>
                        Try 1 week free!
                    </Button>
                </Card>)
        }
        function Analytics() {
            return <Card height='min-content'>
            <CardBody paddingTop='10px'>
                <Text fontWeight='600'>Task Analytics</Text>
                <StatGroup>
                    <Stat>
                        <StatLabel>Completed Tasks</StatLabel>
                        <StatNumber>{userTasks.length}</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />23.36%    
                            (Week)
                            
                        </StatHelpText>
                    </Stat>
                </StatGroup>
            </CardBody>
        </Card>
        }
        function ListView() {
            function TaskModule({task}: any) {
                return <HStack paddingLeft='20px'>
                    <Text>
                        {task.name}
                    </Text>
                    <Spacer/>
                    <IconButton isDisabled variant='ghost' isRound colorScheme='gray' icon={<SlOptionsVertical />} aria-label='Settings Icon'/>
                </HStack>
            } 
            return <Card marginY='20px'>
                <SimpleGrid columns={1} spacing='20px' width='inherit' maxHeight='200px' overflowY='clip'>
                    {!loading ? userTasks.map((task: any, id:number)=>{
                        return <TaskModule key={id} task={task}/>
                    }) : <Spinner/>}
                </SimpleGrid>
                <Button variant='ghost' onClick={()=>navigate('/dashboard')} size='sm'>Load more</Button>
            </Card>
            
        }
        return <Flex position='static'  pos='relative' rowGap='20px' maxWidth='200px'>
            <Box>
                <Premium/>
                <Box paddingTop='20px' position='sticky' flexWrap='wrap' top={0} height='min'>
                    <Analytics/>
                    <ListView/>
                    <TaskDrawer/>                    
                </Box>
            </Box>
        </Flex>
    }

    return <Stack marginX='auto'
    paddingBottom='100px'
    flexWrap='wrap-reverse'
    maxWidth='1200px'
    columnGap={measurements.general.colGap}
    flexDirection={['column','row']}
    justifyContent='center'>
        <SocialFeed/>
        <TaskManagement/>
    </Stack>
}