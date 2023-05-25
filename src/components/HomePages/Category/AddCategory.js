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
  CheckboxGroup,
  Spinner
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from '../../../hooks/SessionProvider';
import CategoryObject from './CategoryObject';

/*
  This file is to add a category to the user's dashboard, similar
  to how AddTask adds a task to the user's task list
*/

export default function AddCategory({initOpen, initTasks, initCategory, buttonTitle}) {
  const { user, session, supabase } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure(); //For the modal's open/close
  const toast = useToast();

  const [loading, setLoading] = useState(true);

  //currently selected tasks
  const [tasks, setTasks] =  useState((initTasks ? initTasks : []));

  //all of the user's tasks to be selected
  const [allTasks, setAllTasks] = useState([]); //this only needs to load ONCE
  const [category, setCategory] = useState({
    title: (initCategory ? initCategory.title : ''),
    description: (initCategory ? initCategory.description : ''),
    tasks: (initCategory ? initCategory.tasks : []),
    uuid: (initCategory ? initCategory.uuid : user?.id),
  });
 
  
  const close  = function() {
    onClose();

    //to reset the selected tasks
    setTasks([])
    
  }

  useEffect(() => {

    console.log(category)

    async function fetchData() {
      let { data: tasks, error } = await supabase.from('todos').select('*');
      
      setAllTasks(tasks)
      setLoading(false)
    }
    fetchData();
    setCategory({ ...category, uuid: user?.id });
  }, []);

  /**
   * Public accessor for the modal!
   */
  const modal = function() {
    return(
        <Modal className='Category Modal Parent' id='Category Modal Parent'
          isOpen={isOpen || initOpen}
          onClose={close}
          closeOnOverlayClick={false}
          size='xl'
        >
          <ModalOverlay className='Category Modal Overlay' id='Category Modal Overlay'>
            <ModalContent className='Category Modal Content' id='Category Modal Content'>
              <ModalHeader className='Category Modal Header' id='Category Modal Header'>
                Create your new category</ModalHeader>
              <ModalBody className='Category Modal Body' id='Category Modal Body'>
                <VStack as='form' p='25px' className='Category Modal VStack' id='Category Modal VStack'>
                  {/* Title */}
                  <FormControl className='Category Modal Title Form' id='Category Modal Title Form'>
                    <FormLabel className='Category Modal Title Name' id='Category Modal Title Name'>
                      Title</FormLabel>
                    <Input className='Category Modal Title Edit' id='Category Modal Title Edit'
                      borderWidth='2px' borderRadius='10px' padding='2px'
                      type='text'
                      maxLength={24}
                      value={category.title}
                      onChange={e => setCategory({ ...category, title: e.target.value })}/>
                    <FormHelperText className='Category Modal SubTitle' id='Category Modal SubTitle'>
                      Choose a title that's fun and concise!
                    </FormHelperText>
                  </FormControl>

                  {/* Task */}
                  <FormControl className='Category Modal Task Form' id='Category Modal Task Form'>
                    <FormLabel className='Category Modal Task Name' id='Category Modal Task Name'>
                      Tasks</FormLabel>
                    <CheckboxGroup className='Category Modal Task Edit' id='Category Modal Task Edit'
                      borderWidth='2px' borderRadius='10px' padding='2px'
                      type='checkbox'
                      maxLength={24}>
                          {allTasks.map(task => (
                            <Checkbox
                              key={task.id}
                              marginRight='1rem'
                              //defaultChecked={category.tasks.includes(task.id) ? true : false}
                              minWidth='4rem'
                              columnGap='1rem'
                              onChange={e => {e.target.checked ? addTask(task) : removeTask(task)}}
                              borderWidth='1px'>
                                {task.title}
                            </Checkbox>
                          ))}

                    </CheckboxGroup>

                  </FormControl>

                  {/* Description */}
                  <FormControl className='Category Modal Desc Form' id='Category Modal Desc Form'>
                    <FormLabel className='Category Modal Desc Name' id='Category Modal Desc Name'>
                      Category Description</FormLabel>
                    <Input
                      borderWidth='2px' borderRadius='10px' padding='2px'
                      type='text'
                      maxLength={1024}
                      value={category.description}
                      onChange={e => {
                        setCategory({ ...category, description: e.target.value})
                      }}
                    />
                    <FormHelperText className='Category Modal Desc SubTitle' id='Category Modal Desc SubTitle'>
                      Explain your task in as little (or as much ;-) ) detail as
                      you need!
                    </FormHelperText>
                  </FormControl>
                  <Button className='Category Modal Add Button' id='Category Modal Add Button'
                    colorScheme='blue' onClick={saveCategory}>
                    Add
                  </Button>
                </VStack>
              </ModalBody>
              <ModalCloseButton />
            </ModalContent>
          </ModalOverlay>
        </Modal>);
    };
  /**
   * 
   * @param {*} task 
   * @returns void - Adds a task to the tasks array
   */
  const addTask = task => {
    setCategory(category.tasks.concat(task.id))
    console.log("Added Cat",category.tasks)

    const newTasks = tasks.concat(task)
    console.log("Added", newTasks)
    setTasks(newTasks);
  }

  /**
   * 
   * @param {*} task 
   * @returns void - Removes matching task from tasks list
   */
  const removeTask = task => {
    setCategory(category.tasks.filter(i => i !== task.id))
    console.log("Removed Cat", category.tasks)

    const newTasks = tasks.filter(i => i.id !== task.id)
    console.log("Removed", newTasks)
    setTasks(newTasks);
    
  }

  async function saveCategory(e) {
    
    e.preventDefault();
    setLoading(true);
    const editMode = ((buttonTitle ? true : false))

    try {
      if (editMode && initCategory) {
        const { error } = await supabase
        .from('categories') //Table name
        .update(category)
        .eq('id', initCategory.id);
        console.log(error)
      } else {
        const { error } = await supabase
        .from('categories') //Table name
        .insert(category);
      }
      
      
      setLoading(false); //Finishing tasks
      setCategory({ ...category, title: '', description: '', tasks: [] });
      
      close();
      
    } catch(e) {
      console.log(e)
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

  

  return (
    <>
      <Button onClick={tempOnOpen} colorScheme='blue' p='10px'>
        {buttonTitle ? buttonTitle : "+ Category"}
      </Button>
      {modal()}
      
    </>
  );
}

/*
.then(data => {
  console.log(data)
  data.map((task, index) => {
    <Checkbox
      key={index}
      value={`${task.id}`}
      marginRight={1}
      minWidth='60px'
      columnGap={2}
      onChange={e => {e.target.checked ? addTask(task) : removeTask(task)}}
      borderWidth='1px'>
        {task.title} 
    </Checkbox>
  })
})
*/