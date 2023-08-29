import { AddIcon, ChevronDownIcon, InfoOutlineIcon, UpDownIcon } from "@chakra-ui/icons"
import { useDisclosure,Icon, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Box, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SliderMark, Text, Menu, MenuButton, MenuItem, MenuList, RadioGroup, Radio, useRadio, useRadioGroup, HStack, FormHelperText, FormControl, Flex, VStack, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, InputRightElement, Spinner, Switch, Badge } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { _getUserTasks } from "./TaskAPI"
import { useSession } from "../../hooks/SessionProvider"
import { RiInformationFill } from "react-icons/ri"

export default function TaskDrawer() {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState<any>()
    const [description, setDescription] = useState<any>()
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()
    const [type, setType] = useState<any>('Boolean')
    const requirement = useRef<any>(1)
    const [reward, setReward] = useState<any>(1)
    const { user: user } = useSession();
    const [tasks, setTasks] = useState<any>([])
    const uuid = user ? user?.['id'] : ''
    
    React.useEffect(()=>{
        async function fetchTasks() {
            const collectedTasks = await Promise.all(await _getUserTasks(uuid))

            setTasks(collectedTasks)
            console.log(collectedTasks)
            return collectedTasks
        }
        fetchTasks()
    },[])

    const firstField = React.useRef(null)
    

    function TypeSelect() {
        function RadioCard(props: any) {
            const { getInputProps, getRadioProps } = useRadio(props)

            const input = getInputProps()
            const checkbox = getRadioProps()

            return(<Flex as='label' width='200px' overflow='hidden'>
                <input {...input} />
                
                <Flex {...checkbox} flexDirection='column' width='100%'
                    onClick={()=>setType(input.value)}
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
            {value:'Numbers', desc: 'Track progress'},
            {value:'Boolean', desc: 'Set as complete'},
            {value:'Tasks', desc: 'Complete tasks'}]
        const { getRootProps, getRadioProps } = useRadioGroup({
            name: 'Type',
            defaultValue: 'boolean',
            onChange: setType,
          })
        const group = getRootProps()
        
        return <HStack marginY='20px' {...group}>
            {options.map((option) => {
                const value=option.value
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
        </HStack>
    }

    function TypeDisplay() {
        function NumberTypeDisplay() {
            return (
                <InputGroup size='lg'>
                    <InputLeftAddon children='Target'/>
                    <NumberInput defaultValue={1} min={1} onChange={(e)=>{
                        requirement.current = e }}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </InputGroup>
                
            )
        }

        function BooleanTypeDisplay() {
            requirement.current = 1;
            const [value, setValue] = useState(true)
            return (
                <Flex columnGap={'20px'} alignItems='center'>
                    <Badge variant={value==false ? 'subtle' : 'outline'} colorScheme={value==false ? 'unset' : 'red'}>Incomplete</Badge>
                    <Switch size='lg' isReadOnly onChange={()=>{
                        setValue(!value)
                    }}/>
                    <Badge variant={value==true ? 'subtle' : 'outline'} colorScheme={value==true ? 'unset' : 'green'}>Complete</Badge>
                </Flex>
            )
        }

        /**
         * Displays add task button with all available tasks
         * @returns 
         */
        function TasksTypeDisplay() {

            function TaskListing() {
                return tasks ? <Box>
                    {tasks.map((task: any, id: any)=>{
                        return <Flex key={id} justifyContent={'center'}>
                            {task}
                        </Flex> //need to click to add
                    })}
                </Box> : <Box>
                    <Icon as={InfoOutlineIcon}/>
                    <Text>
                        You don't have any tasks
                    </Text>
                    
                </Box>
            }


            return (
                <Box>
                    {/* Display selected tasks */}
                    {/* Display all tasks */}
                    {/* Click tasks to add to selected task */}
                    {/* Click selected task to add to tasks */}

                    {(tasks === null ? <Spinner/> : <TaskListing/>)}
                </Box>
            )
        }

        function RenderSwitch() {
            switch(type) {
                case 'Numbers':
                    return <NumberTypeDisplay/>;
                case 'Tasks':
                    return <TasksTypeDisplay/>;
                default:
                    return <BooleanTypeDisplay/>
            }
        }

        return <RenderSwitch/>
    }
    
    return (
        <>
        <Button leftIcon={<AddIcon/>} colorScheme='teal' onClick={onOpen}>
            Task
        </Button>
        <Drawer isOpen={isOpen} size='md'
            placement='right'
            onClose={onClose}
            initialFocusRef={firstField}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                Create a new task
            </DrawerHeader>

            <DrawerBody marginTop='20px'>
                <Stack spacing='24px'>
                <Box>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input ref={firstField} id='title' value={title} isRequired
                        onChange={e=>{setTitle(e.target.value)}}
                        placeholder='Please enter a name for your task'/>
                </Box>

                <Box>
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Textarea id='description' value={description}
                        onChange={e=>{setDescription(e.target.value)}}
                        placeholder='Describe your task. What should you do?'/>
                </Box>

                <FormControl>
                    <FormLabel htmlFor='type'>Task type</FormLabel>
                    <FormHelperText>How do you want to measure the result?</FormHelperText>

                    <TypeSelect/>
                    <Flex flexDir={'column'} marginY='40px' height='100px'>
                        <Box marginX='auto'>
                            <TypeDisplay/>
                        </Box>
                    </Flex>
                    
                    

                </FormControl>

                <Box>
                    <FormLabel htmlFor='duration'>Duration</FormLabel>

                    <Flex flexDirection={'column'}>
                        <Flex flexDir={'row'}>
                            <FormLabel htmlFor='start'>Start</FormLabel>
                        <Input placeholder="Select Date and Time"
                            size="md" onChange={(e)=>setStartDate(e.target.value)}
                            type="datetime-local" />
                        </Flex>
                        <Flex flexDirection='row'>
                            <FormLabel htmlFor='end'>End</FormLabel>
                        <Input placeholder="Select Date and Time"
                            size="md" onChange={(e)=>setEndDate(e.target.value)}
                            type="datetime-local" />
                        </Flex>
                        
                        
                        
                    </Flex>
                </Box>
                <Box>
                    <FormLabel htmlFor='reward'>Points rewarded: {reward}</FormLabel>
                    
                    <Slider size='lg' id='reward' defaultValue={1} min={1} max={5} step={1} onChange={value=>{setReward(value)}}>
                        <SliderTrack bg='red.100'>
                            <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                            <Text fontSize='15' fontWeight='300' color='red'>{reward}</Text>
                        </SliderThumb>
                    </Slider>    
                </Box>

                
                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Submit</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    )
}