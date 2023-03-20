import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box
} from '@chakra-ui/react'
import { useSupabaseClient } from '../../../../hooks/SessionProvider';

export default function OnlineMembersPanel({community}) {

    return (
        <Flex flexDirection='column'>
            <Box fontSize='2xl'>
                Online Members
            </Box>
            <Box>
                Placehoolder
            </Box>
        </Flex>
    )
}