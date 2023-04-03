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
  IconButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from '../../../hooks/SessionProvider';

export default function AddTask() {
  const { user, session, supabase } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure(); //For the modal's open/close

  //Page
  const [task, setTask] = useState({
    title: '',
    text: '',
    tag: [],
    end_date: new Date(),
    difficulty: '0',
    userid: user?.id,
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  var selectedTags = tags => {
    console.log(tags)
    setTask({...task, tag: tags})
  }


  /**
   * 
   * @param {*} props 
   * @returns tag display component
   */
  const [tags, setTags] = React.useState([]);

  const addTag = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      const newTag = event.target.value.replace(/\s+/g, '');
      if (tags.includes(newTag)) {
        return new Error('Can not have duplicated tags.');
      } else {
        setTags([...tags, newTag])
        selectedTags([...tags, newTag]);
        event.target.value = "";
      }
    }
  }

  const removeTag = tag => {
    //remove matching tag from tags
    if (tags.includes(tag)) {
        const newTag = [...tags.filter(
          i => i !== tag //if i is the matching tag to be removed, then remove it
        )]
        setTags(newTag)
        selectedTags(newTag);
        
    } else {
      return new Error('Tag not found.');
    }
  }

  async function saveTask(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('todos') //Table name
      .insert(task);

    //Finishing tasks
    setLoading(false);
    setTask({ ...task, title: '', text: '', tag: [], end_date: new Date() });

    toast({
      title: error || 'task added',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });

    //reset tags (because idk how to make it look better)
    setTags([])
    selectedTags = []

    onClose();
  }

  function tempOnOpen() {
    onOpen();
  }

  // Keep this so that the add task knows the user's id as it loads LAST in HomePage.js
  useEffect(() => {
    setTask({ ...task, userid: user?.id });
  }, []);

  return (
    <>
      <Button onClick={tempOnOpen} colorScheme='blue' p='10px'>
        + Task
      </Button>
      <Link as={Link} to='/schedule'>
        weekly
      </Link>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size='xl'
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Create your new task</ModalHeader>
            <ModalBody>
              <VStack as='form' p='25px'>
                {/* Title */}
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    borderWidth='2px' borderRadius='10px' padding='2px'
                    type='text'
                    maxLength={24}
                    value={task.title}
                    onChange={e => setTask({ ...task, title: e.target.value })}
                  />
                  <FormHelperText>
                    Choose a title that's fun and concise!
                  </FormHelperText>
                </FormControl>

                {/* Difficulty */}
                <VStack>
                  <Text>Difficulty</Text>
                  <RadioGroup
                    onChange={e => setTask({ ...task, difficulty: e })}
                    value={task?.difficulty}
                  >
                    <HStack>
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
                </VStack>
                {/* Hashtag */}
                <FormControl>
                  <FormLabel>Hash Tag</FormLabel>
                  <Input
                    borderWidth='2px' borderRadius='10px' padding='2px'
                    placeholder='Please enter to add tags'
                    type='text'
                    maxLength={16}
                    onKeyUp={e => addTag(e)}/>
                  <Box justifyContent='space-evenly'>
                    {tags.map((tag, index) => (
                      <Button 
                        marginRight={1}
                        minWidth='60px'
                        columnGap={2}
                        onClick={() => removeTag(tag)}
                        key={index} 
                        borderWidth='1px'>
                          {tag} 
                          <CloseIcon />
                      </Button>))}
                  </Box>
                </FormControl>
                {/* End Date */}
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Flex borderWidth='2px' maxW={'max-content'} borderRadius='10px' padding='2px'>
                    <DatePicker
                      showTimeSelect
                      dateFormat="Pp"
                      selected={task.end_date}
                      onChange={e => setTask({ ...task, end_date: e })}/>
                  </Flex>
                  
                </FormControl>

                {/* Details */}
                <FormControl>
                  <FormLabel>Task Details</FormLabel>
                  <Input
                    borderWidth='2px' borderRadius='10px' padding='2px'
                    type='text'
                    maxLength={1024}
                    value={task.text}
                    onChange={e => setTask({ ...task, text: e.target.value })}
                  />
                  <FormHelperText>
                    Explain your task in as little (or as much ;-) ) detail as
                    you need!
                  </FormHelperText>
                </FormControl>
                <Button colorScheme='blue' onClick={saveTask}>
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
