import {
  Button,
  VStack,
  StackDivider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Heading,
  Box,
  Flex
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useSession } from '../../../hooks/SessionProvider';
import TaskItem from '../TaskListDetails/TaskItem';
import AddCategory from './AddCategory';

export default function CategoryItem({tasks, category}) {

  return (
    <Box>
      {/* Encompassing component */}

      <Flex>
        {/* Ordering of the components */}

        <Box w='100%'>
          {/* Category Title component "Make this into a button which we can
          click on to edit the contents of the category"*/} 
          <AddCategory initTasks={tasks} initCategory={category} buttonTitle={'Edit'}/>
          {category.title}
          <Flex marginLeft='1rem' flexDir={'column'} rowGap='0.5rem'>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                p='7px'
                w='auto'
                minW='1rem'
                h='1rem'
                heading_font_size='lg'
               
              />
            ))}
          </Flex>
          
          
        </Box>
        
        
      </Flex>
    </Box>
  );
}
