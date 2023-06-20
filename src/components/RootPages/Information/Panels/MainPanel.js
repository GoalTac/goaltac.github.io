import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Image,
    Box
} from '@chakra-ui/react'

export default function MainPanel({infoPanels}) {

    return (
        <Flex
        //How to make it emulate duolingo's panels?
        padding='10px'
        width='20rem'
        position='relative'
        overflow='hidden'
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