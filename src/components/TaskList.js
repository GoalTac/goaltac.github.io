import { VStack, StackDivider, Image, Box } from '@chakra-ui/react';
import img from '../images/empty.svg';
import { useEffect, useState } from 'react';
import TaskItem from './TaskListDetails/TaskItem';
import { useSupabaseClient } from '../hooks/SessionProvider';

export default function TaskList() {
  const supabase = useSupabaseClient();

  useEffect(() => {
    const todos = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        payload => {
          fetchData();
          console.log('Change received!', payload);
        }
      )
      .subscribe();
  }, []);

  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    let { data: tasks, error } = await supabase.from('todos').select('*');
    setTasks(tasks);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!tasks || !tasks.length) {
    return (
      <Box align='center'>
        <Image src={img} mt='30px' maxW='95%' />
      </Box>
    );
  }

  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor='gray.100'
        borderWidth='2px'
        p='5'
        borderRadius='lg'
        w='100vw'
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        alignItems='center'
      >
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            p='5px'
            w='auto'
            h='7vh'
            heading_font_size='lg'
            size='3xl'
          />
        ))}
      </VStack>
    </>
  );
}
