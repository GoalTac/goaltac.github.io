import { Box, Button, Spacer, Flex, Spinner, ButtonGroup, ListIcon, Stack, useColorModeValue, SkeletonCircle, SkeletonText, Card } from "@chakra-ui/react";
import Calendar from "./Calendar";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Chat from "../components/Chats/PrivateChat";
import TaskDrawer from "../components/Tasks/TaskDrawer";
import React from "react";
import { _getUserTasksInfo, _getTaskbyID, _getUserTasks } from "../components/Tasks/TaskAPI";
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
        async function fetchUserRelations() {
            if (user) {
                const fetchedTasks = await _getUserTasksInfo(user?.['id'])
                setTasksInfo(fetchedTasks)

                //might be an issue in the future
                setDisplayedView(<ListView tasks={fetchedTasks} />)

                setLoading(false) 
            }
            
        }
        fetchUserRelations()

        const taskChange = useSupabase.channel('profileChanges').on('postgres_changes',{
            schema: 'public', // Subscribes to the "public" schema in Postgres
            event: '*',       // Listen to all changes
            table: 'task_user_relations', filter: `user_id=eq.${user?.['id']}`
          },(payload: any) => {
              fetchUserRelations()
              console.log(payload)
          }).subscribe()
    
          return () => {
            taskChange.unsubscribe()
        };
    },[])

    function SkeletonCard() {
        return <Card marginY='20px' padding='6' boxShadow='lg' bg={useColorModeValue('white','gray.700')}>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Card>
    }

    return(
    
    <Box marginX='auto' maxWidth={['unset', 'container.lg']} width='fit-content'>
        <Stack marginX='40px' paddingTop={'2rem'} columnGap='4px' marginBottom='12px' height='fit-content' alignItems={['center','']} flexDirection={['column','row']} flexWrap='wrap'>
            <ButtonGroup height='inherit' left='0' width='fit-content'>
                {/**
                 <Button leftIcon={<CalendarIcon/>}
                colorScheme={view === 'Calendar' ? 'teal' : 'gray'}
                onClick={() => {
                    setView('Calendar')
                    setDisplayedView(<Calendar tasks={tasksInfo}/>)
                }}>
                    Calendar
                </Button>

                 */}
                
                <Button leftIcon={<AiOutlineOrderedList/>}
                colorScheme={view === 'List' ? 'teal' : 'gray'}
                onClick={() => {
                    //setView('List')
                    //setDisplayedView(<ListView tasks={tasksInfo} />)
                }}>
                    List
                </Button>
            </ButtonGroup>
            <Spacer />
            <Flex width='fit-content'>
               <TaskDrawer/> 
            </Flex>
        </Stack>
        {loading ? <SkeletonCard/> : displayedView}
        
    </Box>)
}