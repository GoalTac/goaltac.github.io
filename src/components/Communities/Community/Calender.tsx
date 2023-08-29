import { Box, Button, ButtonGroup, Card, Container, Flex, HStack, Heading, Icon, SimpleGrid, Stack } from "@chakra-ui/react";
import Column from "../../Calendar/Column";
import { ColumnType } from "../../Calendar/utils/enums";
import { AddIcon } from '@chakra-ui/icons'

export default function Calendar({community}: any) {

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    //create function to look at a date and identify the day of the week
    function getDaybyDate(date: Date) : String {

        return 'Sunday'
    }

    //takes from the community object
    function getTasksbyDay(day: string) : {} {
        try {
            return community.tasks.filter((task: any)=>{
                task.endDate == day
            })
        } catch(error) {
            return {}
        }
        
    }

    function Row(day: String, tasks: any[]) {
        return(<Card overflow='auto' padding='10px' variant='unstyled' 
        width='100%' marginY='20px'>
            <Heading fontSize='1.5rem'>
                {day}
            </Heading>
            <Stack flexWrap='wrap' flexDirection='row'>
                {tasks.map((task, key)=>{
                return (<Flex key={key} borderRadius='20px' padding='10px'borderWidth='1px' minW='120px' maxW='300px' height='120px'> 
                    {task}
                </Flex>);})}

                <Button borderRadius='20px' padding='10px'
                minW='120px' maxW='300px' 
                variant='solid' height='120px'>
                    <Icon as={AddIcon} boxSize='10%' marginRight='10px'/>
                    Create Task
                </Button>
                
            </Stack>
        </Card>)
    }

    const taskDays = () => {
        []
    }

    return(<Box width='inherit' maxW='inherit'padding='10px'>
        {Row("Sunday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
        {Row("Monday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
        {Row("Tuesday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
        {Row("Wednesday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
        {Row("Thursday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
        {Row("Friday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
        {Row("Saturday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}

    
    
    </Box>);
}