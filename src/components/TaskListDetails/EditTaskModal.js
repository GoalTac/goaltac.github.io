import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';

import Title from './TaskParts/Title';
import DeleteTask from '../Tasks/DeleteTask';
import EditTask from '../Tasks/EditTask';
import DueDate from './TaskParts/DueDate';

const EditTaskModal = function ({ props }) {
  //Sets edit mode back to false so that view mode shows for other tasks
  const newClose = () => {
    props.toggleEdit();
    props.onClose();
    console.log('closed');
  };
  return (
    <Modal isOpen={props.isOpen} onClose={newClose} size={props.size}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <HStack mt='1em'>
          <Title title={props.task.title} diff={props.task.difficulty} />
        </HStack>

        <ModalBody></ModalBody>

        <ModalFooter>
          &nbsp;
          <DeleteTask id={props.task.id} />
          &nbsp;
          <Button colorScheme='blue' mr={3} onClick={newClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
