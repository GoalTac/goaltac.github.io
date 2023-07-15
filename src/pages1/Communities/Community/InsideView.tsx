import Header from './Information'
import Roster from './Roster'
import { useState, useEffect, ReactElement } from 'react';
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'
import {
    Divider,
    Flex,
    IconButton,
    IconProps,
    VStack
} from '@chakra-ui/react';
  import {
    TbTarget
  } from 'react-icons/tb'
  import {
    FaUserFriends,
    FaChalkboard
  } from 'react-icons/fa'
  import {
    RiCalendarEventLine
  } from 'react-icons/ri'
  import { 
    ChatIcon
} from '@chakra-ui/icons';
import {
    Box,
    useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
import { getCommunity } from './../CommunityAPI'
import { uniqueId } from 'lodash';
import Chat from '../../../components/Chat';
import GoalDashboard from './Goals';
/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView() {

    const { communityName } = useParams<{ communityName: string }>();
    const [community, setCommunity] = useState<any>();

    useEffect(() => {
        const fetchCommunityData = async() => getCommunity(communityName).then((response) => {
            setCommunity( response );
            })
        fetchCommunityData();
    }, []);

    const [view, setView] = useState<ReactElement>();
    console.log(view)
    return(community && 
        <Box className='Specific Community View' bg={useColorModeValue('gray.50', 'gray.700')}
        borderRadius='20px'
        marginX='auto' minWidth='fit-content' maxWidth='60vw' boxShadow='2xl' padding='10px'>
            <Header community={community}/>
            <HeaderNav setView={setView} community={community} />
            {view}

            <Box height='10vh'>

            </Box>
        </Box>
        
    );
}

function HeaderNav({setView, community}: any) {

    const navigation = [
        ['calendar', <RiCalendarEventLine/>, <Roster community={community} />],
        ['goals', <TbTarget/>, <GoalDashboard community={community} />],
        ['people', <FaUserFriends/>, <Roster community={community} />],
        ['chat', <ChatIcon />, <Chat />]]

    
    return (<VStack>
    <Flex width='100%'>
        {navigation.map((navItem, index) => {
            return (
            <IconButton key={index}
              borderWidth='1px'
              borderEndRadius='unset'
              borderBlockEnd='unset'
              width='100%'
              variant='ghost'
              fontSize='2rem'
              onClick={() => setView(navItem[2])}
              icon={navItem[1] as ReactElement} aria-label={navItem[0] as string}/>)})}
      </Flex>
    <Divider/>
  </VStack>)
}