/**
 * This home page will have
 * 1. Feed of posts
 * 2. Header for options
 * 3. Sidebar for task display
 */

import { Avatar, Link, Badge, Box, Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Spinner, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Tooltip, VStack, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import { getUser, twoColumns } from "../hooks/Utilities";
import { FcLike, FcSettings } from "react-icons/fc";
import { FaFilter, FaThumbsUp, FaTrash } from "react-icons/fa";
import { ArrowDownIcon, ArrowUpIcon, ChatIcon, EditIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { RxAvatar } from "react-icons/rx";
import { TbTableOptions, TbTrendingUp } from "react-icons/tb";
import { SlOptions, SlOptionsVertical, SlShareAlt } from "react-icons/sl";
import { _addPost, _deleteTask, _deleteUserTask, _getAllPostInfo, _getAllTasks, _getPost, _getTaskbyID, _getUserRelations, _getUserTasks } from "../components/Tasks/TaskAPI";
import { useSession, useSupabaseClient } from "../hooks/SessionProvider";
import { measurements } from "../components/Communities/CommunityAPI";
import premiumLogo from './../images/premium_logo.png';
import premiumName from './../images/premium_logo_name.png';
import { useNavigate, useNavigation } from "react-router-dom";
import { supabase } from "../supabase";
import { GiBowString, GiPocketBow, GiPostOffice, GiPostStamp } from "react-icons/gi";
import PostModal from "../components/Tasks/PostModal";
import { render } from "react-dom";
export default function Homepage() {  
    const [taskIDs, setTaskIDs] = useState<any>();
    const [loading, setLoading] = useState<Boolean>(true)
    const { user: user } = useSession();
    const  useSupabase: any  = useSupabaseClient();
    const navigate = useNavigate()
    const toast = useToast()

    const getPackagedInfo = (task: any, relations: any) => {
        return {
            progress: relations.progress,
            task_id: relations.task_id,
            user_id: relations.user_id,
            description: task.description,
            end_date: task.end_date,
            name: task.name,
            reoccurence: task.reoccurence,
            reward: task.reward,
            requirement: task.requirement,
            start_date: task.start_date,
            type: task.simple,
            likes: 0, comments: 0
        }
    }

    function Post({taskInfo}: any) {
        const progress: number = taskInfo.progress
        const requirement: number = taskInfo.requirement
        const [userName, setUserName] = useState<string>('N/A')
        const [avatarURL, setAvatarURL] = useState<string>('')
        const [displayName, setDisplayName] = useState<string>('N/A')

        useEffect(()=>{
            async function fetchUserName() {
                const fetchedName = await getUser(taskInfo.user_id)
                if (fetchedName) {
                    const name = fetchedName.username
                    const url = fetchedName.avatarurl
                    const display = fetchedName.name

                    setUserName(name)
                    setAvatarURL(url)
                    setDisplayName(display)

                }
            }
            fetchUserName()
        },[])

        const isComplete = progress/requirement >= 1

        return <Card width='inherit' padding='20px' maxWidth='inherit' height='fit-content'>
            <Stack flexWrap='wrap' flexDirection='row' paddingBottom='10px'>
                <HStack flexDir={'row'}>
                    <Text fontWeight='500'>
                        {taskInfo.interests}
                    </Text>
                    <Text fontWeight='200'>
                        - {userName}
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
                    <Avatar name={displayName} src={avatarURL} />
                </Box>
                <Box overflowY='hidden' maxHeight='300px'>
                    <Heading fontSize='1rem'>
                        {taskInfo.name}
                    </Heading>  
                    <Text>
                        {taskInfo.description}
                    </Text>
                </Box>
            </Flex>
            <Divider color='gray.300' paddingY='10px'/>
            <HStack flexDirection='row' >
                <ButtonGroup paddingY='10px' columnGap='20px' variant='ghost' size='md' >
                    <Button colorScheme='green' leftIcon={<FaThumbsUp />}>{taskInfo.likes}</Button>
                    <Button colorScheme='blue' leftIcon={<ChatIcon />}>{taskInfo.comments} comments</Button>

                </ButtonGroup>
                <Spacer/>
                <IconButton isDisabled variant='ghost' isRound colorScheme='gray' icon={<SlOptions />} aria-label='Settings Icon'/>
            </HStack>
                
                
        </Card>
    }

    function SocialFeed() {
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
                        <MenuButton isActive={isOpen} variant='unstyled' colorScheme='gray' as={Button} rightIcon={(isOpen ? <ArrowUpIcon/> : <ArrowDownIcon/>)}>
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

            const [posts, setPosts] = useState<any>([])

            useEffect(()=>{
                async function fetchPosts() {
                    const fetchedPosts = await _getAllPostInfo()
                    setPosts(fetchedPosts)
                }
                fetchPosts()
            },[])


            return <SimpleGrid columns={1} spacing='20px'>
                {posts.map((post: any, id: number)=>{
                    return <Post key={id} taskInfo={post}/>
                })}
            </SimpleGrid>
        }
        return <Flex flexDirection='column' rowGap='20px' maxWidth='600px' width='fit-content'>
            <Header/>
            <Posts/>
        </Flex>
    }

    function TaskManagement() {
        const [tasksInfo, setTasksInfo] = useState<any>([]);

        useEffect(()=> {
            const taskChanges = useSupabase.channel('any').on('postgres_changes',{
                    schema: 'public', // Subscribes to the "public" schema in Postgres
                    event: '*',       // Listen to all changes
                    table: 'task_user_relations'
                },(payload: any) => {
                    setLoading(true)
                    fetchUserTasks().finally(()=>setLoading(false))
            }).subscribe()

            async function fetchUserTasks() {
                if(user) {
                    //all task IDs the user has relationship with
                    const userTasksRelations = await _getUserRelations(user?.['id'])

                    let task_relations: any[] = []

                    //get the task objects from the task IDs
                    const userTasks = await Promise.all(userTasksRelations.map(async(relation) => {
                        const task = await _getTaskbyID(relation.task_id)
                        task_relations.push(getPackagedInfo(task, relation))
                        return task
                    }))

                    setTasksInfo(task_relations)

                    setLoading(false) 
                }
            }

            fetchUserTasks()

            return () => {
                taskChanges.unsubscribe();
              };
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
                    <Button 
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
                        <StatNumber>{tasksInfo.length}</StatNumber>
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
            function TaskModule({taskInfo}: any) {
                const { isOpen, onOpen, onClose } = useDisclosure()
                const [hasPosted, setHasPosted] = useState(true)

                //highlight the task in the list that has already been posted
                function PostModal() {  
                    const handlePost = async() => {

                        const createdPost = await _addPost(taskInfo.task_id, taskInfo.user_id).finally(()=>{
                            toast({
                                title: "Success",
                                description: 'Successfully created your task!',
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            })
                            onClose()
                        })
                    }                  
                    return (
                        <Modal scrollBehavior='inside' isCentered motionPreset='slideInBottom' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent backgroundColor={useColorModeValue('gray.50','gray.800')}>
                            <ModalHeader>Confirm your Post</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Post taskInfo={taskInfo} />
                            </ModalBody>
                    
                            <ModalFooter>
                                <Button type='submit' colorScheme='blue' mr={3} onClick={handlePost}>Post</Button>
                                <Button variant='outline' onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )
                }

                

                useEffect(()=>{
                    const isPost = async() => {
                        //check if the post has already been made
                        if (!taskInfo) {
                            return false
                        }
                        const exists = await _getPost(taskInfo.task_id, taskInfo.user_id)
                        if (exists.length > 0) {
                            //so there is no need to change a variable to the same value
                            if (!hasPosted) {
                                setHasPosted(true)
                            }
                        } else {
                            if (hasPosted) {
                                setHasPosted(false)
                            }
                        }
                    }
                    isPost()
                },[])
                return <HStack paddingLeft='20px'>
                    <Tooltip label='WIP. Will have option to delete, post, share task'>
                        <Text fontSize='12px' fontWeight='400'>
                            {taskInfo.name}
                        </Text>
                    </Tooltip>
                    
                    <Spacer/>
                    <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton marginRight='-10px' leftIcon={<SlOptionsVertical />} isActive={isOpen} variant='unstyled' colorScheme='gray' as={Button}/>
                        <MenuList>
                            <MenuItem isDisabled icon={<EditIcon/>}>Edit</MenuItem>
                            
                            {!hasPosted && <MenuItem onClick={onOpen} icon={<SlShareAlt/>}>Post<PostModal/></MenuItem>}
                            <MenuItem onClick={()=>{
                                if (user) {
                                   _deleteUserTask(user?.['id'], taskInfo.task_id)
                                }
                            }} icon={<FaTrash/>}>Delete</MenuItem>
                        </MenuList>
                        </>)}
                    </Menu>
                </HStack>
            }
        
            return <Card marginY='20px'>
                <SimpleGrid columns={1} width='inherit' maxHeight='200px' overflowY='clip'>
                    {tasksInfo.map((taskInfo: any, id:number)=>{
                        return <Box key={id}>
                            <TaskModule taskInfo={taskInfo}/>
                            <Divider/>
                        </Box>
                        
                    })}
                </SimpleGrid>
                <Button variant='ghost' onClick={()=>navigate('/dashboard')} size='sm'>Load more</Button>
            </Card>
            
        }
        return <Flex position='static'  pos='relative' rowGap='20px' maxWidth={[null,'200px']}>
            <Box>
                <Premium/>
                <Box paddingTop='20px' position='sticky' flexWrap='wrap' top={0} height='min'>
                    <Analytics/>
                    <ListView/>
                    <TaskDrawer/>
                    {/**
                     * 
                     * Create a task drawer component that:
                     * 1. Envelopes a button that can be clicked on 
                     *      such that we can make the button open the task drawer
                     * <TaskDrawer/>
                     *      <ExampleButtonElement/>
                     * </TaskDrawer>
                     * 2. If user clicks on any element within the tags here it will act to open the drawer
                     */}
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