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
import InsideView from '../Community/InsideView';
import { getExampleCommunities } from '../Example';
import { Link } from "react-router-dom";


  
export default function CommunityList() {

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

        {exampleCommunities.map((community, index) => (
          <Module key={index} community={community}/>
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
function Module(community: any) {
  community = community.community
  return(
  <Box minHeight='200px' as={Link} to={`/community/${community.name}`}>
    <CardBody >
        <Heading size='lg' marginX="8">{community.name}</Heading>
        <Heading size="sm" marginX="8">{community.members.size}</Heading>
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