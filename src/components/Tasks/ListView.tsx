import { Avatar, AvatarGroup, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, FormControl, FormHelperText, Grid, GridItem, HStack, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Progress, Spacer, Stack, Switch, Text, Textarea, Tooltip, VStack, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSession, useSupabaseClient } from "../../hooks/SessionProvider";
import React from "react";
import { supabase } from "../../supabase";
import { now } from "lodash";
import { start } from "repl";
import { CalendarIcon, CheckCircleIcon, InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FaHourglass, FaHourglassHalf, FaHourglassStart } from "react-icons/fa";
import { Task, _addPost, _addProgress, _deleteProgress, _setProgress, _setTask } from "./TaskAPI";
import TaskDrawer from "./TaskDrawer";
import { useNavigate } from "react-router-dom";

export default function ListView({tasks}: Task[] | any, {relations}: any) {
    const {profile: profile, user: user} = useSession()
    const  useSupabase: any  = useSupabaseClient();
    const navigate  = useNavigate();


    function Card_Module({task}: Task | any) {
        const isOwner = task.isOwner == true ? true : false
        const isCollaborative = task.isCollaborative ? task.isCollaborative : false
        const collaborators = task.collaborators ? task.collaborators : null
        let name = task.name ? task.name : 'Untitled'
        const created_at = task.created_at ? task.created_at : null
        const start_date = task.start_date ? new Date(task.start_date) : created_at
        const end_date = task.end_date ? new Date(task.end_date) : null
        let description = task.description ? task.description : 'A start to a great adventure'
        const requirement = task.requirement ? task.requirement : 1
        const difficulty = task.difficulty ? task.difficulty : 1
        const type = task.type ? task.type : 'Boolean'
        const reoccurence = task.reoccurence ? task.reoccurence : 0
        const [avatar, setAvatar] = useState<any>(task.avatarURL)

        const [progress, setProgress ] = useState<number>(task.progress) //how much progress the user has made
        const totalProgress = task.all_progress ? task.all_progress-task.progress : 0 //how much progress has been made on the task total
        const { isOpen: infoIsOpen, onOpen: infoOnOpen, onClose: infoOnClose } = useDisclosure()
        const totalPercentProgress: number = (((totalProgress+progress)/requirement) * 100)
        
        const cachedTimeout: any = useRef(null)
        const handleFieldSave = () => {
            if (cachedTimeout) {
                clearTimeout(cachedTimeout.current)
            }
            
            cachedTimeout.current = setTimeout(function() {
                const newTask = {
                    name: name,
                    description: description
                }
                
                const createdTask = _setTask(task.task_id, newTask).finally(()=>{
                    toast({
                        title: "Success",
                        description: 'Successfully saved!',
                        colorScheme:'green',
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    }) 
                })
            }, 2000)
            
        }
        const colorTheme = {
            inComplete: {
                dark: 'red.600',
                light: 'red.200'
            },
            inProgress: {
                dark: 'yellow.600',
                light: 'orange.200'
            },
            complete: {
                dark: 'green.500',
                light: 'green.200'
            }
        }
        const pickedColor = ((totalProgress + progress) >= requirement ? useColorModeValue('green.200','green.500') : (totalProgress + progress) > 0 ? useColorModeValue('orange.200','yellow.600') : useColorModeValue(colorTheme.inComplete.light,colorTheme.inComplete.dark))

        function nextDueDate(frequency: number, startDate: Date, endDate: Date | null) {
            const today = new Date()

            if (frequency == 0) {
                return null //that means it is just a task with no deadline
            }
            

            if (today < startDate) {
                return startDate
            }

            //anything after means today is start date up to end date
            //frequency > 0
            //today >= startDate
            //today < endDate

            let nextDate: Date = startDate;
            nextDate.setDate(startDate.getDate() + frequency);
            
            if (endDate == null || nextDate < endDate) {
                return nextDate
            } else {
                return endDate
            }
            
        }
        
        //what icon to show in the task
        const TimeIndicator = () => {
            //TODO button hover reveal more time details
            //TODO on button click, change time
            const nextDate = nextDueDate(reoccurence, start_date, end_date)
            return <Flex justifyContent='right' alignItems='center' columnGap='4px' fontSize='10px'><CalendarIcon/>{nextDate ? nextDate.toLocaleString(undefined, {
                month: "short", day: "numeric"
            }) : 'Soon?'}</Flex>
        }
        const ProgressIndicator = () => {
            return <HStack justifyContent='right'>
                <Tooltip fontSize='8px' hasArrow label={`${totalProgress+progress}/${requirement}`}>
                    <Progress size='lg' borderRadius='full' marginLeft='auto' 
                        width='100px' value={totalPercentProgress > 0 ? totalPercentProgress : 1} 
                        backgroundColor={useColorModeValue('gray.200','gray.600')} 
                        colorScheme={(totalProgress+progress) >= requirement ? 'green' : 'yellow'} sx={{
                            "& > div:first-of-type": {
                                transitionProperty: "width",
                            },
                        }}/>
                </Tooltip>
                <Text fontSize='8px' left='4' textColor='gray.700' position='absolute'>{(((totalProgress+progress)/requirement) * 100).toFixed(2)}%</Text>
            </HStack>
        }

        const toast = useToast({colorScheme:'orange', isClosable: true, duration: 2000, variant:'solid', title:'Work in Progress', description: 'An edit module will pop up!'})
        
        function SwitchCompletion() {

            function SubTaskCompletion() {
                return <Box></Box>
            }
        
            function SimpleCompletion() {
                const [newProgress, setNewProgress ] = useState<number>(progress)
                let newValue = progress
                const fieldProgressTime = useRef(Date.now()) //keep track of last time fields have changed

                const fieldSaveTimeout = () => {
                    setTimeout(()=>{
                        const timeElapsed = Date.now() - fieldProgressTime.current
                        if(timeElapsed >= 2000) {
                            setProgress(newValue)
                            _setProgress(task.user_id, task.task_id, newValue)
                            toast({
                                title: "Success",
                                description: 'Successfully saved your progress!',
                                colorScheme:'green',
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            })
                        }
                    }, 2000)
                }
                const handleProgressSave = async() => {
                    fieldProgressTime.current = Date.now()
                    fieldSaveTimeout()
                }
        
                return <Flex onClick={()=>{
                        if (newProgress==0) {
                            setNewProgress(1)
                            newValue = 1
                            handleProgressSave()
                        } else {
                            setNewProgress(0)
                            newValue = 0
                            handleProgressSave()
                        }
                    }} cursor='pointer' borderRadius={8} width='60px' fontSize='8px' height='20px'  backgroundColor={newProgress>0 ? 'green.400' : 'red.400'}>
                        <Text marginX='auto' userSelect='none' alignSelf='center'>{newProgress>0 ? 'Complete': 'Incomplete'}</Text>
                </Flex>
            }
        
            function ProgressCompletion() {
                const [newProgress, setNewProgress ] = useState<number>(progress) //variably changes
                let newValue = progress
                const fieldProgressTime = useRef(Date.now()) //keep track of last time fields have changed

                const fieldSaveTimeout = () => {
                    setTimeout(()=>{
                        const timeElapsed = Date.now() - fieldProgressTime.current
                        if(timeElapsed >= 2000) {
                            setProgress(newValue)
                            _setProgress(task.user_id, task.task_id, newValue)
                            toast({
                                title: "Success",
                                description: 'Successfully saved your progress!',
                                colorScheme:'green',
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            })
                        }
                    }, 2000)
                }
                const handleProgressSave = async() => {
                    fieldProgressTime.current = Date.now()
                    fieldSaveTimeout()
                }

                return <Flex><FormControl textAlign={'center'}>
                    
                    <NumberInput width='100px' size='xs' allowMouseWheel min={0} defaultValue={newProgress} max={requirement-totalProgress} onChange={(value)=>{
                            setNewProgress(Number(value)) 
                            newValue = Number(value)
                            handleProgressSave()
                        }} clampValueOnBlur={false}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl></Flex>
            }
    
            switch(task.type) {
                case 'Progress':
                    return <ProgressCompletion/>;
                case 'Sub-Tasks':
                    return <SubTaskCompletion/>;
                default:
                    return <SimpleCompletion/>
            }
        }

        function InfoModal() {
            return <Modal scrollBehavior='inside' isCentered motionPreset='slideInBottom' closeOnOverlayClick={false} isOpen={infoIsOpen} onClose={infoOnClose}>
                <ModalOverlay />
                <ModalContent backgroundColor={useColorModeValue('gray.50','gray.800')}>
                <ModalHeader>Collaborator Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack flexDirection='column' marginBottom='20px'>
                        <Heading fontSize='16px'>Total Progress</Heading>
                        <HStack fontSize={'12px'}>
                            <Text>{((task.all_progress/requirement) * 100).toFixed(2)}%</Text>
                            <Spacer/>
                            <Text>{task.all_progress}/{requirement}</Text>
                        </HStack>
                        <Progress size='lg' borderRadius='full' marginLeft='auto' width='full' value={totalPercentProgress > 0 ? totalPercentProgress : 1} backgroundColor={useColorModeValue('gray.200','gray.600')} colorScheme={totalPercentProgress >= requirement ? 'green' : 'orange'}/>
                    </Stack>

                    <Stack flexDirection='column' spacing='1rem'>

                    {collaborators.map((collaborator: any, id: number)=>{
                        const percentProgress: number = ((collaborator.progress/requirement) * 100)
                        return <Card padding='10px' key={id}><HStack paddingY='10px'>
                            <VStack>
                               <Avatar cursor='pointer' size='md' borderWidth='0px' key={collaborator.userName} onClick={()=>navigate(`/profile/${collaborator.userName}`)} name={collaborator.displayName} src={collaborator.avatarURL} />
                                <Text>{collaborator.displayName}</Text>
                            </VStack>
                            <Spacer/>
                            <Stack flexDirection='column'>
                                <HStack fontSize={'12px'}>
                                    <Text>{((collaborator.progress/requirement) * 100).toFixed(2)}%</Text>
                                    <Spacer/>
                                    <Text>{collaborator.progress}/{requirement}</Text>
                                </HStack>
                                <Progress size='lg' borderRadius='full' marginLeft='auto' width='200px' value={percentProgress > 0 ? percentProgress : 1} backgroundColor={useColorModeValue('gray.200','gray.600')} colorScheme={progress >= requirement ? 'green' : 'orange'}/>
                            </Stack>
                            
                        </HStack></Card>
                    })}</Stack>
                </ModalBody>
                    
                <ModalFooter>
                    <Button variant='outline' onClick={infoOnClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        }

        return <Card backgroundColor={useColorModeValue('gray.50','gray.700')} margin='20px' overflow='hidden' height='200px' width='280px' size='md' flexDirection={'column'} alignItems={[null,'center']} >
            
            {!isCollaborative ? <TaskDrawer preset={task}>
                <Flex width='prose' height={'30px'} cursor='pointer' backgroundColor={pickedColor}/>
            </TaskDrawer> : 
            
            (isOwner ? <HStack height='30px' cursor='pointer' width='100%' backgroundColor={pickedColor} paddingY='auto'>
                <TaskDrawer preset={task}>
                    <HStack height='30px' width='280px'>                   
                        
                    </HStack>
                </TaskDrawer>
                <AvatarGroup marginStart='2px' height='inherit' size='xs' max={5} spacing='2px' position='absolute'>
                    {collaborators.map((collaborator: any)=>{
                        return <Avatar borderWidth='0px' key={collaborator.userName} onClick={()=>navigate(`/profile/${collaborator.userName}`)} name={collaborator.displayName} src={collaborator.avatarURL} />
                    })}
                </AvatarGroup>
                <Box onClick={infoOnOpen} position='absolute' right='0'>
                    <IconButton variant='unstyled' aria-label='information' icon={<InfoOutlineIcon/>}/>
                    <InfoModal/>
                </Box>
            </HStack> :
            <HStack height='30px' cursor='pointer' width='full' backgroundColor={pickedColor} paddingY='auto'>
                <AvatarGroup marginStart='2px' height='inherit' size='xs' max={5} spacing='2px'>
                    {collaborators.map((collaborator: any)=>{
                        return <Avatar borderWidth='0px' key={collaborator.userName} onClick={()=>navigate(`/profile/${collaborator.userName}`)} name={collaborator.displayName} src={collaborator.avatarURL} />
                    })}
                </AvatarGroup>
                <Spacer/>
                <Box onClick={infoOnOpen}>
                    <IconButton variant='unstyled' aria-label='information' icon={<InfoOutlineIcon/>}/>
                    <InfoModal/>
                </Box>  
            </HStack>)}
            
            <Flex width='100%' flexDirection='column' padding='10px' height='inherit' alignItems={['center','start']}>
                <Flex flexDirection={'column'} height='100%' width='100%'>
                    <HStack>
                        <Input onChange={(e)=>{
                            name = e.currentTarget.value
                            handleFieldSave()
                        }} variant='unstyled' defaultValue={name} overflow='clip' noOfLines={1} maxW='inherit' fontWeight='500' fontSize='1.25rem' alignSelf={['center','start']} height='fit-content'/>
                        <Spacer/>
                        <TimeIndicator/>
                    </HStack>
                    
                    <Stack marginStart='10px' overflowY='auto' alignSelf={['center','start']}>
                    
                        <Textarea onChange={(e)=>{
                            description = e.currentTarget.value
                            handleFieldSave()
                        }} variant='unstyled' size='xs' defaultValue={description} width='200px' fontWeight='500' fontSize='0.75rem' alignSelf={['center','start']} maxH='80px'/>
                        <Spacer/>
                    </Stack>
                </Flex>
                <Flex alignItems='end' width='100%'>
                    <ProgressIndicator/>
                    <Spacer/>
                    <SwitchCompletion/>
                </Flex>
            </Flex>
        </Card>
    }

    function RenderModules() {

        //merge progress from relations into tasks

        return <Stack flexWrap='wrap' width='fit-content' justifyContent='center' flexDirection='row'>
            {tasks.length> 0 ? tasks.map((task: Task, id: number)=> {
                return <Card_Module key={id} task={task}/>
            }) : <Text>You don't appear to have any tasks!</Text>}
        </Stack>
    }
    return <RenderModules/>
}