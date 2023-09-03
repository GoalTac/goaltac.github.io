import { Box, Flex, Heading, Text, VStack, Button, IconButton, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Radio, RadioGroup, useDisclosure, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { supabase } from './../supabase';
import React, { useState, useEffect } from 'react';
import Task from '../components/Calendar/Task';
import { set, update } from 'lodash';

//use tasktype to structure tasks
type TaskType = {
    id: number;
    title: string;
    text: string;
    difficulty: number;
    end_date: string;
    created_at: Date;
    userid: string;
    completed: boolean;
    tag: never[];
};

export default function List() {
    
    //state variables for tasks

    //for modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [taskData, setTaskData] = useState<TaskType[]>([]);
    const [titleInput, setTitleInput] = useState('');
    const [descInput, setDescInput] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const toast = useToast();


//get tasks from supabase
    async function getTasks() {
        const { data, error } = await supabase.from('todos').select('*').order('end_date', { ascending: true });
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
        setTaskData(data as TaskType[]);
        }
    }

    //adding tasks to supabase
    async function handleAddTask(event: React.FormEvent) {
        event.preventDefault();

        const { data: { user } } = await supabase.auth.getUser();
        console.log(user);
    

        if (isEdit && currentTask) {
            const updatedTask = { 
                ...currentTask,
                title: titleInput, 
                text: descInput,
                difficulty: parseInt(difficulty),
                end_date: endDate,
            };
  
            const { error } = await supabase
            .from('todos')
            .update(updatedTask)
            .eq('id', currentTask.id);
  
            if (error) {
                console.error(error);
                toast({
                    title: 'Error updating task',
                    position: 'top',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            } 
            
            else {
                toast({
                    title: 'Task updated',
                    position: 'top',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    });
                getTasks();
            }
        } 
        
        else {
            const newTask = { 
                title: titleInput, 
                text: descInput,
                difficulty: parseInt(difficulty),
                end_date: endDate,
                created_at: new Date(),
                userid: user?.id,
                completed: false,
                tag: []
            };
  
            const { error } = await supabase.from('todos').insert([newTask]);
  
            if (error) {
                console.error(error);
                toast({
                    title: 'Error adding task',
                    position: 'top',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            } 
            
            else {
                toast({
                    title: 'Task added',
                    position: 'top',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    });

                getTasks();
            }
        }

        setTitleInput('');
        setDescInput('');
        setDifficulty('');
        setEndDate('');
        setIsEdit(false); // Reset edit mode
        onClose();
    }

    //delete tasks from supabase

    
    const handleDeleteClick = (task: TaskType) => {
        setCurrentTask(task);
        setShowDeleteModal(true);
      };
    
      
    
      const handleDeleteCancel = () => {
        setCurrentTask(null);
        setShowDeleteModal(false);
      };
    
    async function handleDelete(id: number) {
        setLoading(true);
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);
        if (error) {
            console.error(error);
            toast({
                title: 'Error deleting task',
                position: 'top',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        } 
        else {
            toast({
                title: 'Task deleted',
                position: 'top',
                status: 'success',
                description: 'Your task has been deleted successfully.',
                duration: 2000,
                isClosable: true,
            });

        setTaskData(taskData.filter((task) => task.id !== id));
        
        }
    
        setLoading(false);
        
    }

    const handleDeleteConfirm = () => {
        handleDelete(currentTask?.id! as number);
        setShowDeleteModal(false);
      };

    //changes completed boolean in supabase to true and false
    async function handleCompletion(task: TaskType) {
        const updatedTask = { ...task, completed: !task.completed };
        const { error } = await supabase
        .from('todos')
        .update({ completed: updatedTask.completed })
        .match({ id: task.id });
        if (error) {
            console.error('Error updating completion status:', error);
        } 
        else {
            setTaskData(taskData.map(t => t.id === task.id ? updatedTask : t));
        }
    }
    //Function to open the modal in edit mode with a selected task
    function handleEdit(task: TaskType) {
        setTitleInput(task.title);
        setDescInput(task.text);
        setDifficulty(task.difficulty.toString());
        setEndDate(task.end_date);
        setCurrentTask(task);
        setIsEdit(true);
        onOpen();
    }

    
    useEffect(() => {
        getTasks();
    }, []);


    //Render component
    return (
    <Box>
        <Heading textAlign="center">Task List</Heading>
        <VStack spacing={4} alignItems="center">
            {taskData.map((task) => (
            <Box 
            width="100%" 
            borderWidth="1px" 
            borderRadius="md" 
            p={4} 
            boxShadow="xl" 
            key={task.id}
            backgroundColor={task.completed ? "green.200" : 'initial'}
            >
            <Flex justifyContent="space-between" alignItems="flex-start">
                <Flex alignItems="flex-start">
                <Heading size="md" pr={5} textDecoration={task.completed ? "line-through" : "none"}>
                {task.title}
                </Heading>
                <Text textDecoration={task.completed ? "line-through" : "none"}>{task.text}</Text>
                </Flex>
                <Flex>
                    <IconButton 
                    aria-label="edit-task" 
                    icon={<FaEdit />} 
                    onClick={() => handleEdit(task)}
                    />
                    <IconButton 
                    aria-label="finish-task" 
                    mx={1} 
                    icon={<FaCheck />} 
                    onClick={() => handleCompletion(task)}
                    colorScheme={task.completed ? "green" : "gray"}
                    />
                    <IconButton
                    aria-label="delete-task"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(task)}
                    isLoading={loading}
                    />
                </Flex>
            </Flex>
            </Box>
            ))}
        
        <Button colorScheme="blue" onClick={onOpen}>Add Task</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{isEdit ? 'Edit Task' : 'Add Task'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder="Title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder="Description" value={descInput} onChange={(e) => setDescInput(e.target.value)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Difficulty</FormLabel>
                    <RadioGroup value={difficulty} onChange={setDifficulty}>
                        <Radio value="1">Easy</Radio>
                        <Radio value="2">Medium</Radio>
                        <Radio value="3">Hard</Radio>
                    </RadioGroup>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>End Date</FormLabel>
                    <Input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
                    {isEdit ? 'Update' : 'Save'}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={showDeleteModal} onClose={handleDeleteCancel}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Task</ModalHeader>
            <ModalBody>Are you sure you want to delete this task?</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
                Delete
              </Button>
              <Button variant="ghost" onClick={handleDeleteCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </VStack>
    </Box>
  );
}
