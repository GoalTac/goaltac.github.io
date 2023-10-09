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
import PostCard from "../components/Posts/PostCard";

export default function Homepage() {
    
    const { user: user, profile: profile } = useSession();
    const  useSupabase: any  = useSupabaseClient();
    const navigate = useNavigate()
    const toast = useToast()
    const [tasksLoaded, setTasksLoaded] = useState<Boolean>(false)
    const [postsLoaded, setPostsLoaded] = useState<Boolean>(false)
    const loading = () => {return tasksLoaded && postsLoaded}


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

            const displayPosts = () => {
                const displayedPosts = posts
                if (filter == 'New') {
                    displayedPosts.sort((a: any, b: any) => a.created_at > b.created_at ? -1 : 1)
                }
                return displayedPosts
            }

            useEffect(()=>{
                async function fetchPosts() {
                    if (!user) {
                        return
                    }
                    let fetchedPosts = await _getAllPostInfo(offset, user?.['id'])
                    setPosts(fetchedPosts)
                    setPostsLoaded(true)
                }
                fetchPosts()
            },[])

            //PUT PROFILE INFO IN THE POST VARIABLE
            return <SimpleGrid columns={1} spacing='20px'>
                {posts.length>0 && loading() ? 
                displayPosts().map((post: any, id: number)=>{
                    return <PostCard key={id} taskInfo={post} user={user} profile={profile}/>
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

    return <Stack marginX='auto'
    paddingBottom='100px'
    flexWrap='wrap-reverse'
    maxWidth='1200px'
    columnGap={measurements.general.colGap}
    flexDirection={['column-reverse','row']}
    alignItems={['center','unset']}
    justifyContent='center'>
        <SocialFeed/>
    </Stack>
}