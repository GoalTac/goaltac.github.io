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
  } from '@chakra-ui/react'
  import React from 'react'
  import { useState } from 'react';


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

  export default function() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false);

  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue" px="20" h="100%" type="submit" isLoading={loading} loadingText="Adding...">
          Add</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input ref={initialRef} placeholder='First name' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder='Last name' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <button colorScheme='blue' mr={3}>
                Save
              </button>
              <button onClick={onClose}>Cancel</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }