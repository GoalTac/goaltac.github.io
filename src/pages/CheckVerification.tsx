import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export default function CheckVerification() {

    // Variables ----------------------------------------------------------------------
    // UseEffect ----------------------------------------------------------------------
    // Functions ----------------------------------------------------------------------

    return (
        <Box textAlign='center' mt={20} mx='auto' maxW='50%'>
            <Box mb={5}>
                <CheckIcon color='green.500' boxSize={20} mb={2} />
                <Heading as='h1' size='2xl'>Check Your Email</Heading>
            </Box>
            <Text fontSize='xl' mt={5}>We've sent you an email with a verification link. Please check your inbox and click the link to verify your account.</Text>
        </Box>
    )
}