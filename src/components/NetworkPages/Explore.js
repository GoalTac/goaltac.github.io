import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Card,
} from '@chakra-ui/react';
import { useSupabaseClient } from '../../hooks/SessionProvider';
import { useEffect, useState } from 'react';

/*
    Creates an empty template from which data will be drawn from the database to fill each
    'card' up
    When the user scrolls down it loads in more cards
  */

export default function Explore() {
  const [tasks, setTasks] = useState([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    async function getTasks() {
      const { data: taskList, error } = await supabase
        .from('todos')
        .select('*');
      setTasks(taskList);
    }
    getTasks();
  }, []);

  return (
    <Box
      w={'100%'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
    >
      {console.log(tasks)}
      {/*tasks?.map(task => {
        return <CardMaker key={task.id} task={task} />;
      })*/}
      <CardMaker />
      <Flex
        flexWrap={'wrap'}
        justifyItems={'center'}
        alignContent='center'
        columnGap={5}
        rowGap={5}
        p={3}
      ></Flex>
    </Box>
  );
}

//creates a card given a task
export function CardMaker({ task }) {
  return (
    <Box
      bg='gray.100'
      boxShadow='lg'
      w='250px'
      borderRadius='xl'
      borderColor='black'
    >
      <Box pos='relative'>
        <Image
          borderTopRadius='xl'
          src={
            'https://st.depositphotos.com/1909871/5015/i/600/depositphotos_50152811-stock-photo-parkour-men.jpg'
          }
          layout={'fill'}
        />
      </Box>
      <Stack marginX='4' mt='2'>
        <Text
          color={'green.500'}
          textTransform={'uppercase'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          Backflip
        </Text>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'lg'}
          fontFamily={'body'}
        >
          {/*task.title*/}
        </Heading>
        <Text color={'gray.500'} fontSize='sm'>
          If I told myself that I would be able to do a backflip in 6 months, I
          wouldn't have believed myself. But here I am, 6 months later, and I
          can do a backflip. I'm so proud of myself.
        </Text>
      </Stack>
      <Stack mt={1} direction={'row'} align={'center'} margin='2'>
        <Avatar
          src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          alt={'Author'}
        />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}>Adi</Text>
          <Text color={'gray.500'}>Jan 08, 2023</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
