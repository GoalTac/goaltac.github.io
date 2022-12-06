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
  useToast 
} from '@chakra-ui/react';
import { useState } from 'react'
import supabase from '../supabase'

export default function AddTask() {
  //Database
  const {isOpen, onOpen, onClose} = useDisclosure() //For the modal's open/close
  

  //Page
  const [task, setTask] = useState({title: "", text: ""})
  const {title, text} = task
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function saveTask(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
        .from('todos') //Table name
        .insert([
            {title, text} //Columns
        ])
        console.log(task)
      
    
    //Finishing tasks
    setLoading(false);
    setTask({title: "", text: ""})

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
              <VStack p='25px'>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type='text' 
                    value={title}
                    onChange={e => setTask({...task, title: e.target.value})}
                />
                <FormHelperText>Choose a title that's fun and concise!</FormHelperText>
              </FormControl>
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
