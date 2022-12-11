import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  VStack,
  Button, 
  useDisclosure, 
  useToast, 
  HStack,
  RadioGroup,
  Radio,
  Text
} from '@chakra-ui/react';
import { useState } from 'react'
import supabase from '../supabase'

export default function AddTask() {
  //Database
  const {isOpen, onOpen, onClose} = useDisclosure() //For the modal's open/close
  

  //Page
  const [task, setTask] = useState({title: "", text: "", end_date: "9999-12-31", difficulty: '0'})
  const {title, text, end_date, difficulty} = task
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function saveTask(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
        .from('todos') //Table name
        .insert([
            {title, text, end_date, difficulty} //Columns
        ])
        console.log(task)
      
    
    //Finishing tasks
    setLoading(false);
    setTask({title: "", text: "", end_date: "9999-12-31"})

    toast({
      title: error || 'task added',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    })

    onClose();
  }

  return (
    <>
        <Button onClick={onOpen} colorScheme='blue' p='10px'>Add Task</Button>

        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay>
            <ModalContent>
              <ModalHeader>This is where something goes</ModalHeader>
              <ModalBody>
              <VStack 
              as='form'
              p='25px'>
                {/* Title */}
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type='text' 
                    value={title}
                    onChange={e => setTask({...task, title: e.target.value})}
                />
                <FormHelperText>Choose a title that's fun and concise!</FormHelperText>
              </FormControl>

              {/* Difficulty */}
              <VStack>
                <Text >Difficulty</Text>
                <RadioGroup onChange={e => (setTask({...task, difficulty: e}))} value={difficulty}>
                  <HStack>
                    <Radio value='0' colorScheme='green'>Easy</Radio>
                    <Radio value='1' colorScheme='yellow'>Standard</Radio>
                    <Radio value='2' colorScheme='red'>Difficult</Radio>
                  </HStack>
                </RadioGroup>
              </VStack>

              {/* End Date */}
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type='datetime'
                onChange={ e => setTask({...task, end_date: e.target.value})}
                placeholder='yyyy-mm-dd'
                required={true}
                />
              </FormControl>

              {/* Details */}
              <FormControl>
                <FormLabel>Task Details</FormLabel>
                <Input type='text' 
                    value={text}
                    onChange={e => setTask({...task, text: e.target.value})}
                />
                <FormHelperText>Explain your task in as little (or as much ;-) ) detail as you need!</FormHelperText>
              </FormControl>
              <Button colorScheme='blue' onClick={saveTask}>Add</Button>
              </VStack>
              </ModalBody>
              <ModalCloseButton />
          </ModalContent>
          </ModalOverlay>
        </Modal>
    </>
  );
}
