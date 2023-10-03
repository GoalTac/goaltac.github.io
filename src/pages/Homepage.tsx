/**
 * This home page will have
 * 1. Feed of posts
 * 2. Header for options
 * 3. Sidebar for task display
 */

import { Avatar, Link, Badge, Box, Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Spinner, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Tooltip, VStack, useColorMode, useColorModeValue, useDisclosure, useToast, Skeleton, SkeletonCircle, SkeletonText, Progress, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import { getUser, twoColumns } from "../hooks/Utilities";
import { FcLike, FcSettings } from "react-icons/fc";
import { FaFilter, FaThumbsUp, FaTrash } from "react-icons/fa";
import { ArrowDownIcon, ArrowUpIcon, ChatIcon, EditIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { RxAvatar } from "react-icons/rx";
import { TbTableOptions, TbTrendingUp } from "react-icons/tb";
import { SlOptions, SlOptionsVertical, SlShareAlt } from "react-icons/sl";
import { Task, _addPost, _deleteTask, _deleteUserTask, _getAllPostInfo, _getAllTasks, _getUserTasksInfo, _getTaskbyID, _getUserRelations, _getUserTasks } from "../components/Tasks/TaskAPI";
import { useSession, useSupabaseClient } from "../hooks/SessionProvider";
import { measurements } from "../components/Communities/CommunityAPI";
import premiumLogo from './../images/premium_logo.png';
import premiumName from './../images/premium_logo_name.png';
import { useNavigate, useNavigation } from "react-router-dom";
import { supabase } from "../supabase";
import { GiBowString, GiPocketBow, GiPostOffice, GiPostStamp } from "react-icons/gi";
import PostModal from "../components/Tasks/PostModal";
import Chat from "../components/Chats/CommunityChat";

export default function Homepage() {
    
    const [taskIDs, setTaskIDs] = useState<any>();
    const { user: user } = useSession();
    const  useSupabase: any  = useSupabaseClient();
    const navigate = useNavigate()
    const toast = useToast()
    const [tasksLoaded, setTasksLoaded] = useState<Boolean>(false)
    const [postsLoaded, setPostsLoaded] = useState<Boolean>(false)
    const loading = () => {return tasksLoaded && postsLoaded}

    const getPackagedInfo = (task: Task, relations: any) => {
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
            type: task.type,
            likes: 0, comments: 0
        }
    }

    function Post({taskInfo}: any) {
        const progress: number = taskInfo.progress
        const requirement: number = taskInfo.requirement
        const userName: string = taskInfo.userName
        const avatarURL: string = taskInfo.avatarURL
        const displayName: string = taskInfo.displayName
        const likes: number = taskInfo.likes
        const isComplete = progress/requirement >= 1
        const percentProgress: number = ((progress/requirement) * 100)

        const handleLike = async() => {
            //take the post ID
            //take who liked the post
            //To update the user's like status of that post
            /**
             * const { data: data, error: error } = await supabase
                .from('post_liked')
                .select('id')
                .eq('user_uuid', taskInfo.user_id)
                .eq('post_uuid', taskInfo.this_should_be_the_post_id);
             */
            
            //Access the post_liked database and find whether or not a row exists given a user's ID and the post's ID
            //If there is one, that means the post has been liked by this user
                //Remove row
            //If there isn't one, that means the post hasn't been liked
                //Insert a row
        }

        

        return <Card width='inherit' padding='20px' maxWidth='inherit' height='fit-content'>
            <Stack flexWrap='wrap' flexDirection='row' paddingBottom='10px' width='100%' alignItems='center'>
                <HStack flexDir={'row'} marginRight='auto'>
                    <Text fontWeight='500'>
                        {taskInfo.interests}
                    </Text>
                    <Text fontWeight='200'>
                        - {userName}
                    </Text>
                </HStack>
                <Tooltip fontSize='8px' hasArrow label={`${progress}/${requirement}`} position='relative'>
                    <Box position='relative'>
                        <Progress size='lg' borderWidth='2px' marginLeft='auto' width='200px' value={percentProgress} colorScheme={progress >= requirement ? 'green' : 'orange'}/>
                        <Text position='absolute' top='1' right='1' fontSize='6px' fontWeight='700'>
                            {((progress/requirement) * 100).toFixed(2)}%
                        </Text>
                    </Box>
                    
                </Tooltip>
                
            </Stack>
            
            <Flex flexDirection='row'>
                <Link marginRight='20px' href={`/profile/${userName}`}>
                    <Avatar name={displayName} src={avatarURL} />
                </Link>
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
                    <Button colorScheme='green' leftIcon={<FaThumbsUp />} onClick={handleLike}>{likes}</Button>
                    <Tooltip label='Comment feature coming soon'>
                                            <Button colorScheme='blue' leftIcon={<ChatIcon />}>{taskInfo.comments} comments</Button>

                    </Tooltip>

                </ButtonGroup>
                <Spacer/>
                <Tooltip label='Import & collaborate on tasks'>
                                    <IconButton isDisabled variant='ghost' isRound colorScheme='gray' icon={<SlOptions />} aria-label='Settings Icon'/>

                </Tooltip>
            </HStack>
                
                
        </Card>
    }

    function SocialFeed() {
        
        function Header() {
            return <Card maxWidth='inherit' padding='20px'>
                <Stack flexDirection='row' >
                    <Flex minWidth='120px'>
                        <TaskDrawer>
                            <Input focusBorderColor='blue.300' _hover={{borderColor:'blue.300'}} placeholder='Create task' />
                        </TaskDrawer>
                        
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
            const [offset, setOffset] = useState<number>(0)

            useEffect(()=>{
                const postChanges = useSupabase.channel('post').on('postgres_changes',{
                    schema: 'public', // Subscribes to the "public" schema in Postgres
                    event: '*',       // Listen to all changes
                    table: 'posts'
                },(payload: any) => {
                    fetchPosts()
                }).subscribe()
                async function fetchPosts() {
                    const fetchedPosts = await _getAllPostInfo(offset)
                    setPosts(fetchedPosts)
                    setPostsLoaded(true)
                }
                fetchPosts()
                return () => {
                    postChanges.unsubscribe()
                  };
            },[postsLoaded])

            //PUT PROFILE INFO IN THE POST VARIABLE
            return <SimpleGrid columns={1} spacing='20px'>
                {posts.length>0 && loading() ? 
                posts.map((post: any, id: number)=>{
                    return <Post key={id} taskInfo={post}/>
                }) :
                <Box padding='6' boxShadow='lg' bg={useColorModeValue('white','gray.700')}>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
              </Box>}
            <Button type="submit" aria-label="More" onClick={(loadMore)} fontSize="xl" ml={1} background="none"> More </Button>
            </SimpleGrid>
            async function loadMore(): Promise<void> {
                const morePosts = await _getAllPostInfo(offset + 10)
                setOffset(offset + 10)
                setPosts((posts: any) => [...posts, ...morePosts]);          }
        }
        

        return <Flex flexDirection='column' rowGap='20px' maxWidth='600px' width='100%'>
            <Header/>
            <Posts/>
        </Flex>
    }
 
    function TaskManagement() {
        const [tasksInfo, setTasksInfo] = useState<any>([]);
        const [postLength, setPostLength] = useState<number>(0)

        useEffect(()=> {
            const taskChanges = useSupabase.channel('task').on('postgres_changes',{
                    schema: 'public', // Subscribes to the "public" schema in Postgres
                    event: '*',       // Listen to all changes
                    table: 'task_user_relations'
                },(payload: any) => {
                    fetchUserTasks()
            }).subscribe()
            const postChanges = useSupabase.channel('post').on('postgres_changes',{
                schema: 'public', // Subscribes to the "public" schema in Postgres
                event: '*',       // Listen to all changes
                table: 'posts'
            },(payload: any) => {
                fetchUserTasks()
            }).subscribe()

            async function fetchUserTasks() {
                if(user) {
                    const fetchedTasks = await _getUserTasksInfo(user?.['id'])
                    setTasksInfo(fetchedTasks)
                    setPostLength((fetchedTasks.filter((it_task: any)=>it_task.hasPosted)).length)
                    setTasksLoaded(true) 
                }
            }

            fetchUserTasks()

            return () => {
                taskChanges.unsubscribe();
                postChanges.unsubscribe()
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
                <Text fontWeight='600' paddingBottom='10px'>Task Analytics</Text>
                <Divider/>
                <StatGroup flexDir='column'>
                    <Stat >
                        <StatLabel fontSize='10px'  fontWeight='400'>Total Tasks</StatLabel>
                        <StatNumber>{tasksInfo.length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel fontSize='10px'  fontWeight='400'>Completed Tasks</StatLabel>
                        <StatNumber color={useColorModeValue('green.500','green.300')}>{(tasksInfo.filter((it_task: any)=>it_task.progress >= it_task.requirement)).length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel fontSize='10px'  fontWeight='400'>Posted Tasks</StatLabel>
                        <StatNumber color={useColorModeValue('purple.500','purple.300')}>{postLength}/5</StatNumber>
                    </Stat>
                </StatGroup>
            </CardBody>
        </Card>
        }
        function ListView() {

            function TaskModule({taskInfo}: any) {
                const { isOpen, onOpen, onClose } = useDisclosure()
                const hasPosted = (taskInfo.hasPosted ? true : false)

                //highlight the task in the list that has already been posted
                function PostModal() {  
                    const handlePost = async() => {
                        onClose()
                        if (postLength >= 5) {
                            toast({
                                title: "Sorry!",
                                description: 'You are limited to 5 posts',
                                status: 'warning',
                                duration: 9000,
                                isClosable: true,
                            })
                            return
                        }

                        const createdPost = await _addPost(taskInfo.task_id, taskInfo.user_id).finally(()=>{
                            toast({
                                title: "Success",
                                description: 'Successfully created your task!',
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            })
                            
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

                return <HStack borderRadius='5' backgroundColor={hasPosted ? useColorModeValue('purple.300','purple.600') : useColorModeValue('orange.100','orange.400')} flexDirection='row' alignItems='center'>
                    <Text marginStart='20px' fontSize='12px' fontWeight='400' noOfLines={1} maxWidth='100px'>
                        {taskInfo.name}
                    </Text>
                    
                    <Spacer/>
                    <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton rightIcon={<SlOptionsVertical />} isActive={isOpen} variant='unstyled' colorScheme='gray' as={Button}/>
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
        
            return <Card padding='3px'>
                <CardHeader textAlign='center' fontSize='14px' fontWeight='500'>
                    Task List
                </CardHeader>
                {tasksInfo.length > 0 && loading() ? 
                <SimpleGrid paddingBottom='10px' columns={1} gap='3px' width='inherit' maxHeight='200px' overflowY='scroll'>
                    {tasksInfo.map((taskInfo: any, id:number)=>{
                        return <TaskModule key={id} taskInfo={taskInfo}/>
                        
                    })}
                </SimpleGrid>: 
                <Text paddingBottom='10px' textAlign='center' fontSize='10px'>Your task list is empty!</Text>
                }
                
                <Button variant='ghost' onClick={()=>navigate('/dashboard')} size='sm'>Dashboard</Button>
            </Card>
            
        }
        return <Flex position='static'  pos='relative' rowGap='20px' maxWidth={[null,'200px']}>
            <Box>
                <Analytics/>
                <Box paddingTop='20px' position='sticky' flexWrap='wrap' top={12} height='min'>
                    <ListView/>
                </Box>
            </Box>
        </Flex>
    }

    return <Stack marginX='auto'
    paddingBottom='100px'
    flexWrap='wrap-reverse'
    maxWidth='1200px'
    columnGap={measurements.general.colGap}
    flexDirection={['column-reverse','row']}
    alignItems={['center','unset']}
    justifyContent='center'>
        <SocialFeed/>
        <TaskManagement/>
    </Stack>
}