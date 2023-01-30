import {
  Button,
  HStack,
  Input,
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
import ConfirmEdits from '../Tasks/ConfirmEdits';
import { useState } from 'react';

const EditTaskModal = function ({ props }) {
  //Sets edit mode back to false so that view mode shows for other tasks
  const newClose = () => {
    //Self made toggle via TaskItem.js
    props.toggleEdit();
    // useDisclosure via TaskItem.js
    props.onClose();
  };

  const [task, setTask] = useState(props.task);

  return (
    <Modal isOpen={props.isOpen} onClose={newClose} size={props.size}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <HStack mt='1em'>
          <Input
            type='text'
            value={task.title}
            onChange={e => setTask({ ...task, title: e.target.value })}
          />
        </HStack>

        <ModalBody></ModalBody>

        <ModalFooter>
          <ConfirmEdits confirm={() => console.log('Nice.')} />
          &nbsp;
          <DeleteTask id={props.task.id} />
          &nbsp;
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
