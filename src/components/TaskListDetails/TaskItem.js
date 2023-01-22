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
import DeleteTask from '../Tasks/DeleteTask';
import EditTask from '../Tasks/EditTask';
import supabase from '../../supabase';
import { useEffect, useState } from 'react';
import Title from './TaskParts/Title';
import DueDate from './TaskParts/DueDate';

export default function TaskItem(props) {
  //ChakraUI
  const { isOpen, onOpen, onClose } = useDisclosure(); //Modal Stuff

  const task = props.task;
  const [done, setDone] = useState(task.completed);
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

  const difficultyBorder = function () {
    switch (task.difficulty) {
      case 0:
        return 'green.400';

      case 1:
        return 'orange.400';

      case 2:
        return 'blue.400';

      default:
        return 'black.100';
    }
  };

  const setCompleted = async function () {
    const { err } = await supabase
      .from('todos')
      .update({ completed: done })
      .eq('id', task.id);
    if (err) console.log(err);
  };

  useEffect(() => {
    setCompleted(); // eslint-disable-next-line
  }, [done]);

  return (
    <HStack maxW='100%'>
      <Checkbox
        size='lg'
        isChecked={done}
        onChange={e => {
          setDone(e.target.checked);
          setCompleted();
        }}
      />
      <Button
        maxW='100%'
        justifyContent='left'
        onClick={onOpen}
        p={props.p}
        w={props.w}
        h={props.h}
        overflow='hidden'
      >
        <Heading fontSize={props.heading_font_size} color={difficultyBorder}>
          {task.title}
        </Heading>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={props.size}>
        <ModalOverlay />

        <ModalContent borderColor={difficultyBorder} borderWidth='3px'>
          <ModalCloseButton />

          {/* Title, Difficulty */}
          <HStack mt='1em'>
            <Title title={task.title} diff={task.difficulty} />

            <DueDate date={task.end_date} month={month} size='3xl' />
          </HStack>

          <ModalBody></ModalBody>

          <ModalFooter>
            <EditTask id={task.id} />
            &nbsp;
            <DeleteTask id={task.id} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
