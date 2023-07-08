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
    Spacer,
    ButtonGroup,
    Divider,
    Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider
  } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { getExampleCommunities } from '../Example';
import { getAllCommunities } from '../CommunityAPI';
import { Link } from "react-router-dom";
import { RandomUUIDOptions } from 'crypto';


  
export default function CommunityList() {

    //get all the communities to display
    useEffect(() => {
      const fetchCommunityData = async() => getAllCommunities().then((response) => {
          setCommunities(response)
        }
      );
      fetchCommunityData();
    }, []);

    const [communities, setCommunities] = useState<any>(null);
    

    return (
      <Flex marginX='auto' minWidth='fit-content' maxWidth='60vw' flexDirection={'column'}>
        <CommunityListing communities={communities} />

      </Flex>
      
    );
  }

  function CommunityListing({communities}: any) {
    return (
    <Card bg={useColorModeValue('gray.50', 'gray.900')} boxShadow={'xl'}>
      <CardHeader display="flex" justifyContent="space-between">
          <Button variant="solid" colorScheme="blue" width='fit-content'>
            Joined
          </Button>
          <Button variant="ghost" colorScheme="blue" width='fit-content'>
            Requested
          </Button>
          <Spacer/>
          <Button variant="outline" colorScheme="blue" width='fit-content'>
            Create
          </Button>
      </CardHeader>
      <Divider borderColor="black"  borderWidth="1px"/>
      {communities && communities.map((community: any, index: Number) => (
        <Module key={index} community={community}/>
      ))}
      <CardFooter></CardFooter>
    </Card>);
  }





/**
 * Component to display community in the community list
 *  
 * @param {*} community object
 * @returns A module to display in the dashboard
 */
function Module(community: any) {
  community = community.community
  return(
  <Box as={Link} to={`/community1/${community.name}`}>
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