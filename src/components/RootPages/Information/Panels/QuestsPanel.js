import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box
} from '@chakra-ui/react'
export default function QuestsPanel({quests}) {

    return (
        <Flex flexDirection='column'>
            <Box fontSize='2xl'>
                Quests
            </Box>
            <Box>
                Placehoolder
            </Box>
        </Flex>
    )
}