import { AddIcon, CheckIcon, ChevronDownIcon, InfoOutlineIcon, UpDownIcon } from "@chakra-ui/icons"
import { useDisclosure,Icon, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Box, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SliderMark, Text, Menu, MenuButton, MenuItem, MenuList, RadioGroup, Radio, useRadio, useRadioGroup, HStack, FormHelperText, FormControl, Flex, VStack, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, InputRightElement, Spinner, Switch, Badge, ButtonGroup, useCheckboxGroup, Checkbox, useCheckbox, useToast, Spacer, Tooltip, Divider } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { Task, _addTask, _addUserTask, _getTaskLimit, _getUserTasks, _setTask } from "./TaskAPI"
import { useSession } from "../../hooks/SessionProvider"
import { RiInformationFill } from "react-icons/ri"
import { start } from "repl"
import { ReactElement } from "react-markdown/lib/react-markdown"

/**
 * TODO:
 * 1. Limit user to a certain amount of tasks
 * 2. Require user to follow bell curve model by limiting the max points
 * 
 * @returns Task Drawer component
 */
export default function TaskDrawer({children, preset}: any) {    
    const isEdit = preset?.name ? true : false
    

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState<string>(isEdit ? preset.name : 'New Task')
    const [description, setDescription] = useState<string>(isEdit ? preset.description : '')
    const [startDate, setStartDate] = useState<any>(isEdit ? preset.start_date : null)
    const [endDate, setEndDate] = useState<any>(isEdit ? preset.end_date : null)
    const [type, setType] = useState<any>(isEdit ? preset.type : 'Simple')
    const requirement = useRef(isEdit ? preset.requirement : 1)
    const [difficulty, setDifficulty] = useState<any>(isEdit ? preset.difficulty : 1)
    const user = useSession().user //this rerenders the page tons of times
    const [tasks, setTasks] = useState<any>([])
    const [selectedTasks, setSelectedTasks] = useState<any>([])
    const [reoccurence, setReoccurence] = useState<number>(isEdit ? preset.reoccurence : 1)
    const [isCollaborative, setIsCollaborative] = useState<boolean>(isEdit ? preset.isCollaborative : false)

    const uuid = isEdit ? preset.user_id : (user ? user?.['id'] : '')
    const toast = useToast()

    /*
    //gets rid of 4 re-renders
    React.useEffect(()=>{
        async function fetchTasks() {
            const collectedTasks = await Promise.all(await _getUserTasks(uuid))

            setTasks(collectedTasks)
            return collectedTasks
        }
        
        fetchTasks()
    },[])*/

    const firstField = React.useRef(null)

    const handleSubmit = async() => {

        function clearTasks() {
            setTitle('')
            setDescription('')
            setIsCollaborative(false)

            setStartDate('')
            setEndDate('')
            setType('Simple')
            setDifficulty(1)
            setSelectedTasks([])
            requirement.current = 1
            setReoccurence(0)
        }

        async function checkTitle(): Promise<Boolean> {
            if (user) {
                const taskLimitsData = await _getTaskLimit(user?.['id'])
                const hasEnoughRoom = taskLimitsData.available>0
                if (!hasEnoughRoom) {
                    toast({
                        title: "Error",
                        description: 'Sorry! You do not have enough space',
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                    })
                    return false
                }
            } else {
                toast({
                    title: "Error",
                    description: 'No user detected. Please retry again',
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
                return false
            }
            if (!title) {
                toast({
                    title: "Error",
                    description: 'You need a title for your task!',
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
                return false
            }
            return true
        }
        
        

        if(!(await checkTitle())) return; 

        const newTask = {
            start_date: startDate,
            end_date: endDate,
            name: title,
            description: description,
            requirement: type=='Simple' ? 1 : requirement.current,
            difficulty: difficulty,
            type: type,
            reoccurence: reoccurence,
            isCollaborative: isCollaborative
        }

        const createdTask = await (isEdit ? _setTask(preset.task_id, newTask) : _addTask(newTask)).finally(()=>{
            if (isEdit) {
                toast({
                    title: "Success",
                    description: 'Successfully edited your task!',
                    colorScheme:'green',
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            }
            
            onClose()
            clearTasks()
        })
        
        if (!isEdit && user) {
            toast({
                title: "Success",
                description: 'Successfully created your task!',
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            //Relational data saving
            const taskID = createdTask.uuid

            //Adds user as an owner of the task
            await _addUserTask(user?.['id'], taskID)
        }

       

        //If task is type 'Tasks', create a task_task_relation row

        //if there is an error in creating any of these, delete createdTask and all proceeding variables

        //console.log(createdTask, task_user_relation)
        

        
    } 

    function TypeSelect() {
        function RadioCard(props: any) {
            const { getInputProps, getRadioProps } = useRadio(props)

            const input = getInputProps()
            const checkbox = getRadioProps()

            return(<Flex as='label' width='200px' overflow='hidden'>
                <input {...input} />
                
                <Flex {...checkbox} flexDirection='column' width='100%'
                    onClick={()=>{
                        setType(input.value)
                    }}
                    borderColor={input.value == type ? 'blue.400' : 'border'}
                    borderWidth='1px'
                    cursor='pointer'
                    borderRadius='md'
                    px={5}
                    py={3}>
                    <Flex alignItems={'center'} gap='10px' flexDirection='column'>
                        <Box boxSize='15px' borderWidth='2px' backgroundColor={input.value == type ? 'blue.400' : 'border'} borderRadius='full'/>
                        {props.children}
                    </Flex>
                    
                </Flex>
            </Flex>)
        }

        const options = [
            {value:'Progress', desc: 'Use numbers to make periodic updates'},
            {value:'Simple', desc: 'Check task as done or leave it incomplete'},
            {value:'Sub-Tasks', desc: 'Success dependent on status of tasks'}]
        const { getRootProps, getRadioProps } = useRadioGroup({
            name: 'Type',
            defaultValue: type,
            onChange: setType,
          })
        const group = getRootProps()
        
        return <Stack alignItems='center' flexDirection={['column','row']} marginY='20px' {...group}>
            {options.map((option) => {
                const value = option.value
                const radio = getRadioProps({ value })
                return (
                <RadioCard key={option.value} {...radio}>
                    <Heading fontSize='15px'>
                        {value}
                    </Heading>
                    <Text fontSize='10px'>
                        {option.desc}
                    </Text>
                    
                </RadioCard>)
            })}
        </Stack>
    }

   function NumberTypeDisplay() {

        const [newRequirement, setNewRequirement] = useState(requirement.current)

        const handleChange = (value: any) => {
            setNewRequirement(value)
            requirement.current = value
        }

        return (
            <Stack flexDirection='column' width='200px' marginX='auto'>
                <NumberInput allowMouseWheel defaultValue={newRequirement} value={newRequirement} min={1} onChange={handleChange}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput></Stack>
            
        )
    }

    function BooleanTypeDisplay() {
        const [value, setValue] = useState(false)
        return (
            <Flex columnGap={'20px'} alignItems='center' justifyContent='center'>
                <Badge variant={value==true ? 'subtle' : 'outline'} colorScheme={value==true ? 'unset' : 'red'}>Incomplete</Badge>
                <Switch colorScheme={value == false ? 'red':'green'} size='lg' onChange={()=>{
                    setValue(!value)
                }}/>
                <Badge variant={value==false ? 'subtle' : 'outline'} colorScheme={value==false ? 'unset' : 'green'}>Complete</Badge>
            </Flex>
        )
    }

        /**
         * Displays add task button with all available tasks
         * @returns 
         */
    function TasksTypeDisplay() {

        function TaskButton({task, id}: any) {

            return <Flex width='inherit'>
                <Flex flexDirection='column' width='100%'
                    onClick={()=>{
                        if (selectedTasks.includes(task)) { //remove the task
                            const index = selectedTasks.indexOf(task)
                            let newArray =[...selectedTasks]
                            newArray.splice(index, 1)
                            setSelectedTasks(newArray)
                        } else {
                            let newArray = [...selectedTasks, task]
                            setSelectedTasks(newArray)
                        }
                    }}
                    borderColor={selectedTasks.includes(task) ? 'blue.400' : 'border'}
                    borderWidth='1px'
                    cursor='pointer'
                    borderRadius='md'
                    px={5}
                    py={3}>
                    <Flex alignItems={'center'} gap='10px' flexDirection='row'>
                        <Box boxSize='15px' borderWidth='2px' backgroundColor={selectedTasks.includes(task) ? 'blue.400' : 'border'}/>
                        <Text maxWidth={'200px'} height='20px' flexWrap={'unset'} overflowX={'hidden'}>
                            {task.name}
                        </Text>
                        <Spacer/>
                        <Text maxWidth={'200px'} textColor='gray' height='20px' flexWrap={'unset'} overflowX={'clip'}>
                            {task.description}
                        </Text>
                        
                    </Flex>
                </Flex>
            </Flex> //need to click to add
        }

        function TaskListing() {
            return tasks ? 
                <Box><Badge fontSize='1.25rem' colorScheme="red">This is currently a Work in Progress</Badge>
                <Box height='200px' overflowY='scroll'>
                    <Flex justifyContent='center' flexDirection='column' rowGap='2' width='inherit'>
                    {tasks.map((task: any, id: any)=>{
                        return <TaskButton key={id} task={task} id={id} /> //need to click to add
                    })}
                    </Flex>
                </Box></Box>
                : <Box>
                <Icon as={InfoOutlineIcon}/>
                <Text>
                    You don't have any tasks
                </Text>
                
            </Box>
        }


        return (
            <Box width='inherit' height='inherit'>
                {/* Display selected tasks */}
                {/* Display all tasks */}
                {/* Click tasks to add to selected task */}
                {/* Click selected task to add to tasks */}

                {(tasks === null ? <Spinner/> : <TaskListing/>)}
            </Box>
        )
    }
    
    return (
        <>
        <Box onClick={onOpen}>
            {children ? children : 
            <Button leftIcon={<AddIcon/>} colorScheme='teal' onClick={onOpen}>
                Task
            </Button>}
        </Box>
        
        {/**
         * 'isOpen' says that the drawer is currently open, 
         * onOpen is a function 
         */}
        <Drawer isOpen={isOpen} size='md'
            placement='right'
            onClose={onClose}
            initialFocusRef={firstField}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                {isEdit ? 'Edit your task' : 'Create a new task'}
            </DrawerHeader>

            <DrawerBody marginTop='20px'>
                <Stack spacing='24px'>
                <FormControl isRequired>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input ref={firstField} id='title' value={title} aria-required={true} maxLength={50}
                        onChange={e=>{setTitle(e.target.value)}}
                        errorBorderColor='crimson'
                        isInvalid={title ? false : true}
                        placeholder='A task name is required'/>
                    <Text fontSize='10px' borderRadius='5px' color='gray.400' position='absolute' bottom='0' right='1'>{title.length}/50</Text>

                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Textarea maxLength={200} resize='none' variant='outline' isRequired placeholder='Describe your task. What should you do?'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    <Text fontSize='10px' borderRadius='5px' color='gray.400' position='absolute' bottom='0' right='1'>{description.length}/200</Text>

                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='type'>Task type</FormLabel>
                    <FormHelperText>How do you want to measure the result?</FormHelperText>

                    <TypeSelect/>
                    <Flex flexDir={'column'}  width='100%' minHeight='100px'>
                        <Box width='inherit' height='inherit'>
                            {type=='Progress' ? <NumberTypeDisplay/> : <BooleanTypeDisplay/>}
                        </Box>
                    </Flex>
                </FormControl>
                
                {/*



                
                <FormControl isDisabled>
                    <FormLabel htmlFor='duration'>Duration</FormLabel>

                    <Flex flexDirection={'column'} rowGap='20px'>
                        <Flex flexDir={'row'}>
                            <FormHelperText width='50px' fontSize='14px'>Start</FormHelperText>
                            <Input placeholder="Select Date and Time"
                                size="md" onChange={(e)=>setStartDate(e.target.value)}
                                type="datetime-local" />
                        </Flex>
                        <Flex flexDirection='row'>
                            <FormHelperText width='50px' fontSize='14px'>End</FormHelperText>
                            <Input placeholder="Select Date and Time"
                                size="md" onChange={(e)=>setEndDate(e.target.value)}
                                type="datetime-local" />
                        </Flex>
                        <Flex flexDirection='row' columnGap='20px' rowGap='10px' alignSelf='center'>
                            <Text maxWidth='100px'>
                                Does your task repeat?
                            </Text>
                            <Menu isLazy>
                                <Tooltip label='Coming soon'>
                                    <MenuButton isDisabled width='200px' as={Button} rightIcon={<ChevronDownIcon />} variant='outline'>
                                        {reoccurence}
                                    </MenuButton> 
                                </Tooltip>
                                
                                <MenuList maxHeight='300px' overflowY='scroll'>
                                    <MenuItem onClick={(e)=>setReoccurence(0)} 
                                        value={0}>None</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(1)} 
                                        value={1}>1 day</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(2)} 
                                        value={2}>2 days</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(3)} 
                                        value={3}>3 days</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(4)} 
                                        value={4}>4 days</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(5)} 
                                        value={5}>5 days</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(6)} 
                                        value={6}>6 days</MenuItem>
                                    <MenuItem onClick={(e)=>setReoccurence(7)} 
                                        value={7}>1 week</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                        
                        
                    </Flex>
                </FormControl>
                 */}
                <Divider/>
                <FormControl>
                    <FormLabel htmlFor='difficulty'>Difficulty: {difficulty}</FormLabel>
                    
                    <Slider size='lg' id='difficulty' defaultValue={difficulty} min={1} max={10} step={1} onChange={value=>{setDifficulty(value)}}>
                        <SliderTrack bg='red.100'>
                            <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                            <Text fontSize='15' fontWeight='300' color='red'>{difficulty}</Text>
                        </SliderThumb>
                    </Slider>
                    <HStack>
                        <Text fontSize='12px' textColor='gray.400'>Easy</Text>
                        <Spacer/>
                        <Text fontSize='12px' textColor='gray.400'>Hard</Text>
                    </HStack>
                </FormControl>
                <FormControl paddingTop='20px'>
                    <Flex flexDir='row'>
                        <Flex flexDir='column' maxWidth='200px'>
                            <FormLabel htmlFor='type'>Collaborative?</FormLabel>
                            <FormHelperText>Would you like other people to help? (must be posted)</FormHelperText>
                        </Flex>
                        <Spacer/>
                        <Flex paddingTop='20px' columnGap={'20px'} alignItems='center' justifyContent='center'>
                            <Badge variant={isCollaborative==true ? 'subtle' : 'outline'} colorScheme={isCollaborative==true ? 'unset' : 'green'}>Solo</Badge>
                            <Switch colorScheme={isCollaborative == false ? 'green':'green'} size='lg' onChange={()=>{
                                setIsCollaborative(!isCollaborative)
                            }}/>
                            <Badge variant={isCollaborative==false ? 'subtle' : 'outline'} colorScheme={isCollaborative==false ? 'unset' : 'green'}>Social</Badge>
                        </Flex>
                    </Flex>
                    
                    
                </FormControl>

                

                
                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue' onClick={handleSubmit}>{isEdit ? 'Save' : 'Submit'}</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    )
}