import React, { useState } from 'react'

import {
    Flex,
    Divider,
    Heading,
    VStack,
    Text,
    Image,
    Box
} from '@chakra-ui/react'

import premiumLogo from '../../../../images/premium_logo.png'
import premiumName from '../../../../images/premium_logo_name.png'

export default function PremiumPanel({}) {

    return (
        <Flex>
            <Image style={{position:'absolute'}} top='8px' right='8px' width='30%' src={premiumLogo}/>
            <VStack alignItems='left' borderWidth='1px'>
                <Image width='70%' src={premiumName} />
                <Box paddingStart='1rem'>
                    <Heading fontSize='1.2rem'>
                        Try Premium for free
                    </Heading>
                    <Text>
                        No ads, more features, full access!
                    </Text>
                </Box>
                
            </VStack>
            
        </Flex>
    )
}