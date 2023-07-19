import { Box, Button, ButtonGroup, Card, Container, Flex, HStack, Heading, Icon, SimpleGrid, Stack } from "@chakra-ui/react";
import Column from "../../../components/Calendar/Column";
import { ColumnType } from "../../../components/Calendar/utils/enums";
import { AddIcon } from '@chakra-ui/icons'

export default function Calendar({community}: any) {

    function Row(day: String, tasks: any[]) {
        return(<Card overflow='auto' padding='10px' variant='unstyled' width='100%'>
            <Heading fontSize='1.5rem'>
                {day}
            </Heading>
            <Stack flexWrap='wrap' flexDirection='row'>
                {tasks.map((task)=>{
                return (<Flex borderRadius='20px' padding='10px'borderWidth='1px' minW='120px' maxW='300px' height='120px'> 
                    {task}
                </Flex>);})}
            </Stack>
        </Card>)
    }

    const taskDays = () => {
        []
    }

    return(<Box width='inherit' maxW='800px'padding='10px'>
        <ButtonGroup margin='10px'>
            <Button>
                <Icon as={AddIcon} marginRight='10px'/>
                Create Task
            </Button>
            <Button>
                sds
            </Button>
            <Button>
                sds
            </Button>
        </ButtonGroup>
        {Row("Sunday", ["hi", "I hate runnin","nooo","yesss","test", 'tes', 'sdasdas','asfdafwkmko'])}
    </Box>);
}