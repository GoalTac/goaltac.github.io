import {
  Button,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
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
  // console.log(new Date(task.end_date).toISOString().slice(0, 16))

  return (
    <Modal isOpen={props.isOpen} onClose={newClose} size={props.size}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody>
          {/* Title */}
          <HStack mt='2em' maxH='2em' alignContent={'left'}>
            <Heading w='25%' size='xl' ml='1em'>
              Title:
            </Heading>
            <Input
              justifySelf={'left'}
              w='65%' //Account for the space by the x
              type='text'
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
            />
          </HStack>

          {/* Due Date */}
          <HStack mt='2em' minW='5em' maxH='2em'>
            <Heading w='25%' size='xl' ml='1em'>
              Due:
            </Heading>
            <Input
              w='65%' //Account for the space by the x
              type='datetime-local'
              value={new Date(task.end_date).toISOString().slice(0, 16)}
              onChange={e => setTask({ ...task, end_date: e.target.value })}
            />
          </HStack>

          {/* Difficulty */}
          <HStack mt='2em' minW='5em' maxH='2em'>
            <Heading w='25%' size='xl' ml='1em'>
              Difficulty:
            </Heading>
            <RadioGroup
              w='65%'
              onChange={e => setTask({ ...task, difficulty: e })}
              value={task.difficulty}
            >
              <HStack justifyContent={'center'}>
                <Radio value='0' colorScheme='green'>
                  Easy
                </Radio>
                <Radio value='1' colorScheme='yellow'>
                  Standard
                </Radio>
                <Radio value='2' colorScheme='red'>
                  Difficult
                </Radio>
              </HStack>
            </RadioGroup>
          </HStack>

          {/* Tags */}
          <HStack mt='2em' minW='5em' maxH='2em'>
            <Heading w='25%' size='xl' ml='1em'>
              Tags:
            </Heading>
            <Input
              w='65%' //Account for the space by the x
              type='text'
              value={task.tag}
              onChange={e => setTask({ ...task, tag: e.target.value })}
            />
          </HStack>
        </ModalBody>

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
