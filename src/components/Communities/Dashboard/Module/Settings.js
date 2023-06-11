import {
    Box, Flex
} from '@chakra-ui/react';
import {
    SettingsIcon
} from '@chakra-ui/icons';
import { useNavigate, Link, NavLink,  } from 'react-router-dom';


/**
 * UI Component for the community join button
 * @param {*} 
 */
export default function SettingsButton({community}) {
    return(
    <Box borderRadius='4px'>
        <Link to={community.nav}>
            <SettingsIcon/>
        </Link>
    </Box>
    );
}