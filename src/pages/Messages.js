import { Flex, Box, HStack, VStack, Heading, Text, StackDivider, 
    Card, CardHeader, CardBody, CardFooter, Icon, 
    FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

// I need help with the below import lines, the import isn't working and I can't figure out why
// import { MsgSidebar } from '../components/MessagerPages/MsgSidebar'; 
// import { MsgHistory } from '../components/MessagerPages/MsgHistory';


export default function Messages() {
    const state = useState();
    const [contacts, setContacts] = useState([]);
    console.log('Messages has loaded.');

    async function fetchData() {
    //     let { data: contacts, error } = await supabase.from('profiles').select('*');
    //     setContacts(contacts);
    }
    

    return (
        <>
            <Flex>
                <Box w='100%' h='100%'>
                    <Heading>Messages</Heading>

                    <HStack
                        divider={<StackDivider />}
                        borderColor='gray.100'
                        borderWidth='2px'
                        p='5'
                        borderRadius='lg'
                        w='100vw'
                        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                        alignItems='center'
                        >
                        {/* <MsgSidebar /> 
                        <MsgHistory /> */}
                        <VStack>
                            <FormControl><InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaSearch color='gray.300' />}
                                />
                                <Input id='search' placeholder='search for person' />
                            </InputGroup></FormControl>
                            {['Person 1', 'Person 2', 'Person 3'].map((person) => ( // this line will be {contacts.map(... after fetching Supabase data 
                                <Card key={person} size='sm'>
                                    <CardHeader><Heading size='sm'> 
                                        <Icon as={FaUserCircle} boxSize={4} />{person}
                                    </Heading></CardHeader>
                                    <CardBody>
                                        <Text>preview with {person}.. </Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </VStack>
                        <VStack><Card size='lg'>
                            <CardHeader><Heading size='sm'> 
                                <Icon as={FaUserCircle} boxSize={5} />  Person X
                            </Heading></CardHeader>
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