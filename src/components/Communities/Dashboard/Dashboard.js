import {
    Box,
    Text,
    Heading,
    Stack,
    CardHeader,
    CardBody,
    Card,
    StackDivider,
    useColorModeValue,
    Flex,
    CardFooter,
    Button,
    ButtonGroup,
    Divider,
    Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider
  } from '@chakra-ui/react';

  import { ChevronDownIcon } from '@chakra-ui/icons';
  import { useEffect, useState } from 'react';
  import { useSession } from './../../../hooks/SessionProvider';
  import InsideView from '../InsideView/InsideView';



  
  export default function Dashboard() {

    const { user, session, supabase } = useSession();
    const exampleCommunities = getExampleCommunities();
    
    return (
      <Card w={'100%'} bg={useColorModeValue('gray.50', 'gray.900')} boxShadow={'2xl'}>
        <CardHeader display="flex" justifyContent="space-between">
          <Stack direction="row" spacing="4">
            <Button variant="solid" colorScheme="blue" size="lg">
              Joined
            </Button>
            <Divider orientation="vertical" borderColor="black" borderWidth="1px" height="50px" />
            <Button variant="ghost" colorScheme="blue" size="lg">
              Requested
            </Button>
          </Stack>
          <Button variant="outline" colorScheme="blue" size="lg">
            Create Community
          </Button>
        </CardHeader>
        <Divider borderColor="black"  borderWidth="1px"/>

        {exampleCommunities.map((communityObj, index) => (
          <Module key={index} community={communityObj}/>
        ))}
        
        <CardFooter></CardFooter>
      </Card>
    );
  }



/**
 * THIS WILL BE REPLACED FOR MODULECOMPONENT
 * Test strictly
 * @param {*} community object
 * @returns A module to display in the dashboard
 */
function Module({community}) {
  return(<Box minHeight='200px' 
    onClick={() => {
      console.log('hi')
      //need to be able to redirect users to the inside view
      //how do we give communities a unique page?
      return <InsideView community={community}/>
    }}>
    <CardBody >
        <Heading size='lg' marginX="8">{community.name}</Heading>
        <Heading size="sm" marginX="8">{community.members.length}</Heading>
        <br/>
        
        <Flex justifyContent="flex-end">

        <Menu placement='left-start'>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
        Actions
        </MenuButton>
        <MenuList>
        <MenuItem>+Leave Group</MenuItem>
        <MenuItem>+Share</MenuItem>
        <MenuItem>+Settings</MenuItem>
        </MenuList>
        </Menu>

        </Flex>

        <Text fontSize="lg" marginX="8" maxWidth='500px'>{community.desc}</Text>
        <br/>
        

        <Divider borderColor="black"  borderWidth="1px"/>

        
        
    </CardBody>
  </Box>)
}

function getExampleCommunities() {
  return [
    {
      name: 'GoalTac',
      desc:'Welcome to the GoalTac community, a group of ambitious individuals who want to become more productive members and join a place to keep people accountable and encourage efforts!',
      owner: 'cf636296-2c08-4a41-94dc-77b5518ba267',
      members: [
        {
            uuid: 'cf636296-2c08-4a41-94dc-77b5518ba267',
            userName: 'Adi',
            points: 1209,

        },
        {
            uuid: 'd0ab045d-568d-409a-91d4-b09bb5805ce6',
            userName: 'My',
            points: 312
        },
        {
            uuid: 'something!',
            userName: 'Nikhil',
            points: 12019
        },
        {
            uuid: 'woo woo',
            userName: 'Andrew',
            points: 19
        },
      ],
      goals: [12, 142, 124, 29, 93], //id numbers of the goals (which consists of tasks)
      goalsC: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19],
      totalPoints: 11210, //this will be taken out later and we can calculate total points by looping through each member and getting their point value
      stats: {
          type: 0,
          pReq: 1000,
      },
      levelObj: {
          exp: 11219

      }
    },
    {
      name: 'Woo',
      desc:'PEANUT',
      owner: 'cf636296-2c08-4a41-94dc-77b5518ba267',
      members: [
        {
            uuid: 'cf636296-2c08-4a41-94dc-77b5518ba267',
            userName: 'Adi',
            points: 1209,

        },
        {
            uuid: 'd0ab045d-568d-409a-91d4-b09bb5805ce6',
            userName: 'My',
            points: 312
        },
        {
            uuid: 'something!',
            userName: 'Nikhil',
            points: 12019
        },
        {
            uuid: 'woo woo',
            userName: 'Andrew',
            points: 19
        },
      ],
      goals: [12, 142, 124, 29, 93], //id numbers of the goals (which consists of tasks)
      goalsC: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19],
      totalPoints: 11210, //this will be taken out later and we can calculate total points by looping through each member and getting their point value
      stats: {
          type: 0,
          pReq: 1000,
      },
      levelObj: {
          exp: 112190

      }

    }
  ];
}