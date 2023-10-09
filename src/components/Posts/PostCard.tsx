import { AddIcon, ChatIcon } from "@chakra-ui/icons"
import { useColorModeValue, Link, Text, Card, Stack, Flex, HStack, Avatar, Heading, Tooltip, Progress, AvatarGroup, Divider, ButtonGroup, Button, Spacer, useToast, Box, Spinner, Icon } from "@chakra-ui/react"
import React, { Suspense, useRef, useState } from "react"
import { FaThumbsUp, FaThumbtack } from "react-icons/fa"
import { GiSaveArrow } from "react-icons/gi"
import { supabase } from "../../supabase"
import { decrement, increment, _addUserTask, _importTaskFromUser, addPoints, removePoints } from "../Tasks/TaskAPI"
import { useSession } from "../../hooks/SessionProvider"
import { useNavigate } from "react-router"

export default function PostCard({taskInfo, user, profile}: any) {
    const toast = useToast()
    const navigate = useNavigate()

    const isCollaborative : boolean = taskInfo.isCollaborative ? true : false
    const collaborators = taskInfo.collaborators ? taskInfo.collaborators : null

    const created_at : Date = new Date(taskInfo.created_at)
    const progress: number = taskInfo.progress
    const totalProgress: number = taskInfo.all_progress ? taskInfo.all_progress : progress
    const [commentCount, setCommentCount] = useState<number>(taskInfo.comments ? taskInfo.comments : 0)
    const requirement: number = taskInfo.requirement
    const userName: string = taskInfo.userName
    const avatarURL: string = taskInfo.avatarURL
    const displayName: string = taskInfo.displayName
    const [likes, setLikes] = useState<number>(taskInfo.likes)
    const [imports, setImports] = useState<number>(taskInfo.imports)
    const poster_uuid: string = taskInfo.user_id
    const [showComments, setShowComments] = useState<boolean>(false)
    const percentProgress: number = ((totalProgress/requirement) * 100)
    const post_uuid: string = taskInfo.post_id
    const [cachedTacs, setCachedTacs] = useState<number>(0) //for display
    let tacCount = useRef(0)
    const cachedTimeout: any = useRef(null)

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
        if (poster_uuid == user_uuid) {
            toast({
                title: "Warning",
                description: 'Cannot like your own post',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return
        }

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
        setCachedTacs(cachedTacs+1)
        tacCount.current = tacCount.current + 1
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
        if (!profile) {
            toast({
                title: "Warning",
                description: 'Unable to find your profile',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        }
        if (profile?.['points'] < tacCount) {
            toast({
                title: "Warning",
                description: 'You do not have enough tacs for this action',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        }

        if (cachedTimeout) {
            clearTimeout(cachedTimeout.current)
        }
        console.log(tacCount)
        
        cachedTimeout.current = setTimeout(function() {
            addPoints(poster_uuid, tacCount.current)
            removePoints(user?.['id'], tacCount.current)
            toast({
                title: `Sent ${tacCount.current} tacs to ${displayName}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setCachedTacs(0)
            tacCount.current = 0
        }, 2000)
        

    }

    const handleCommentCount = (count: number) => {
        setCommentCount(count)
    }

    const Comments = React.lazy(()=>import('./PostComments'))    

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
                <Button colorScheme='blue' leftIcon={<ChatIcon />} onClick={()=>setShowComments(!showComments)}>{commentCount}</Button>
            </ButtonGroup>
            <Spacer/>
            <Tooltip label='Import'>
            <Button onClick={handleImport} color={useColorModeValue('green.400','green.200')} aria-label='import_task' variant={'ghost'} leftIcon={<GiSaveArrow size='20px'/>}>
                {imports}
            </Button></Tooltip>
            <Tooltip label='Donate a tac'>
            <Button width='60px' color={useColorModeValue('red.500','red.200')} onClick={handleTac} aria-label='tac donation' variant={'ghost'} leftIcon={<FaThumbtack/>}>
                {cachedTacs > 0 ? ` ${cachedTacs}` : ' +'}
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
            
        {showComments && user.id && taskInfo.post_id && <div>
        <Suspense fallback={<></>}>
            <Comments post_uuid={taskInfo.post_id} user_uuid={user.id} commentCount={handleCommentCount}/>
        </Suspense></div>}
    </Card>
}