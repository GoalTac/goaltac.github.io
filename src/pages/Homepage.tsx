/**
 * This home page will have
 * 1. Feed of posts
 * 2. Header for options
 * 3. Sidebar for task display
 */

import { Avatar, Link, Badge, Box, Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Spinner, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Tooltip, VStack, useColorMode, useColorModeValue, useDisclosure, useToast, Skeleton, SkeletonCircle, SkeletonText, Progress, Input, AvatarGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import { getUser, twoColumns } from "../hooks/Utilities";
import { FcLike, FcSettings } from "react-icons/fc";
import { FaFilter, FaThumbsUp, FaThumbtack, FaTrash } from "react-icons/fa";
import { AddIcon, ArrowDownIcon, ArrowUpIcon, ChatIcon, EditIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { RxAvatar } from "react-icons/rx";
import { TbTableImport, TbTableOptions, TbTrendingUp } from "react-icons/tb";
import { SlOptions, SlOptionsVertical, SlShareAlt } from "react-icons/sl";
import { Task, _addPost, _deleteTask, _deleteUserTask, _getAllPostInfo, _getAllTasks, _getUserTasksInfo, _getTaskbyID, _getUserRelations, _getUserTasks, increment, _importTaskFromUser, decrement, _addUserTask, addImport, addPoints, removePoints } from "../components/Tasks/TaskAPI";
import { useSession, useSupabaseClient } from "../hooks/SessionProvider";
import { measurements } from "../components/Communities/CommunityAPI";
import premiumLogo from './../images/premium_logo.png';
import premiumName from './../images/premium_logo_name.png';
import { useNavigate, useNavigation } from "react-router-dom";
import { supabase } from "../supabase";
import { GiBowString, GiPocketBow, GiPostOffice, GiPostStamp, GiSaveArrow } from "react-icons/gi";
import PostModal from "../components/Tasks/PostModal";
import Chat from "../components/Chats/CommunityChat";
import { AiOutlineImport } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";

export default function Homepage() {
    
    const [taskIDs, setTaskIDs] = useState<any>();

    const { user: user, profile: profile } = useSession();
    const  useSupabase: any  = useSupabaseClient();
    const navigate = useNavigate()
    const toast = useToast()
    const [tasksLoaded, setTasksLoaded] = useState<Boolean>(false)
    const [postsLoaded, setPostsLoaded] = useState<Boolean>(false)
    const loading = () => {return tasksLoaded && postsLoaded}

    function Post({taskInfo}: any) {
        const isCollaborative : boolean = taskInfo.isCollaborative ? true : false
        const collaborators = taskInfo.collaborators ? taskInfo.collaborators : null

        const created_at : Date = new Date(taskInfo.created_at)
        const progress: number = taskInfo.progress
        const totalProgress: number = taskInfo.all_progress ? taskInfo.all_progress : progress

        const requirement: number = taskInfo.requirement
        const userName: string = taskInfo.userName
        const avatarURL: string = taskInfo.avatarURL
        const displayName: string = taskInfo.displayName
        const [likes, setLikes] = useState<number>(taskInfo.likes)
        const [imports, setImports] = useState<number>(taskInfo.imports)
        const poster_uuid: string = taskInfo.user_id

        const percentProgress: number = ((totalProgress/requirement) * 100)
        const post_uuid: string = taskInfo.post_id
        const [isLiked, setIsLiked] = useState<boolean>(taskInfo.liked) //this shouldn't be true if the post hasn't been liked by the person!!
        const colorTheme = {
            inComplete: {
                dark: 'red.800',
                light: 'red.50'
            },
            inProgress: {
                dark: 'yellow.600',
                light: 'orange.50'
            },
            complete: {
                dark: 'green.600',
                light: 'green.50'
            }
        }
        const pickedColor = (progress >= requirement ? useColorModeValue(colorTheme.complete.light,colorTheme.complete.dark) : progress > 0 ? useColorModeValue(colorTheme.inProgress.light,colorTheme.inProgress.dark) : useColorModeValue(colorTheme.inComplete.light,colorTheme.inComplete.dark))

        const handleLike = async() => {
            if (!user) {
                return
            }
            const user_uuid = user?.['id']

            if (isLiked) {
                const { data: data, error: error } = await supabase
                    .from('posts_liked')
                    .delete()
                    .match({'user_uuid': user_uuid, 'post_uuid': post_uuid})
                    .select()
                if (error) {
                    throw Error(error.message)
                }
                decrement(post_uuid, user_uuid)
                setIsLiked(false)
                setLikes(likes - 1)
            } else {
                const { data: data, error: error } = await supabase
                    .from('posts_liked')
                    .insert({user_uuid: user_uuid, post_uuid: post_uuid})
                    .select();
                if (error) {
                    throw Error(error.message)
                }
                increment(post_uuid, user_uuid)
            
                setIsLiked(true)
                setLikes(likes + 1)
            }
        }

        const handleCollaborate = async() => {
            if (!user || taskInfo.user_id == user?.['id']) {
                toast({
                    title: "Warning",
                    description: 'You can not collaborate on your own task',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })  
                return
            }
            if (user && taskInfo.user_id != user?.['id']) {
                const isError = await _addUserTask(user?.['id'], taskInfo.task_id, false)
                if (isError.message) {
                    toast({
                        title: "Error",
                        description: isError.message,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: "Success",
                        description: 'Now collaborating! View tasks in your dashboard',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                }
                
            }
        }

        const handleImport = async() => {
            if (user && taskInfo.user_id != user?.['id']) {
                const isError = await _importTaskFromUser(taskInfo.task_id, user?.['id'], post_uuid)
                if (isError) {
                    toast({
                        title: "Error",
                        description: isError.message,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                } else {
                    setImports(imports + 1)
                    toast({
                        title: "Success",
                        description: 'View your dashboard to see your new task!',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                }
                
            } else {
                toast({
                    title: "Error",
                    description: 'You can not import your own task',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }

        const handleTac = async() => {
            if (poster_uuid == user?.['id']) {
                toast({
                    title: "Warning",
                    description: 'Cannot give yourself tacs',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })
                return
            }
            if (profile) {
                if (profile?.['points'] >= 1) {
                    addPoints(poster_uuid, 1)
                    removePoints(user?.['id'], 1)
                    toast({
                        title: "Success",
                        description: `Donated 1 tac to ${displayName}`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: "Warning",
                        description: 'You do not have enough tacs for this action',
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }
            } else {
                toast({
                    title: "Warning",
                    description: 'Unable to find your profile',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })
            }

        }

        

        return <Card width='inherit' padding='20px' maxWidth='inherit' height='fit-content' backgroundColor={useColorModeValue('gray.50','gray.700')}>

            <Stack flexDirection='row'>
            <Stack flexDirection='row' width='100%'>
                <Flex flexDirection='column' gap='1rem'>
                    <HStack flexDir={'row'} marginRight='auto'>
                        <Text fontWeight='500'>
                            {taskInfo.interests}
                        </Text>
                        <Text fontWeight='200'>
                            - {userName}
                        </Text>
                    </HStack>
                    
                    <Flex flexDirection='row'>
                        <Link marginRight='20px' href={`/profile/${userName}`}>
                            <Avatar _hover={{borderColor:'ActiveBorder'}} borderWidth='1px' size='lg' name={displayName} src={avatarURL} />
                        </Link>
                        <Box overflowY='hidden' maxHeight='300px' minHeight='100px'>
                            <Heading fontSize='1rem'>
                                {taskInfo.name}
                            </Heading>  
                            <Text>
                                {taskInfo.description}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Stack>
            <Stack position='absolute' right='4' width='150px' flexWrap='wrap' flexDirection='row' justifyItems='end'>
                
                <Tooltip fontSize='12px' hasArrow label={`${totalProgress}/${requirement}`} position='relative'>
                    <Box position='relative' width='inherit'>
                        <Progress size='lg' borderRadius='full' width='inherit' value={percentProgress > 0 ? percentProgress : 1} backgroundColor={useColorModeValue('gray.200','gray.600')} colorScheme={totalProgress >= requirement ? 'green' : 'orange'}/>
                        <Text textAlign='end' fontSize='14px' fontWeight='400'>
                            {((totalProgress/requirement) * 100).toFixed(2)}%
                        </Text>
                    </Box>
                    
                </Tooltip>
            </Stack>
            </Stack>
            {isCollaborative && <Flex width='100%'>
                <AvatarGroup size='sm' max={3} spacing='-5px'>
                    {collaborators.map((collaborator: any)=>{
                        return <Avatar _hover={{borderColor:'ActiveBorder'}} borderWidth='1px' borderColor='-moz-initial' cursor='pointer' key={collaborator.userName} onClick={()=>navigate(`/profile/${collaborator.userName}`)} name={collaborator.displayName} src={collaborator.avatarURL} />
                    })}
                    <Tooltip fontSize='12px' hasArrow label='Click to contribute to this task!'>
                        <Avatar size='sm' src='' backgroundColor="green.400" icon={<AddIcon />} onClick={handleCollaborate} _hover={{borderColor:'ActiveBorder'}} borderWidth='1px' borderColor='-moz-initial' cursor='pointer'/>
                    </Tooltip>
                </AvatarGroup>                
            </Flex>}
            <Divider color='gray.300' paddingY='10px'/>
            <HStack flexDirection='row' >
                <ButtonGroup paddingY='10px' columnGap='20px' variant='ghost' size='md' >
                    <Button colorScheme={isLiked ? 'green' : 'gray'} leftIcon={<FaThumbsUp />} onClick={handleLike}>{likes}</Button>
                    <Tooltip label='Comment feature coming soon'>
                        <Button colorScheme='blue' leftIcon={<ChatIcon />}>{taskInfo.comments}</Button>
                    </Tooltip>
                </ButtonGroup>
                <Spacer/>
                <Tooltip label='Import'>
                <Button _hover={{color: useColorModeValue('green.400','green.200')}} onClick={handleImport} aria-label='import_task' variant={'ghost'} leftIcon={<GiSaveArrow size='20px'/>}>
                    
                </Button></Tooltip>
                <Tooltip label='Donate a tac'>
                <Button _hover={{color: useColorModeValue('green.400','green.200')}} onClick={handleTac} aria-label='tac donation' variant={'ghost'} leftIcon={<FaThumbtack size='20px'/>}>
                    
                </Button></Tooltip>
                {/**
                 <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton rightIcon={<SlOptions />} isActive={isOpen} variant='ghost' colorScheme='gray' aria-label='Settings Icon' as={Button}/>
                    <MenuList>
                        <MenuItem icon={<TbTableImport/>}>Import</MenuItem>
                    </MenuList>
                    </>)}
                </Menu>

                 */}
                
            </HStack>
            <Text textColor={useColorModeValue('gray.600','gray.300')} fontSize='12px'>{created_at.toLocaleString(undefined, {
                month: "short", day: "numeric", year: '2-digit'
            })}</Text>
                
                
        </Card>
    }

    function SocialFeed() {

        const [filter, setFilter] = useState<string>('For you')
        
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
                            <Badge padding='5px'>{filter}</Badge>
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<RxAvatar/>} onClick={()=>setFilter('For you')}>For you</MenuItem>
                            <MenuItem icon={<StarIcon/>} onClick={()=>setFilter('New')}>New</MenuItem>
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
                async function fetchPosts() {
                    if (!user) {
                        return
                    }
                    let fetchedPosts = await _getAllPostInfo(offset, user?.['id'])
                    if (filter == 'New') {
                        fetchedPosts.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
                    }
                    setPosts(fetchedPosts)
                    setPostsLoaded(true)
                }
                fetchPosts()
            },[])

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
                if (!user) {
                    return
                }
                const morePosts = await _getAllPostInfo(offset + 10, user?.['id'])
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
            return <Card height='min-content' width='100%' alignItems='center'>
            <CardBody paddingTop='10px'>
                <Text fontWeight='600' paddingBottom='10px'>Task Analytics</Text>
                <Divider/>
                <Stack flexDirection={['row','column']} flexWrap='wrap' columnGap='10px'>
                    <Stat >
                        <StatLabel fontSize='10px'  fontWeight='400'>Total Tasks</StatLabel>
                        <StatNumber>{tasksInfo.length}/15</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel fontSize='10px'  fontWeight='400'>Completed Tasks</StatLabel>
                        <StatNumber color={useColorModeValue('green.500','green.300')}>{(tasksInfo.filter((it_task: any)=>it_task.progress >= it_task.requirement)).length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel fontSize='10px'  fontWeight='400'>Posted Tasks</StatLabel>
                        <StatNumber color={useColorModeValue('purple.500','purple.300')}>{postLength}/5</StatNumber>
                    </Stat>
                </Stack>
            </CardBody>
        </Card>
        }
        function ListView() {

            function TaskModule({taskInfo}: any) {
                const { isOpen, onOpen, onClose } = useDisclosure()
                const hasPosted = (taskInfo.hasPosted ? true : false)
                const isOwner = (taskInfo.isOwner ? true : false)

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
                        if (!profile) {
                            toast({
                                title: "Sorry!",
                                description: 'Unable to find your profile',
                                status: 'warning',
                                duration: 9000,
                                isClosable: true,
                            })
                            return
                        }
                        if (profile?.['points'] < 1) {
                            toast({
                                title: "Sorry!",
                                description: 'You do not have the funds to perform this action',
                                status: 'warning',
                                duration: 9000,
                                isClosable: true,
                            })
                            return
                        }

                        removePoints(user?.['id'], 1)

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
                            <ModalBody>
                                <HStack marginX='auto' justifyContent='center' flexDirection='row'>

                                
                                    <Text fontSize='20px'>
                                        Costs
                                    </Text>
                                    <Badge variant='solid' colorScheme="red" padding='10px'>
                                        <HStack >
                                            <Text>
                                                -1
                                            </Text>
                                            <FaThumbtack/>
                                        </HStack>
                                        
                                    </Badge>
                                    
                                </HStack>
                            </ModalBody>
                    
                            <ModalFooter>
                                
                                <Button type='submit' colorScheme='blue' mr={3} onClick={handlePost}>Post</Button>
                                <Button variant='outline' onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )
                }

                return <HStack borderRadius='5' backgroundColor={hasPosted ? useColorModeValue('purple.100','purple.300') : useColorModeValue('orange.100','orange.300')} flexDirection='row' alignItems='center'>
                    <Text marginStart='20px' fontSize='12px' fontWeight='400' noOfLines={1} maxWidth='100px'>
                        {taskInfo.name}
                    </Text>
                    
                    <Spacer/>
                    <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton rightIcon={<SlOptionsVertical />} isActive={isOpen} variant='unstyled' colorScheme='gray' as={Button}/>
                        <MenuList>                            
                            {(!hasPosted && isOwner) && <MenuItem onClick={onOpen} icon={<SlShareAlt/>}>Post<PostModal/></MenuItem>}
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
        
            return <Card padding='3px' width='100%'>
                <CardHeader textAlign='center' fontSize='14px' fontWeight='500'>
                    Task List
                </CardHeader>
                {tasksInfo.length > 0 && loading() ? 
                <SimpleGrid paddingX='3px' paddingBottom='10px' columns={1} gap='3px' width='inherit' maxHeight='200px' overflowY='scroll'>
                    {tasksInfo.map((taskInfo: any, id:number)=>{
                        return <TaskModule key={id} taskInfo={taskInfo}/>
                        
                    })}
                </SimpleGrid>: 
                <Text paddingBottom='10px' textAlign='center' fontSize='10px'>Your task list is empty!</Text>
                }
                
                <Button variant='solid' onClick={()=>navigate('/dashboard')} size='sm'>Dashboard</Button>
            </Card>
            
        }
        //the tasks dashboard should be accessed through a hamburger when the screen is minimized
        return <Flex position='static'  pos='relative' rowGap='20px' maxWidth={['full','180px']} width='100%'>
            <Flex flexDirection={'column'} width='100%'>
                <Analytics/>
                <Stack paddingTop={['0px','20px']} position='sticky' flexWrap='wrap' top={16} height='min'>
                    <ListView/>
                </Stack>
            </Flex>
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