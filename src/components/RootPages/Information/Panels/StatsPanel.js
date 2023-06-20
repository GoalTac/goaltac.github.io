import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box
} from '@chakra-ui/react'
export default function AdPanel({}) {

    return (
        <Flex flexDirection='column'>
            <Box fontSize='2xl'>
                STATISTICS
            </Box>
            <Box>
                This will be locked for premium users
            </Box>
        </Flex>
    )
}