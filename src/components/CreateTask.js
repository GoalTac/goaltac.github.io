import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,

  } from '@chakra-ui/react'

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
  }

  /*export default function InitialFocus() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
    return (
      <>
        <button onClick={onOpen}>Open Modal</button>
        <button ml={4} ref={finalRef}>
          I'll receive focus on close
        </button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalClosebutton />
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
  }*/