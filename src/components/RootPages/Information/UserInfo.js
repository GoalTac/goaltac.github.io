import {
    Flex,
    Divider,
    Image,
    Box,
    Icon,
    HStack,
    Text,
    VStack,
    Heading,
    Spacer,
    Button
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { BiCoin, BiTask } from 'react-icons/bi'
import { FaFire } from 'react-icons/fa'

import { MdAddTask } from 'react-icons/md'

import React, { useState, useEffect } from 'react';

export default function UserInfo() {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };



    return(
        <Flex flexDirection='row' columnGap='1rem'>
            <VStack>
              <CurrentTask
                isHovering={isHovering}
                handleMouseOut={handleMouseOut} 
                handleMouseOver={handleMouseOver} />
                {isHovering && 
                <PickTask handleMouseOut={handleMouseOut} 
                handleMouseOver={handleMouseOver}/>}
            </VStack>
            
            <Spacer/>
            <HStack>
                <BiCoin color='rgb(237, 137, 54)' size='1.5rem' />
                <Text color='rgb(237, 137, 54)' fontSize='1rem'>
                    999
                </Text>
            </HStack>
            <Spacer/>
            <HStack>
                <FaFire color='rgb(229, 62, 62)' size='1.5rem' />
                <Text color='rgb(229, 62, 62)' fontSize='1rem'>
                    999
                </Text>
            </HStack>
        </Flex>
    )
}

const CurrentTask = ({handleMouseOver, handleMouseOut, isHovering}) => {
    return(
        <Box height='60px'
        backgroundColor={(isHovering && 'gray.200')}
        borderTopRadius={(isHovering && '10px')}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        <BiTask 
        color='rgb(79,209,197)'
        size='3rem' />
        </Box>
        
    )
}

const PickTask = ({handleMouseOver, handleMouseOut}) => {
    return(
        <Box onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        borderRadius='10px'
        zIndex='overlay'
        backgroundColor='white' 
        left='0px'
        top='50px'
        width='16rem'
        height='200px'
        borderColor='gray.300'
        borderWidth='3px'

        flexDirection='row'
        position='absolute'>
            <Flex textAlign='center'
            flexDirection='row'
            borderColor='gray.150'
            borderBottom='1px'
            height='40px'>
                <Heading paddingStart='20px' 
                paddingTop='10px'
                textColor='blackAlpha.500'
                fontSize='1.1rem'>
                    Your Goals
                </Heading>
            </Flex>
            <Divider bgColor='blackAlpha.500' />
            
            {/* Scroll through your goals */}
            <Flex overflowY='scroll'>

            </Flex>
            <Button bottom='0'
                borderTop='1px'
                display='unset'
                height='50px'
                width='100%'
                backgroundColor='unset'
                borderRadius='unset'
                textAlign='left'
                position='absolute'>

                <Box>
                    <HStack columnGap='0.75rem'>
                        <Box borderWidth='3px'
                        borderColor='blackAlpha.700'
                        borderRadius='10px'>
                            <MdAddTask size='1.8rem'
                            color='rgb(0, 0, 0, 0.64)' />
                        </Box>
                        <Heading textColor='blackAlpha.700'
                        fontSize='1rem'>
                            Add a new Goal
                        </Heading>
                    </HStack>
                </Box>
                
            </Button>
        </Box>
    )
}