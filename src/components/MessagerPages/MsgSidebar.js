import { Box, HStack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// This isn't working for some reason when I try to import 
export default function MsgSidebar() {
    const state = useState();
    return (
        <>
            <Box>
                <HStack>Messages</HStack>
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
            </Box>
        </>
    )
}