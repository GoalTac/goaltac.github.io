import { Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, Icon, IconButton, Spacer, Stack, Text, Tooltip, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useSession } from "../../hooks/SessionProvider";
import React from "react";
import { supabase } from "../../supabase";
import { now } from "lodash";
import { start } from "repl";
import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { FaHourglass, FaHourglassHalf, FaHourglassStart } from "react-icons/fa";

type Task = {
    id: number;
    created_at: Date;
    start_date: Date | null;
    end_date: Date | null;
    name: string;
    description: string | null;
    requirement: number;
    reward: number;
    type: string;
    reoccurence: string;
    uuid: string;
};

type Relation = {
    id: number;
    created_at: Date;
    progress: number | null;
    task_id: string;
    user_id: string;

};

export default function ListView({tasks}: Task[] | any, {relations}: Relation[] | any) {
    const {profile: profile, user: user} = useSession()

    function Card_Module({task}: Task | any, {relation}: Relation | any) {
        const name = task.name ? task.name : 'Untitled'
        const created_at = task.created_at ? task.created_at : null
        const start_date = task.start_date ? new Date(task.start_date) : created_at
        const end_date = task.end_date ? new Date(task.end_date) : null
        const description = task.description ? task.description : 'A start to a great adventure'
        const requirement = task.requirement ? task.requirement : 1
        const reward = task.reward ? task.reward : 1
        const type = task.type ? task.type : 'Boolean'
        const reoccurence = task.reoccurence ? task.reoccurence : 0

        const [avatar, setAvatar] = useState<any>()

        function nextDueDate(frequency: number, startDate: Date, endDate: Date | null) {
            const today = new Date()

            if (frequency == 0) {
                return null //that means it is just a task with no deadline
            }
            

            if (today < startDate) {
                return startDate
            }

            //anything after means today is start date up to end date
            //frequency > 0
            //today >= startDate
            //today < endDate

            let nextDate: Date = startDate;
            nextDate.setDate(startDate.getDate() + frequency);
            
            if (endDate == null || nextDate < endDate) {
                return nextDate
            } else {
                return endDate
            }
            
        }
        
        //what icon to show in the task
        const TimeIndicator = () => {
            //TODO button hover reveal more time details
            //TODO on button click, change time
            const nextDate = nextDueDate(reoccurence, start_date, end_date)
            return <Flex justifyContent='right' alignItems='center' columnGap='4px' fontSize='10px'><CalendarIcon/>{nextDate ? nextDate.toLocaleString(undefined, {
                month: "short", day: "numeric"
            }) : 'Soon?'}</Flex>
        }
        const ProgressIndicator = () => {
            //Should be taken from Task API eventually
            const progress = 0.9999

            //Should be from Task API eventually
            const isComplete = progress/requirement >= 1

            //there is a bug when progress is greater than 4 decimal points. Rounds to next whole number

            return <HStack justifyContent='right'>
                <Tooltip fontSize='8px' hasArrow label={`${progress}/${requirement}`}>
                    <Text borderRadius='10px' backgroundColor={isComplete ? useColorModeValue('green.200','green.600') : useColorModeValue('orange.200','yellow.600')} fontSize='10px' paddingX='10px' width='fit-content'>
                        {((progress/requirement) * 100).toFixed(2)}%
                    </Text>
                </Tooltip>
                
            </HStack>
        }

        const toast = useToast({colorScheme:'orange', isClosable: true, duration: 2000, variant:'solid', title:'Work in Progress', description: 'An edit module will pop up!'})
        
        return <Card width='fit-content' margin='20px' backgroundColor='blue.400' overflow='hidden' minHeight='150px' maxHeight={['450px','300']} maxWidth='500px' size='md' flexDirection={['column','row']} alignItems={[null,'center']}>
                <Flex onClick={()=>toast()} cursor='pointer' _hover={{backgroundColor:useColorModeValue('gray.100','gray.900')}} padding='10px' gap='10px' marginStart='15px' backgroundColor={useColorModeValue('white','gray.800')} height='inherit' minHeight='inherit' width='100%' maxHeight='inherit' flexDirection={['column','row']} alignItems={['center','start']}>
                    <Flex flexDirection={'column'} maxW='300px' marginBottom='auto'>
                        <Heading textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden' maxW='inherit' fontWeight='500' fontSize='1.25rem' alignSelf={['center','start']} height='fit-content'>
                            {name}
                        </Heading>
                        
                        <Text marginStart='10px' maxHeight={['250px','200px']} overflow='scroll' alignSelf={['center','start']} maxW='inherit'>
                            {description}{description}{description}
                        </Text>
                    </Flex>
                    <Flex flexDirection={['row','column']} minH='inherit'>
                        <TimeIndicator/>
                        <Spacer/>
                        <ProgressIndicator/>
                    </Flex>
                </Flex>
            </Card>
    }

    function RenderModules() {

        //merge progress from relations into tasks

        return <Stack flexWrap='wrap' marginX='auto' justifyContent='center' flexDirection='row'>
            {tasks.map((task: Task)=> {
                return <Card_Module key={task.id} task={task}/>
            })}
        </Stack>
    }
    return <RenderModules/>
}