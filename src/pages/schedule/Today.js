import { 
    VStack 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TaskItem from "../../components/TaskListDetails/TaskItem";
import supabase from "../../supabase";
import TaskCheckbox from "./TaskCheckbox";

export default function Today(){

    //Supabase
    const [tasks, setTasks] = useState([])

    //ChakraUI

    const getTasks = async function(){
        function formatDate(){ //This is to match it to supabase's 'yyyy-mm-dd' format
            const date = new Date()
            let fdate = ''
            fdate += date.getFullYear() + '-'
            fdate += (date.getMonth() > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1)) + '-' //Thx js for letting me do this
            fdate += (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
            return fdate
        }
        const fdate = formatDate()
        // console.log(fdate)
        let { data: tasks } = await supabase.from('todos').select('*').eq('end_date', fdate)
        setTasks(tasks)
        // console.log(tasks)
    }

    useEffect(()=>{
        getTasks()
    }, [])

    return(
        <VStack alignItems='start' onMouseDown={console.log('a click')}>
            <h1>Make a nice today label here</h1>
            {tasks.map(task =>(
                // create a checklist with checkboxes
                // <TaskCheckbox key={task.id} task={task} />
                <TaskItem key={task.id} task={task} p='5px' w='12vw' h='2em' heading_font_size='lg'/>
            ))}
        </VStack>
    )
}