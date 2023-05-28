import {
  Button,
  VStack,
  StackDivider,
  Spacer,
  HStack,
  IconButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Heading,
  Box,
  Flex,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'

import { useEffect, useState, useRef } from 'react';
import TaskItem from '../TaskListDetails/TaskItem';
import AddCategory from './AddCategory';
import { useSession } from '../../../hooks/SessionProvider';

export default function CategoryItem({tasks, category}) {

  const toast = useToast();
  const { user, session, supabase } = useSession();

  const dragItem = useRef();
  const dragOverItem = useRef();
  const [taskList, setTaskList] = useState(tasks.map((task, index) => {
    return { index, task}
  }));

  const dragStart = (e, taskElem) => {
    dragItem.current = taskElem;
    
  };

  const dragEnter = (e, taskElem) => {
    dragOverItem.current = taskElem;

  };

  const drop = () => {
    console.log(taskList);

    const copyListItems = [...taskList];

    const dragItemContent = copyListItems[dragItem.current.index];
    copyListItems.splice(dragItem.current.index, 1);
    copyListItems.splice(dragOverItem.current.index, 0, dragItemContent);

    console.log("Drag Start",dragItem.current)
    console.log("Drag Enter",dragOverItem.current)


    dragItem.current = null;
    dragOverItem.current = null;
    setTaskList(copyListItems);
    console.log(copyListItems);

  };

  async function onDelete(item) {
      
      try {
        
        const { error } = await supabase
        .from('categories') //Table name
        .delete()
        .eq("id", item.id);
        
      } catch(e) {
        console.log(e)
      }
  
  }

  return (
    <Box>
      {/* Encompassing component */}

      <Flex>
        {/* Ordering of the components */}

        <Box w='100%'>
          {/* Category Title component "Make this into a button which we can
          click on to edit the contents of the category"*/} 
          <HStack columnGap='0.3rem'>
            <AddCategory initTasks={tasks} initCategory={category} buttonTitle={`+ ${category.title}`}/>
            <Spacer />
            <IconButton icon={<DeleteIcon />} onClick={(e) => onDelete(category)}
              color='gray.400' 
              _hover={{
                color: 'gray.800', 

              }}/>
          </HStack>
          
          <Flex marginLeft='1rem' flexDir={'row'} columnGap='0.5rem'>
            {taskList && taskList.map((taskElem) => (
              <Box draggable
                key={taskElem.index}
                onDragStart={(e) => dragStart(e, taskElem)}
                onDragEnter={(e) => dragEnter(e, taskElem)}
                onDragEnd={drop}>
                <TaskItem

                  task={taskElem.task}
                  p='7px'
                  w='auto'
                  minW='1rem'
                  h='1rem'
                  heading_font_size='lg'/>
              </Box>
              
            ))}
          </Flex>
          
          
        </Box>
        
        
      </Flex>
    </Box>
  );
}
