import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box
} from '@chakra-ui/react'
import { useSupabaseClient } from '../../../../hooks/SessionProvider';

export default function ChatRoomPanel({}) {
    const { supabase: supabase } = useSupabaseClient();
    return (
        <Flex flexDirection='column'>
            <Box fontSize='2xl'>
                CHAT ROOM
            </Box>
            <Box>
                Placehoolder
            </Box>
        </Flex>
    )
}