import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Heading,
    VStack,
    Text,
    Image,
    Box,
    Button,
    useColorMode
} from '@chakra-ui/react'

import premiumLogo from '../../../../images/premium_logo.png'
import premiumName from '../../../../images/premium_logo_name.png'

export default function PremiumPanel({}) {
    const { colorMode } = useColorMode()
    return (
        <Flex flexDirection='column' 
        position='relative'
        rowGap='1rem' 
        borderColor={(colorMode == 'dark' ? 'yellow.500' : 'orange.300')}>
            <Image position='absolute' top='0px' right='0px' width='25%' src={premiumLogo}/>
            <VStack alignItems='left'>
                <Image width='50%' src={premiumName} />
                <Box paddingStart='0.6rem' rowGap='1rem'>
                    <Heading fontSize='1.2rem'>
                        Try Premium for free
                    </Heading>
                    <Text lineHeight='1.5rem'>
                        No ads, more features, full access!
                    </Text>
                </Box>
            </VStack>
            <Button borderRadius='15px'
                _active={{
                    bgColor: 
                    (colorMode == 'dark' ? 
                    'rgb(236, 201, 75)' : 
                    'rgb(251, 211, 141)')
                }}
                boxShadow={(colorMode == 'dark' ? 
                '0px 2px 8px rgb(214, 158, 46)' : 
                '0px 2px 8px rgb(237, 137, 54)')}
                textColor='white' 
                marginX='1rem' 
                borderWidth='1px' 
                _hover={{
                    boxShadow: (colorMode == 'dark' ? 
                '0px 2px 14px rgb(214, 158, 46)' : 
                '0px 2px 14px rgb(237, 137, 54)')
                }}
                bgColor={(colorMode == 'dark' ? 'yellow.500' : 'orange.300')}>
                Try 1 week free!
            </Button>
        </Flex>
    )
}