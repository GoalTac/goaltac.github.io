import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    VStack,
    StackDivider,
    HStack,
    Text,
    Image,
    Box,
    Skeleton,
  } from '@chakra-ui/react';
  

import DeleteTask from './Tasks/DeleteTask';
import ClearTasks from './Tasks/ClearTasks';
// import { useRealtime } from 'react-supabase';
import { useEffect, useState } from 'react';
import supabase from '../supabase'
import TaskItem from './TaskListDetails/TaskItem';

export default function Calendar() {
      // const [result, reexecute] = useRealtime('todos');
  // const { data: tasks, error, fetching } = result;

  const todos = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'todos' },
    (payload) => {
      fetchData()
      console.log('Change received!', payload)
    }
  )
  .subscribe()

  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    let { data: tasks, error} = await supabase.from('todos').select('*');
    setTasks(tasks);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // if (fetching) {
  //   return (
  //     <Skeleton
  //       width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
  //       height="300px"
  //       rounded="md"
  //     />
  //   );
  // }


  return (
    <TableContainer>
      <Table variant='striped'>
        <TableCaption placement="Top">Calendar: January 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Sunday</Th>
            <Th>Monday</Th>
            <Th>Tuesday</Th>
            <Th>Wednesday</Th>
            <Th>Thursday</Th>
            <Th>Friday</Th>
            <Th>Saturday</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>2</Td>
            <Td>3</Td>
            <Td>4</Td>
            <Td>5</Td>
            <Td>6</Td>
            <Td>7</Td>
          </Tr>
          <Tr>
            {tasks.map(task => (
                <Td><TaskItem key={task.id} title={task.title} end_date={task.end_date} difficulty={task.difficulty} text={task.text} id={task.id} /></Td>
            ))}
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>

          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
