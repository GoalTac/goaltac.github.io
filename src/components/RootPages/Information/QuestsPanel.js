import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box
} from '@chakra-ui/react'
import NavItem from '../Navigaton/NavItem'
import largelogo from '../../../images/GoalTac_Logo.png';
import smalllogo from '../../../images/logo.png';
import Settings from '../Settings';
import { useSupabaseClient } from '../../../hooks/SessionProvider';

export default function QuestsPanel({}) {

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