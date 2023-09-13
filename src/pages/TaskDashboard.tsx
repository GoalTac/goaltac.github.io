import { Box, Button, Spacer, Flex, Spinner, ButtonGroup, ListIcon, Stack } from "@chakra-ui/react";
import Calendar from "./Calendar";
import List from "./List";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Chat from "../components/Chats/PrivateChat";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import React from "react";
import { _getTaskbyID, _getUserTasks } from "../components/Tasks/TaskAPI";
import { useSession } from "../hooks/SessionProvider";
import { CalendarIcon } from "@chakra-ui/icons";
import { AiOutlineOrderedList } from "react-icons/ai";
import ListView from "../components/Tasks/ListView";
import { supabase } from "../supabase";

export default function Dashboard() {
    const navigate = useNavigate();
    const [displayedView, setDisplayedView] = useState<any>(<Calendar/>)
    const user = useSession().user
    const [loading, setLoading] = useState<Boolean>(true)
    const [tasks, setTasks] = useState<any>()
    const [relations, setRelations] = useState<any>()

    const [view, setView] = useState<string>()

    React.useEffect(()=>{
        async function fetchUserRelations() {
            const { data: data, error } = await supabase
                .from('task_user_relations')
                .select('*')
                .eq('user_id', user?.['id'])

            if (error) {
                throw new Error(error.message)
            }
            console.log(data)
            setRelations(data)
            async function fetchTasks() {
                if(data != null) {
                    //should update as new tasks are updated (use subscribe?)
                    const newTasks = await Promise.all(data.map(async(id) => {
                        return await _getTaskbyID(id.task_id)
                    })).finally(()=>setLoading(false))
                    console.log(newTasks)
                    setTasks(newTasks)
                }
            }
            fetchTasks()
        }
        fetchUserRelations()
    },[])


    return(
    
    <Box marginX='auto' maxWidth={['unset', 'container.lg']}>
        <Stack padding={2} columnGap='4px' marginBottom='12px' height='fit-content' alignItems={['center','left']} flexDirection={['column','row']} flexWrap='wrap'>
            <ButtonGroup height='inherit' left='0'>
                <Button leftIcon={<CalendarIcon/>}
                colorScheme={view === 'Calendar' ? 'teal' : 'gray'}
                onClick={() => {
                    setView('Calendar')
                    setDisplayedView(<Calendar tasks={tasks}/>)
                }}>
                    Calendar
                </Button>
                <Button leftIcon={<AiOutlineOrderedList/>}
                colorScheme={view === 'List' ? 'teal' : 'gray'}
                onClick={() => {
                    setView('List')
                    setDisplayedView(<ListView tasks={tasks} relations={relations} />)
                }}>
                    List
                </Button>
            </ButtonGroup>
            <Spacer />
            <Flex width='fit-content'>
               <TaskDrawer/> 
            </Flex>
            
            
        </Stack>
        {loading ? <Spinner/> : displayedView}
    </Box>)
}