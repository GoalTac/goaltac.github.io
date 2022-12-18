// Needs to display: Title, Difficulty (subtle representation), End Date, and Details

import { 
    Button,
    Box, 
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
    StackDivider
} from "@chakra-ui/react";
import DeleteTask from "../DeleteTask";




export default function TaskItem(props){
    const {isOpen, onOpen, onClose} = useDisclosure() //Modal Stuff
    const endDate = new Date(props.end_date)
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    // console.log(endDate)
    // console.log(props.lor)
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

    return(
        <>
        <Button justifyContent='center' onClick={onOpen} p='30px'>
            <Heading color={difficultyBorder(props.difficulty)}>{props.title}</Heading>
        </Button>
        
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

          {/* Title */}
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* End Date */}
            <HStack divider={<StackDivider borderColor='gray.400' />}>
                    <Text fontSize='xl'>End: {month[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}</Text>
            </HStack>

            {/* Task  */}
            <Text>{props.text}</Text>
          </ModalBody>

          <ModalFooter>
            <DeleteTask id={props.id} />
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}
