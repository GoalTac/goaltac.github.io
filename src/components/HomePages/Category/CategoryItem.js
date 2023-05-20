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
  Box,
  Flex
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useSession } from '../../../hooks/SessionProvider';
import TaskItem from '../TaskListDetails/TaskItem';


export default function CategoryItem({tasks, category}) {

  return (
    <Box>
      {/* Encompassing component */}

      <Flex>
        {/* Ordering of the components */}

        <Box w='100%' h='30px'>
          {/* Category Title component */}
          {category.title}
        </Box>
        {tasks.map((task) => {
          <TaskItem
            key={task.id}
            task={task}
            p='5px'
            w='auto'
            h='7vh'
            heading_font_size='lg'
            size='3xl'/>
        })}
        
      </Flex>
    </Box>
  );
}
