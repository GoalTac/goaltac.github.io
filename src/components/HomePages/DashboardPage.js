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

export default function DashboardPage({tasks}) {
    const supabase = useSupabaseClient();
  
  //get all task data relating to the user
  //organize by category -> goals
  //if user has clicked on a goal expand to full task view 

    const [categories, setCategories] = useState([]);

    //getting data actively from the database
    async function fetchData() {
        let { data: categories, error } = await supabase.from('categories').select('*');
        setCategories(categories);
    }
    React.useEffect(() => {
        fetchData();
    } , []);




    /*
    const categories = [
        {
            Data: ['red', 'Health & Fitness']

        }
    ]*/
    
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