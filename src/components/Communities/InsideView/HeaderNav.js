import {
    Divider,
    Flex,
    IconButton,
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

export default function HeaderNav({setTab, community}) {

    const navigation = [
        ['calendar', <RiCalendarEventLine/>],
        ['goals', <TbTarget/>],
        ['people', <FaUserFriends/>],
        ['leaderboard', <FaChalkboard />],
        ['chat', <ChatIcon />]]

    
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
            onClick={() => setTab(navItem[0])}
            icon={navItem[1]}/>)})}
    </Flex>
  <Divider/>
  </VStack>)
}