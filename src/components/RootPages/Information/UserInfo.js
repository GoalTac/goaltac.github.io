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
    Button,
    FormControl,
    Input,
    FormLabel
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { BiCoin, BiTask } from 'react-icons/bi'
import { FaFire } from 'react-icons/fa'
import { useNavigate, Link, NavLink,  } from 'react-router-dom';

import { MdAddTask } from 'react-icons/md'

import React, { useState, useEffect } from 'react';

export default function UserInfo() {

    const SearchBarComponent = () => {
        const [isHovering, setIsHovering] = useState(false);
        const [placeHolder, setPlaceHolder] = useState('Search');
        const handleMouseOver = () => { setIsHovering(true);};

        const handleMouseOut = () => {  setIsHovering(false);};
        return(<Box>
               <SearchBar isHovering={isHovering}
                handleMouseOut={handleMouseOut} 
                handleMouseOver={handleMouseOver}
                placeHolder={placeHolder} />

                {isHovering &&  <SearchBarOptions handleMouseOut={handleMouseOut} 
                handleMouseOver={handleMouseOver}
                setPlaceHolder={setPlaceHolder}/>} 
            </Box>)
    }

    const GeneralInfoComponent = () => {
        const [isHovering, setIsHovering] = useState(false);
        const handleMouseOver = () => { setIsHovering(true);};

        const handleMouseOut = () => { setIsHovering(false);};



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
         </Flex>);
    }
    
    


    return( 
        <Flex rowGap='20px' flexDirection='column'>
            {SearchBarComponent()}
            {GeneralInfoComponent()}
        </Flex>
    )
}



const SearchBar = ({handleMouseOver, handleMouseOut, isHovering, placeHolder}) => {
    return(
        <FormControl 
        onMouseDown={handleMouseOver}
        onMouseOut={handleMouseOut}
        height='30px'>
            <Input boxSize='inherit' 
            autoComplete='off'
            borderBottomRadius={(isHovering && '0px')} 
            type='text' 
            focusBorderColor='blackAlpha.200'
            placeholder={placeHolder}/>
        </FormControl>
    );
}
const SearchBarOptions = ({handleMouseOver, handleMouseOut, setPlaceHolder}) => {
    return(
        <Box borderWidth='1px' 
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        position='absolute'
        backgroundColor='white'
        name='options'
        height='100px'>
            <Button boxSize= 'unset' 
            display='unset'
            borderRadius='unset'
            onClick={() => {
                setPlaceHolder('/communities')
            }}
            borderColor='blackAlpha.200'
            borderWidth='1px'
            paddingStart='2px'
            width='100%' 
            name='/communities' 
            height='40px'>
                <Text textAlign='left' 
                textColor='blackAlpha.600'
                fontSize='0.75rem'>
                    in /communities</Text>
            </Button>

            <Button boxSize= 'unset' 
            display='unset'
            borderRadius='unset'
            onClick={() => {
                setPlaceHolder('/users')
            }}
            borderColor='blackAlpha.200'
            borderWidth='1px'
            paddingStart='2px'
            width='100%' 
            name='/users' 
            height='40px'>
                <Text textAlign='left' 
                textColor='blackAlpha.600'
                fontSize='0.75rem'>
                    in /users</Text>
            </Button>

            <Button boxSize= 'unset' 
            display='unset'
            borderRadius='unset'
            onClick={() => {
                setPlaceHolder('/tasks')
            }}

            borderColor='blackAlpha.200'
            borderWidth='1px'
            paddingStart='2px'
            width='100%' 
            name='/users' 
            height='40px'>
                <Text textAlign='left' 
                textColor='blackAlpha.600'
                fontSize='0.75rem'>
                    in /tasks</Text>
            </Button>
        </Box>
    );
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
        top='100px'
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
                alignContent='center'
                position='absolute'>
                <NavLink to='/home'>
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
                </NavLink>
            </Button>
        </Box>
    )
}