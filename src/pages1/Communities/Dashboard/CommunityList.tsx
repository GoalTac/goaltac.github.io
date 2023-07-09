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
    Image,
    HStack,
    Divider,
    Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider
  } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { getExampleCommunities } from '../Example';
import { getAllCommunities, getPicture } from '../CommunityAPI';
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
      <Flex marginX='auto' justifySelf='center' alignSelf='center'
      width='fit-content' maxWidth={['', '60vw']} overflow='hidden' flexDirection={'column'}>
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
function Module({community}: any) {
  const picture: string = getPicture(community);
  return(<Box as={Link} to={`/community1/${community.name}`}>
      <Card paddingY='10px'>
        <HStack overflow='hidden'>
            
          <Image src={picture} marginY='auto'
            alt={`${community.name} picture`}
            boxSize='20%'
            maxWidth='100px'
            borderRadius='lg'/>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{community.name}</Heading>
            <Text width='inherit'>
              {community.description}
            </Text>
            <Text color='blue.600' fontSize='xl'>
              Members: {community.members.length}
            </Text>
          </Stack>
        </HStack>
      </Card>
  </Box>)
}