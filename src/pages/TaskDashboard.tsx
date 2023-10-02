import { Box, Button, Spacer, Flex, Spinner, ButtonGroup, ListIcon, Stack } from "@chakra-ui/react";
import Calendar from "./Calendar";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Chat from "../components/Chats/PrivateChat";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import React from "react";
import { _getTaskInfo, _getTaskbyID, _getUserTasks } from "../components/Tasks/TaskAPI";
import { useSession, useSupabaseClient } from "../hooks/SessionProvider";
import { CalendarIcon } from "@chakra-ui/icons";
import { AiOutlineOrderedList } from "react-icons/ai";
import ListView from "../components/Tasks/ListView";
import { supabase } from "../supabase";

export default function Dashboard() {
    const navigate = useNavigate();
    const user = useSession().user
    const [loading, setLoading] = useState<Boolean>(true)
    const [tasksInfo, setTasksInfo] = useState<any>([])
    const [displayedView, setDisplayedView] = useState<any>()
    const  useSupabase: any  = useSupabaseClient();

    const [view, setView] = useState<string>('List')

    /**
     * This NEEDS to be improved so we get both task and relations together and package them
     */
    React.useEffect(()=>{
        const taskChanges = useSupabase.channel('any').on('postgres_changes',{
                schema: 'public', // Subscribes to the "public" schema in Postgres
                event: '*',       // Listen to all changes
                table: 'task_user_relations'
            },(payload: any) => {
                fetchUserRelations()
        }).subscribe()
        async function fetchUserRelations() {
            if (user) {
                const fetchedTasks = await _getTaskInfo(user?.['id'])
                setTasksInfo(fetchedTasks)
                setDisplayedView(<ListView tasks={fetchedTasks} />)

                setLoading(false) 
            }
            
        }
        fetchUserRelations()
        return () => {
            taskChanges.unsubscribe();
          };
    },[])

    return(
    
    <Box marginX='auto' maxWidth={['unset', 'container.lg']}>
        <Stack padding={2} columnGap='4px' marginBottom='12px' height='fit-content' alignItems={['center','left']} flexDirection={['column','row']} flexWrap='wrap'>
            <ButtonGroup height='inherit' left='0'>
                <Button leftIcon={<CalendarIcon/>}
                colorScheme={view === 'Calendar' ? 'teal' : 'gray'}
                onClick={() => {
                    setView('Calendar')
                    setDisplayedView(<Calendar tasks={tasksInfo}/>)
                }}>
                    Calendar
                </Button>
                <Button leftIcon={<AiOutlineOrderedList/>}
                colorScheme={view === 'List' ? 'teal' : 'gray'}
                onClick={() => {
                    setView('List')
                    setDisplayedView(<ListView tasks={tasksInfo} />)
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