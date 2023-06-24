import Header from './Group/Header'
import {
    Box,
} from '@chakra-ui/react'

/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView({community}) {
    return(
        <Box name='Specific Community View'
        borderWidth='1px'
        h='90vh'>
           <Header community={community}/> 
        </Box>
        
    );
}