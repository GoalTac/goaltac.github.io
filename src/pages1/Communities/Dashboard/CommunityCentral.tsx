import {
    Button
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import CommunityList from './CommunityList';


/**
 * Brings all components of community page together
 * @returns Dashboard page
 */
export default function CommunityCentral() {
    return(<CommunityList/>);
}

export function CommunityCentralButton() {
    return(<Link to='/communities1'>
        <Button>
            Community
        </Button>
    </Link>);
}