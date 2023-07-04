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
import Roster from './Roster';

export default function HeaderNav(setView: any, community: any) {

    const navigation = [
        ['calendar', <RiCalendarEventLine/>, <Roster community={community} />],
        ['goals', <TbTarget/>, <Roster community={community} />],
        ['people', <FaUserFriends/>, <Roster community={community} />],
        ['chat', <ChatIcon />, <Roster community={community} />]]

    
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
              icon={<ChatIcon />} aria-label={navItem[0] as string}/>)})}
      </Flex>
    <Divider/>
  </VStack>)
}