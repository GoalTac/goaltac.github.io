import Header from './Information'
import Roster from './Roster'
import { useState, useEffect, ReactElement } from 'react';
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'
import {
  Card,
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
import { _getAllMembers, getCommunityByName } from './../CommunityAPI'
import { uniqueId } from 'lodash';
import Chat from '../../../components/Chats/CommunityChat';
import GoalDashboard from './Goals';
import Calendar from './Calender';
/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView() {

    const { communityName } = useParams<{ communityName: string }>();
    const [community, setCommunity] = useState<any>();
    const [view, setView] = useState<ReactElement>(<Chat/>);

    useEffect(() => {
        const fetchCommunityData = async() => getCommunityByName(communityName).then((response) => {
            setCommunity( response );
            })
        fetchCommunityData();
    }, []);

    return(community && 
        <Card className='Specific Community View'
        borderRadius='20px'
        marginX='auto' maxW='800px' boxShadow='2xl' padding='10px'>
            <Header community={community}/>
            <HeaderNav setView={setView} community={community} />
            {view}

            <Box height='10vh'>

            </Box>
        </Card>
        
    );
}

function HeaderNav({setView, community}: any) {

    const [members, setMembers] = useState<any>([])

    useEffect(()=> {
      async function fetchMembers() {
        setMembers(await _getAllMembers(community.community_id))
      }
      fetchMembers()
    },[])

    const navigation = [
        ['calendar', <RiCalendarEventLine/>, <Calendar community={community} />],
        ['goals', <TbTarget/>, <GoalDashboard community={community} />],
        ['people', <FaUserFriends/>, <Roster members={members} />],
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