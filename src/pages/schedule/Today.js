import { 
    VStack 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import TaskCheckbox from "./TaskCheckbox";

export default function Today(){

    //Supabase
    const [tasks, setTasks] = useState([])

    //ChakraUI

    const getTasks = async function(){
        let { data: tasks } = await supabase.from('todos').select('*')
        setTasks(tasks)
        console.log(tasks)
    }

    useEffect(()=>{
        getTasks()
    }, [])

    return(
        <VStack alignItems='start' onMouseDown={console.log('a click')}>
            <h1>Make a nice today label here</h1>
            {tasks.map(task =>(
                // create a checklist with checkboxes
                <TaskCheckbox key={task.id} task={task} />
            ))}
        </VStack>
    )
}