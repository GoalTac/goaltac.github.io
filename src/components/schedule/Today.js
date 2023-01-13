import { 
    VStack 
} from "@chakra-ui/react";
import TaskItem from "../../components/TaskListDetails/TaskItem";

export default function Today(props){
    
    return(
        <VStack alignItems='start'>
            <h1>Make a nice today label here</h1>
            {props.tasks.map(task =>(
                // create a checklist with checkboxes
                // <TaskCheckbox key={task.id} task={task} />
                <TaskItem key={task.id} task={task} p='5px' w='12vw' h='2em' heading_font_size='lg'/>
            ))}
        </VStack>
    )
}