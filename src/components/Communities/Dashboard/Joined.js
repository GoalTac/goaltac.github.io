import {
    Box, Flex
} from '@chakra-ui/react';
import { useNavigate, Link, NavLink,  } from 'react-router-dom';


/**
 * UI Component for the community join button
 * @param {*} 
 */
export default function JoinButton({community}) {
    return(
    <Box borderRadius='4px'>
        <Link to={community.nav}>
            <Heading>Join</Heading>
        </Link>
    </Box>
    );
}