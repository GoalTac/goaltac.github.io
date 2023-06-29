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


//to export the buttons from into Header.js
//and write their functionality


export default function HeaderNav({community}) {
    return (<VStack>
    <Flex width='100%'>
    <IconButton 
      borderWidth='1px'
      borderEndRadius='unset'
      borderBlockEnd='unset'
      width='100%'
      variant='ghost' 
      fontSize='2rem' 
      icon={<RiCalendarEventLine/>}  />
    <IconButton 
      borderWidth='1px'
      borderEndRadius='unset'
      borderBlockEnd='unset'
      width='100%'
      variant='ghost' 
      fontSize='2rem' 
      icon={<TbTarget/>}  />
    <IconButton 
      borderWidth='1px'
      borderEndRadius='unset'
      borderBlockEnd='unset'
      width='100%'
      variant='ghost' 
      fontSize='2rem' 
      icon={<FaUserFriends/>}  />
    <IconButton 
      borderWidth='1px'
      borderEndRadius='unset'
      borderBlockEnd='unset'
      width='100%'
      variant='ghost' 
      fontSize='2rem' 
      icon={<FaChalkboard />}  />
    <IconButton 
      borderWidth='1px'
      borderEndRadius='unset'
      borderBlockEnd='unset'
      width='100%'
      variant='ghost' 
      fontSize='2rem' 
      icon={<ChatIcon />}  />
  </Flex>
  <Divider/>
  </VStack>)
}