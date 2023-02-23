import { Flex, Box, HStack, VStack, Heading, Text, Button, 
    Card, CardHeader, CardBody, CardFooter, 
    FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

// I need help with the below import lines, the import isn't working and I can't figure out why
// import { MsgSidebar } from '../components/MessagerPages/MsgSidebar'; 
// import { MsgHistory } from '../components/MessagerPages/MsgHistory';


export default function Messages() {
    const state = useState();
    console.log('Messages has loaded.');

    return (
        <>
            <Flex>
                <Box>
                    <Heading>Messages</Heading>

                    <HStack>
                        {/* <MsgSidebar /> 
                        <MsgHistory /> */}
                        <VStack>
                            <FormControl><InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaSearch color='gray.300' />}
                                />
                                <Input id='search' placeholder='search' />
                            </InputGroup></FormControl>
                            <Button>Person 1</Button>
                            <Button>Person 2</Button>
                            <Button>Person 3</Button>
                            <Button>Person 4</Button>
                        </VStack>
                        
                        <VStack><Card>
                            <CardHeader>Person Name Icon</CardHeader>
                            <CardBody>
                                (message history with person)
                                <Text>Newer message</Text>
                            </CardBody>
                            <CardFooter><FormControl><InputGroup>
                                <Input placeholder='send message' />
                            </InputGroup></FormControl></CardFooter>
                        </Card></VStack>
                    </HStack>
                </Box>
            </Flex>
        </>
    )
}