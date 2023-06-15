import {
    Flex,
    Heading,
    Stack,
    Text,
    Button, 
    HStack,
} from '@chakra-ui/react';
import OptionComponent from '../Options/OptionComponent';

export default function Header() {
  return (
    <Flex 
      bgColor={'gray'} 
      borderWidth='2px'
      borderRadius='lg'
      borderColor='gray.200'
    >
      <Stack >
        <Stack height={'150px'}>
          <Heading>Staff's Test Clan</Heading>
          <Text>members: 10 </Text>
          <Text>This is a test community for staff members to develop the communities UI. </Text>
        </Stack>
        <HStack>
          <Button>Calendar</Button>
          <Button>Goals</Button>
          <Button>Members</Button>
          <Button>Leaderboard</Button>
          <Button>Chat</Button>
        </HStack>
      </Stack>
      {/* <OptionComponent /> */}
    </Flex>
  )
}
