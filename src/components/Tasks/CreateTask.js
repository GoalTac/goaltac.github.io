import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    Input,
    FormControl,
    Button,
    HStack,
    useToast,
    Radio
  } from '@chakra-ui/react'
  import React from 'react'
  import { useState, FormGroup } from 'react';
  import supabase from '../../supabase';


  /*
  export default function(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <button onClick={onOpen}>Open Modal</button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent >
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            
  
            
          </ModalContent>
        </Modal>
      </>
    )
  }*/

  export default function CreateTask() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
      const { data, error } = await supabase.from('todos').insert([{ text }]);
      setLoading(false);
      setText('')
  
      toast({
        title: error || 'task added',
        position: 'top',
        status: error ? 'error' : 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  
    return (
      <>
      <HStack my="4" h="45">
        <Button 
          onClick={onOpen} 
          colorScheme="green" 
          px="10"
          h="100%" 
          type="submit" 
          isLoading={loading} 
          loadingText="Adding...">
          Create Task
        </Button>
      </HStack>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Your Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder='Do the laundry' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input placeholder='Set it on normal spin speed' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <HStack my="4" h="45">
                <button 
                  onClick={handleSubmit} 
                  colorScheme="blue"
                  px="10"
                  type="submit"
                  isLoading={loading}
                  loadingText="Saving...">
                  Add Task
                </button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }