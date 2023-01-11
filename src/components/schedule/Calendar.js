import { 
    Grid, 
    GridItem,
    Text,
    Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TaskList from "../TaskList";
import TaskItem from "../TaskListDetails/TaskItem";
import DayOfWeek from "./DayOfWeek";


export default function Calendar(props){

    //Date related 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const current_date = new Date()
    const month = months[current_date.getMonth()-1]
    const day = weekdays[current_date.getDay()] //Get day gets the day of the week, returns 0-6
    const ms_in_hour = 3600000;
    const ms_in_day = 86400000;
    const startOfDay = Math.floor(current_date / ms_in_day) * ms_in_day - (19 * ms_in_hour)

    function ProcessTask(props){
        const task = props.task
        const end = new Date(task.end_date)

        if (
            current_date.getFullYear() === end.getFullYear()
            &&
            current_date.getMonth() === end.getMonth()
            &&
            props.day === weekdays[end.getDay()]
        ){
            return <TaskItem key={task.id} task={task} p='5px' w='12vw' h='2em' heading_font_size='lg'/>
        }else{
            return ''
        }
        
    }

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
                <Stack key={weekday} overflow='hidden'>
                    <DayOfWeek
                        bg={day.substr(0, 3) === weekday.substr(0, 3) ? 'cyan.300' : 'white'} 
                        color='black'
                        borderColor='blue.100'
                        text={weekday}
                    />

                    {props.tasks.map((task) =>(

                        <ProcessTask task={task} day={weekday}/>
                        
                    ))}
                </Stack>
            ))}
            
        </Grid>
    )
}