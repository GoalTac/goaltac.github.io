import { 
    Box, Flex, useColorMode, Divider, Spacer, Heading, Text
} from '@chakra-ui/react';
import JoinButton from '../Joined';
import SettingsButton from './Settings';
import RequestButton from './Request';
import { useSession } from '../../../hooks/SessionProvider';
import RequestButton from './Request';

/**
 * Module
 * A component to display a community in the dashboard's UI
 * 
 * @param {*} Takes a community ID, and UI views
 */
export default function Module({mobile = false, type = "vacant"}, community = {}) {
    const { user, session, supabase } = useSession();
    const button = (type) => {
        switch(type) {
            case "joined": return <SettingsButton community={community} />
            case "withdraw": return <RequestButton community={community} />
            case "vacant": return <JoinButton community={community} />
        }
    }

    return (
    
    <Box name='Module Parent'>
        
        {/* This includes title, desc, total members, etc. */}
        <Flex name='Module Attributes'>

            {/* Allow title to be clickable into the public view of this community */}
            <Heading>

            </Heading>
            <Text>hi</Text>
        </Flex>

        {/* Personalized interaction: join/withdraw/settings */}
        <Flex name='Module Interact'>
            {button}
        </Flex>
    </Box>
    );
}