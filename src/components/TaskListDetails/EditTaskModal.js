import {
  Button,
  Divider,
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

// import './EditTaskModal.css';
// import { difficultyBorder } from '../TaskBasedBorderColors/TaskBasedBorder';

import Title from './TaskParts/Title';
import DeleteTask from '../Tasks/DeleteTask';
import EditTask from '../Tasks/EditTask';
import DueDate from './TaskParts/DueDate';
import ConfirmEdits from '../Tasks/ConfirmEdits';
import { useEffect, useState } from 'react';

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

        <ModalBody
          border='20px'
          // borderColor={difficultyBorder(task.difficulty)}
        >
          {/* Title */}
          <HStack m='2em 0' maxH='2em' alignContent={'left'}>
            <Heading w='25%' size='xl' ml='1em'>
              Title:
            </Heading>
            <Input
              variant='filled'
              justifySelf={'left'}
              w='65%' //Account for the space by the x
              type='text'
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
            />
          </HStack>
          <Divider w='75%' margin='auto' />

          {/* Difficulty */}
          <HStack m='2em 0' minW='5em' maxH='2em'>
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
          <Divider w='75%' margin='auto' />

          {/* Tags */}
          <HStack m='2em 0' minW='5em' maxH='2em'>
            <Heading w='25%' size='xl' ml='1em'>
              Tags:
            </Heading>
            <Input
              variant='filled'
              w='65%' //Account for the space by the x
              type='text'
              value={task.tag}
              onChange={e => setTask({ ...task, tag: e.target.value })}
            />
          </HStack>
          <Divider w='75%' margin='auto' />

          {/* Due Date */}
          <HStack m='2em 0' minW='5em' maxH='2em'>
            <Heading w='25%' size='xl' ml='1em'>
              Due:
            </Heading>
            <Input
              variant='filled'
              w='65%' //Account for the space by the x
              type='datetime-local'
              value={new Date(task.end_date).toISOString().slice(0, 16)}
              onChange={e => setTask({ ...task, end_date: e.target.value })}
            />
          </HStack>
          <Divider w='75%' margin='auto' />

          {/* Description */}
          <HStack m='2em 0' maxH='5em' alignContent={'left'}>
            <Heading w='30%' my='1em' size='xl' ml='1em'>
              Description:
            </Heading>
            <Input
              variant='filled'
              w='60%' //Account for the space by the x
              maxW='60%'
              type='text'
              value={task.text}
              onChange={e => setTask({ ...task, text: e.target.value })}
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
