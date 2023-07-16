import {
    Box,
    Button, Card, Flex, HStack, Heading, List, Stack, Text, Image
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import CommunityList from './CommunityList';
import { useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { getAllCommunities, getPicture } from '../CommunityAPI';
import Calendar from '../../../pages/Calendar';


/**
 * Brings all components of community page together
 * @returns Dashboard page
 */
export default function CommunityCentral() {

    //get all the communities to display
    useEffect(() => {
        const fetchCommunityData = async() => getAllCommunities().then((response) => {
            setCommunities(response)
            }
        );
        fetchCommunityData();
    }, []);

    const [communities, setCommunities] = useState<any>(null);

    return(<Box borderWidth='2px' alignItems='center'>
        <Stack marginX='auto' flexDirection={['column', 'row']} width='fit-content'>
            <CommunityList communities={communities}/>
            <CommunitySuggested communities={communities} />
        </Stack>
        
    </Box>);
}

export function CommunitySuggested({communities}: any) {
    return(<Box width='200px'>
        <Heading height='100px'>
            Suggested
        </Heading>
        
        {communities && communities.map((community: any, index: Number) => (
            <ModulePreview key={index} community={community} preview={true}/>
        ))}
    </Box>)
}

export function CommunityCentralButton() {
    return(<Link to='/communities1'>
        <Button>
            Community
        </Button>
    </Link>);
}

/**
 * Component to display community in the community list
 *  
 * @param {*} community object
 * @returns A module to display in the dashboard
 */
export function Module({community}: any) {
    const picture: string = getPicture(community);
    return(<Box as={Link} to={`/community1/${community.name}`}>
        <Card paddingY='10px'>
          <HStack overflow='hidden'>
              
            <Box borderRadius='full'
            overflow='hidden'
            borderWidth='2px' 
            marginY='auto'
            height='100px' 
            width='100px'>
              <Image src={picture}
              alt={`${community.name} picture`}/>
            </Box>
            
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

  /**
 * Component to display community in the community list
 *  
 * @param {*} community object
 * @returns A module to display in the dashboard
 */
export function ModulePreview({community}: any) {
    const picture: string = getPicture(community);
    return(<Box as={Link} to={`/community1/${community.name}`}>
        <Card paddingY='10px'>
          <HStack overflow='hidden'>
              
            <Box borderRadius='full'
            overflow='hidden'
            borderWidth='2px' 
            marginY='auto'
            height='50px' 
            width='50px'>
              <Image src={picture}
              alt={`${community.name} picture`}/>
            </Box>
            
            <Heading size='md'>{community.name}</Heading>
              
          </HStack>
        </Card>
    </Box>)
  }