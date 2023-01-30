// VIEW MODE

import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import DeleteTask from '../../Tasks/DeleteTask';
import EditTask from '../../Tasks/EditTask';
import DueDate from './../TaskParts/DueDate';
import Title from './Title';

// To allow for swap between edit mode and view

const TaskModal = function ({ props }) {
  console.log(props);
  return (
    //No way I forgot the return this whole time
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={props.size}>
      <ModalOverlay />

      <ModalContent borderColor={props.difficultyBorder} borderWidth='3px'>
        <ModalCloseButton />

        {/* Title, Difficulty */}
        <HStack mt='1em'>
          <Title title={props.task.title} diff={props.task.difficulty} />

          <DueDate date={props.task.end_date} month={props.month} size='3xl' />
        </HStack>

        <ModalBody></ModalBody>

        <ModalFooter>
          {/* <ConfirmEdits id={task.id} /> */}
          &nbsp;
          <EditTask id={props.task.id} toggleEdit={props.toggleEdit} />
          &nbsp;
          <DeleteTask id={props.task.id} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
