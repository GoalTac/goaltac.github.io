// Needs to display: Title, Difficulty (subtle representation), End Date, and Details

import { 
    Button,
    Box, 
    Checkbox,
    HStack, 
    Modal, 
    ModalBody,
    ModalCloseButton, 
    ModalContent, 
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack, 
    Heading,
    StackDivider,
    Spacer
} from "@chakra-ui/react";
import DeleteTask from "../Tasks/DeleteTask";
import supabase from "../../supabase";
import { useEffect, useState } from "react";



export default function TaskItem(props){

  //ChakraUI
  const {isOpen, onOpen, onClose} = useDisclosure() //Modal Stuff
  
  const task = props.task
  const [done, setDone] = useState(task.completed)
  const endDate = new Date(task.end_date)
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  
  const difficultyBorder = (diff) => {        
      switch(diff){
          case 0:
              return 'green.600';
              break;
          
          case 1:
              return 'yellow.400';
              break;
  
          case 2:
              return 'red.600';
              break;
      }
  
  }

  const setCompleted = async function(){
    const { err } = await supabase.from('todos').update({ completed: done }).eq('id', task.id)
    if (err) console.log(err)
  }

  useEffect(()=>{
    setCompleted()
  }, [done])

  return(
      <HStack>
      <Checkbox size='lg' isChecked={done} onChange={(e)=> {setDone(e.target.checked); setCompleted()}} />
      <Button justifyContent='left' onClick={onOpen} p={props.p} w={props.w} h={props.h} overflow='hidden'>
          <Heading fontSize={props.heading_font_size} color={difficultyBorder(task.difficulty)}>{task.title}</Heading>
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>

        {/* Title */}
        <ModalHeader>{task.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          {/* End Date */}
          <HStack divider={<StackDivider borderColor='gray.400' />}>
                  <Text fontSize='xl'>End: {month[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}</Text>
                    
                    {/* HashTag  */}
              <Text>{task.tag}</Text>
          </HStack>

          {/* Task  */}
          <Text>{task.text}</Text>
        </ModalBody>

        <ModalFooter>
          <DeleteTask id={task.id} />
        </ModalFooter>
      </ModalContent>
    </Modal>
      </HStack>
  )
}
