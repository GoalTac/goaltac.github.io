import { Box, Heading, Icon, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaToggleOn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


type MyComponentProps = {
    link1: string;
    link2: string;
};

export default function CheckVerification(props: MyComponentProps) {
    // Variables ----------------------------------------------------------------------

    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    // UseEffect ----------------------------------------------------------------------

    // Functions ----------------------------------------------------------------------

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = (link: string) => {
        navigate(link);
    };

    return (
        <Box textAlign='center' mt={20} mx='auto' maxW='50%' position={'absolute'} zIndex={100} top={0} left={0} right={0} bg={'white'} color={'black'} p={10}>
            <Box mb={5}>
                <Icon as={FaToggleOn} boxSize={20} mb={2} />
                <Heading as='h1' size='2xl'>
                    Try out version 1 and version 2
                </Heading>
                <Text mt={4}>Leave your comments on discord on which features you like better from each version</Text>
            </Box>

            <Button onClick={() => handleButtonClick(props.link1)} mr={2} bg={'gray.100'}>
                Link 1
            </Button>
            <Button onClick={() => handleButtonClick(props.link2)} mr={2} bg={'gray.100'}>
                Link 2
            </Button>
        </Box>
    );
}