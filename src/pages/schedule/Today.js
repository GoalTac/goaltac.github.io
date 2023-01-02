import { 
    Box, VStack 
} from "@chakra-ui/react";
import { useState } from "react";
import supabase from "../../supabase";

export default function Today(){

    //Supabase
    const [tasks, setTasks] = useState([])

    //ChakraUI

    const getTasks = async function(){
        let { data: tasks } = await supabase.from('todos').select('*')
        setTasks(tasks)
    }

    return(
        <VStack>
            {tasks.map(task =>{
                // create a checklist with checkboxes
            })}
        </VStack>
    )
}