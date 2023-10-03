import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import useColumnDrop from './hooks/useColumnDrop';
import useColumnTasks from './hooks/useColumnTasks';
import { ColumnType } from './utils/enums';
import Task from './Task';

const ColumnColorScheme: Record<ColumnType, string> = {
  Monday: 'gray',
  Tuesday: 'grey',
  Wednesday: 'grey',
  Thursday: 'grey',
  Friday: 'grey',
  Saturday: 'white',
  Sunday: 'white',
};

const currentDate = new Date();

const daysToAdd = {
  Monday: (8 - currentDate.getDay()) % 7,
  Tuesday: (9 - currentDate.getDay()) % 7,
  Wednesday: (10 - currentDate.getDay()) % 7,
  Thursday: (11 - currentDate.getDay()) % 7,
  Friday: (12 - currentDate.getDay()) % 7,
  Saturday: (13 - currentDate.getDay()) % 7,
  Sunday: (14 - currentDate.getDay()) % 7,
};

function Column({ column }: { column: ColumnType }) {

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + daysToAdd[column]);

  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;

  const formattedDate = day + "/" + month;

  const {
    tasks,
    addEmptyTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
  } = useColumnTasks(column, 'white');

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
    />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={0} letterSpacing="wide">
        <Stack flexDirection='row' overflowX='clip'>
          <Badge
            px={1}
            rounded="sm"
            bg={useColorModeValue('gray.100', 'gray.900')}>
            {column}
          </Badge>
          <div style={{ fontSize: '8px', margin: 8 }}>{formattedDate}</div>
        </Stack>
        
      </Heading>

      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        // min-height= "100px"
        h={{ base: 200, md: 550 }}
        p={1}
        mt={2}
        spacing={1}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
        <IconButton
          size="xs"
          w="100"
          ml={1}
          color={useColorModeValue('gray.500', 'gray.400')}
          bgColor={useColorModeValue('gray.50', 'gray.800')}
          _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
          py={2}
          float="right"
          variant="solid"
          onClick={addEmptyTask}
          colorScheme="black"
          aria-label="add-task"
          icon={<AddIcon />}
        />
      </Stack>
    </Box>
  );
}

export default Column;
