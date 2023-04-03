// This is the file that actually sends data to supabase
import {
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  VStack,
  Button,
  useDisclosure,
  useToast,
  HStack,
  RadioGroup,
  Radio,
  Text,
  Icon,
  IconButton,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from '../../hooks/SessionProvider';

/*
  This file is to add a category to the user's dashboard, similar
  to how AddTask adds a task to the user's task list
*/

export default function AddCategory({initialTasks}) {
  const { user, session, supabase } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure(); //For the modal's open/close
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState({
    title: '',
    description: '',
    tasks: [],
    uuid: user?.id,
  });
  const toast = useToast();
  var selectedTasks = tasks => {
    const taskIDs = tasks.map((task) => {return task.id})
    setCategory({...category, tasks: taskIDs})
  }

  /**
   * 
   * @param {*} task 
   * @returns void - Adds a task to the tasks array
   */
  const addTask = task => {
    const newTasks = tasks.length > 0 ? [...tasks, task]:[task]
    setTasks(newTasks);
    selectedTasks(newTasks);
  }

  /**
   * 
   * @param {*} task 
   * @returns void - Removes matching task from tasks list
   */
  const removeTask = task => {
      //remove matching task from tasks
    if (tasks.includes(task)) {
      const newTasks = [...tasks.filter(
        i => i !== task //if i is the matching task, then remove it
      )]
      setTasks(newTasks);
      selectedTasks(newTasks);

      
    } else {
      return new Error('Task not found.');
    }
  }

  async function saveCategory(e) {
    
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('categories') //Table name
        .insert(category);
      //Finishing tasks
      setLoading(false);
      setCategory({ ...category, title: '', description: '', tasks: [] });

      

      selectedTasks([])
      setTasks([])
      onClose();
    } catch(e) {
      toast({
        title: error || 'category added',
        position: 'top',
        status: error ? 'error' : 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function tempOnOpen() {
    onOpen();
  }

  // Keep this so that the add task knows the user's id as it loads LAST in HomePage.js
  useEffect(() => {
    setCategory({ ...category, uuid: user?.id });

  }, []);

  return (
    <>
      <Button onClick={tempOnOpen} colorScheme='blue' p='10px'>
        + Category
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size='xl'
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Create your new category</ModalHeader>
            <ModalBody>
              <VStack as='form' p='25px'>
                {/* Title */}
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    borderWidth='2px' borderRadius='10px' padding='2px'
                    type='text'
                    maxLength={24}
                    value={category.title}
                    onChange={e => setCategory({ ...category, title: e.target.value })}
                  />
                  <FormHelperText>
                    Choose a title that's fun and concise!
                  </FormHelperText>
                </FormControl>

                {/* Task */}
                <FormControl>
                  <FormLabel>Tasks</FormLabel>
                  <CheckboxGroup
                    borderWidth='2px' borderRadius='10px' padding='2px'
                    type='checkbox'
                    maxLength={24}
                    >
                    
                      {initialTasks.map((task, index) => (
                      <Checkbox
                        key={index}
                        value={`${task.id}`}
                        marginRight={1}
                        minWidth='60px'
                        columnGap={2}
                        onChange={e => {e.target.checked ? addTask(task) : removeTask(task)}}
                        borderWidth='1px'>
                          {task.title} 
                      </Checkbox>))}

                  </CheckboxGroup>

                </FormControl>

                {/* Description */}
                <FormControl>
                  <FormLabel>Category Description</FormLabel>
                  <Input
                    borderWidth='2px' borderRadius='10px' padding='2px'
                    type='text'
                    maxLength={1024}
                    value={category.description}
                    onChange={e => setCategory({ ...category, description: e.target.value })}
                  />
                  <FormHelperText>
                    Explain your task in as little (or as much ;-) ) detail as
                    you need!
                  </FormHelperText>
                </FormControl>
                <Button colorScheme='blue' onClick={saveCategory}>
                  Add
                </Button>
              </VStack>
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
