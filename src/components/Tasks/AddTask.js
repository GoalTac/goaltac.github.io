// This is the file that actually sends data to supabase
import {
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Link } from 'react-router-dom';

export default function AddTask({ userid }) {
  //Session defined from HomePage.js (supabase.auth.getSession())
  //Database
  const { isOpen, onOpen, onClose } = useDisclosure(); //For the modal's open/close

  //Page

  const [task, setTask] = useState({
    title: '',
    text: '',
    tag: '',
    end_date: new Date(),
    difficulty: '0',
    userid: userid,
  });
  const { title, text, tag, end_date, difficulty, user_id } = task;
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function saveTask(e) {
    console.log(task.end_date);
    e.preventDefault();
    setLoading(true);

    // console.log(formatDate(end_date))
    const { error } = await supabase
      .from('todos') //Table name
      .insert(task);
    console.log(task);

    //Finishing tasks
    setLoading(false);
    setTask({ ...task, title: '', text: '', tag: '', end_date: new Date() });

    toast({
      title: error || 'task added',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });

    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue' p='10px'>
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
                    type='text'
                    maxLength={24}
                    value={title}
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
                    value={difficulty}
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
                    type='text'
                    maxLength={16}
                    value={tag}
                    onChange={e => setTask({ ...task, tag: e.target.value })}
                  />
                  <FormHelperText>Type a hashtag in</FormHelperText>
                </FormControl>

                {/* End Date */}
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <DatePicker
                    selected={end_date}
                    onChange={e => setTask({ ...task, end_date: e })}
                  />
                  {/* <Input type='datetime-local'
                onChange={ e => setTask({...task, end_date: e.target.value})}
                placeholder='yyyy-mm-dd'
                required={true}
                /> */}
                </FormControl>

                {/* Details */}
                <FormControl>
                  <FormLabel>Task Details</FormLabel>
                  <Input
                    type='text'
                    maxLength={1024}
                    value={text}
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
