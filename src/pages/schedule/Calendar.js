import { 
    Grid, 
    GridItem,
    Text,
    Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TaskItem from "../../components/TaskListDetails/TaskItem";
import DayOfWeek from "./DayOfWeek";


export default function Calendar(props){

    //Date related 
    //eslint-disable-next-line
    const current_date = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] //eslint-disable-next-line
    const [month, setMonth] = useState(months[current_date.getMonth()-1]) //eslint-disable-next-line
    const [day, setDay] = useState(weekdays[current_date.getDay()]) //Get day gets the day of the week, returns 0-6
    
    // console.log(tasks)

    return( //Attempting to format a grid with month full span, days Su-Sa under, extended columns under
        <Grid
        templateColumns='7'
        templateRows='3' //Month, days, tasks
        color='cyan.400'
        >
            {/* Current Month */}
            <GridItem colSpan={7}>
                <Text>
                    {month}
                </Text>
            </GridItem>

            {/* Days of the week */}
            {weekdays.map(weekday =>(
                //DayOfWeek requires a background color (bg), text color (color), and a border color (borderColor) 
                <Stack key={weekday}>
                    <DayOfWeek
                        bg={day.substr(0, 3) === weekday.substr(0, 3) ? 'cyan.300' : 'white'} 
                        color='black'
                        borderColor='blue.100'
                        text={weekday}
                    />

                    {day.substr(0, 3) === weekday.substr(0, 3) ? 
                        //Case A 
                        props.tasks.map(task =>(
                            // create a checklist with checkboxes
                            // <TaskCheckbox key={task.id} task={task} />
                            <TaskItem key={task.id} task={task} p='5px' w='10vw' h='2em' heading_font_size='lg'/>
                        ))
                        : 
                        //Case B
                        ''
                    }

                </Stack>
                
                
            ))}
            
        </Grid>
    )
}