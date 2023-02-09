import {
  Button,
  Checkbox,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';

// import { difficultyBorder } from '../TaskBasedBorderColors/TaskBasedBorder';

import supabase from '../../supabase';
import { useEffect, useState } from 'react';

import EditTaskModal from './EditTaskModal';

import TaskModal from './TaskParts/TaskModal';

// Recieves: p, w, h, task, heading_font_size, size (for modal it opens)
export default function TaskItem(props) {
  //ChakraUI
  const { isOpen, onOpen, onClose } = useDisclosure(); //Modal Stuff

  // For display and edit mode
  const [edit, setEdit] = useState(false);
  const task = props.task;
  const toggleEdit = function () {
    setEdit(!edit);
    console.log(edit);
  };
  const passToModals = {
    toggleEdit: toggleEdit,
    task: task,
    isOpen: isOpen,
    onClose: onClose,
    month: month,
    // difficultyBorder: difficultyBorder(task.difficulty),
    size: props.size,
  };

  return (
    <HStack maxW='100%'>
      <Button
        minW='40%'
        maxW='100%'
        justifyContent='center'
        onClick={onOpen}
        p={props.p}
        w={props.w}
        h={props.h}
        overflow='hidden'
      >
        <Heading
          fontSize={props.heading_font_size}
          /*color={difficultyBorder(task.difficulty)}*/
        >
          {task.title}
        </Heading>
      </Button>
      {/* <p style={{color: 'red'}}>Due: {new Date(task.end_date).toDateString()}</p> */}
      {edit ? (
        <EditTaskModal props={passToModals} />
      ) : (
        <TaskModal props={passToModals} />
      )}
    </HStack>
  );
}

// const An = function({props}){ //This was for testing how I can pass down pops a little neater
//   console.log(props)
//   return(<></>)
// }

// I threw these below so I can see better, was getting too confusing
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
