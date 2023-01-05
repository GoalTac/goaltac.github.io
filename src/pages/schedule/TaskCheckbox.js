import { 
    Button,
    Checkbox,
    HStack,
    Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../supabase";

//No longer need this file

export default function TaskCheckbox(props){

    //For me
    const [task, setTask] = useState(props.task)

    //Supabase
    const [done, setDone] = useState(task.completed)

    useEffect(()=>{

        async function setCompleted(){
            const { err } = await supabase.from('todos').update({ completed: done }).eq('id', task.id)
            if (err) console.log(err)
        }
        setCompleted()
        
    }, [done])

    return(
        <HStack>
            <Checkbox size='lg' isChecked={done} onChange={(e)=> {setDone(e.target.checked); setCompleted()}} />
            <Button>
                <Text h='2em' w='10vw' overflow='hidden'>
                    {task.title}
                </Text>
            </Button>
        </HStack>
        
    )
}