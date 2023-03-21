import { 
    VStack, 
    StackDivider, 
    Image, 
    Box,
    Flex
} from '@chakra-ui/react';
import img from '../../images/empty.svg';
import React, { useState } from 'react';
import TaskItem from './TaskListDetails/TaskItem';
import { useSupabaseClient } from '../../hooks/SessionProvider';

export default function DashboardPage({}) {
    const supabase = useSupabaseClient();
  
  //get all task data relating to the user
  //organize by category -> goals
  //if user has clicked on a goal expand to full task view 

    const [tasks, setTasks] = useState([]);

    React.useEffect(() => {
    async function fetchData() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        setTasks(tasks);
    }
    fetchData();
    } , []);



    const taskStructure = [ //create a task structure that brings together all of the person's tasks
        //goals are the highest parent node
        {
            Goal: 'goal1',
        },
        {
            Goal: 'goal2'
        },
        {
            Goal: 'goal3'
        },
        {
            Goal: 'goal4',

        }
    ]

    const categories = [
        {
            Data: ['red', 'Health & Fitness'],
            Goals: ['goal2','goal3']

        }
    ]
    
    return (
        <Box>
            <Image src={img} mt='30px' maxW='95%' />
            {categories.map((category, index) => {
                return (
                    <Flex
                    key={index}>
                    <Box
                        w='100%'
                        bgColor={category.Data[0]}
                        h='60px'>
                        <Text>{category.Data[1]}</Text>
                    </Box>
                    
                    
                    {category.Goals.map((goal, index) => {
                    <Box
                    key={index}
                    minWidth='100px'
                    bgColor='blue'
                    minHeight='30px'>
                        <Text>{goal}</Text>
                    </Box>
                    })}
                   


                    </Flex>
                );
            })
            }
        </Box>
    );

}