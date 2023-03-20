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


export default function MainPanel({infoPanels}) {

    return (
        <Flex
        //How to make it emulate duolingo's panels?
        pos='sticky'
        top='0'
        right='0'
        zIndex='overlay'
        padding='10px'
        maxW='300px'
        height='fit-content'
        rowGap='20px'
        flexDirection="column">
            {/* Display general profile stats */}


            {/* Display panels */}
            {infoPanels.map((panel, index) => {
                return (
                    <Box 
                    key={index}
                    padding='10px'
                    borderWidth='2px'
                    borderColor='gray.150'
                    borderRadius='10px'>
                        {panel}
                    </Box>
                );
            })}
        </Flex>
    )
}