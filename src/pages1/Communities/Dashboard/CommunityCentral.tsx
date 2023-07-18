import {
    Box,
    Button, Card, useClipboard, Icon, useColorMode, Flex, HStack, Heading, List, Stack, Text, Image, Divider, VStack, CardHeader, useColorModeValue, Spacer, Spinner, IconButton, Menu, MenuButton, MenuItem, MenuList
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { getAllCommunities, getJoinedCommunities, getPicture, getRequestedCommunities, joinCommunity, leaveCommunity } from '../CommunityAPI';
import Calendar from '../../../pages/Calendar';
import { supabase } from '../../../supabase';
import { RxExit } from 'react-icons/rx'
import { LinkIcon, EditIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'


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

    return(<Flex>
        <Stack marginX='auto'
        flexWrap='wrap'
        flexDirection={['column', 'row']} 
        justifyContent='center'>
            <CommunityList/>
            <CommunitySuggested communities={communities} />
        </Stack>
        
    </Flex>);
}




//Listing for all communities user has joined or requested
export function CommunityList() {

    //get the communities to display
    useEffect(() => {
        const fetchCommunityData = async() => {
            toggleType(type)
            
        };
        fetchCommunityData();
    }, []);

    //what did the user press joined/requested communities?
    const [type, setType] = useState<String>('joined');
    const [loading, setLoading] = useState<Boolean>(true);

    const toggleType = async(requestedType: String) => {
        setLoading(true)

        //logic to display kind of communities user wants to show
        const { data: { user } } = await supabase.auth.getUser();
        setType(requestedType)
        if (requestedType == 'joined') {
            getJoinedCommunities(user?.id).then((response) => {
                setCommunities(response)
                setLoading(false)
            })
        } else if (requestedType == 'requested') {
            getRequestedCommunities(user?.id).then((response) => {
                console.log(response)
                setCommunities(response)
                setLoading(false)
            })
        } else {
            setLoading(false)
            return null
        }
    }


    //Could be joined communities or requested communities
    const [communities, setCommunities] = useState<any>(null);


    return (<Box width={['400px', '600px']}>
        <Card height='80px' 
            justifySelf='center' 
            alignSelf='center' 
            
            overflow='hidden' 
            flexDirection={'column'}>
                <CardHeader display="flex" justifyContent="space-between">
                    <Button variant="ghost" colorScheme="blue" width='fit-content' 
                    onClick={()=>toggleType('joined')}>
                        Joined
                    </Button>
                    <Button variant="ghost" colorScheme="blue" width='fit-content'
                    onClick={()=> toggleType('requested')}>
                        Requested
                    </Button>
                    <Spacer/>
                    <Button variant="outline" colorScheme="blue" width='fit-content'
                    onClick={()=> toggleType('create')}>
                        Create
                    </Button>
                </CardHeader>
            </Card>
            <Box>
                {/* Display spinner when loading */}
               {loading ? 
                    <Flex paddingTop='60px' justifyContent='center' >
                        <Spinner speed='1s' size='xl' />
                        
                        <Spinner position='absolute'
                            speed='1.1s' size='xl' color='yellow' />
                    </Flex> : 
                communities ? communities.map((community: any, index: Number) => (
                <Module key={index} community={community}/> )):
                <Heading paddingY='20px'>
                    Where are your communities?!
                </Heading>
                }
               
            </Box>

        
        
        </Box>
        
    );
}
//to be used as the button UI to direct to the community
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
    const link = `https://goaltac.net/community1/${community.name}`
    const { onCopy } = useClipboard(link);
    const navigate = useNavigate();

    function Options() {
        return(<Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='ghost'/>
            <MenuList>
              <MenuItem icon={<LinkIcon />}
                onClick={() => {
                    onCopy()
                    //send successful copied toast
                }}>Copy link
              </MenuItem>
              <MenuItem icon={<RxExit />} 
                onClick={async()=>{
                    const { data: { user } } = await supabase.auth.getUser();
                    leaveCommunity(community.uuid, user?.id)
                    //send a successful leave toast
                }}>Leave
              </MenuItem>
            </MenuList>
          </Menu>);
    }

    return(<HStack overflow='hidden' padding='20px' boxShadow='xl' borderRadius='20px'>
        <Box borderRadius='full'
        marginY='auto'
        overflow='hidden'
        backgroundColor={useColorModeValue('gray.100', 'gray.700')} position='absolute'>
            <Box height='80px' width='80px'>
                <Image src={picture} 
            alt={`${community.name} picture`}/>
            </Box>
        </Box>

        <Stack as={Link} to={`/community1/${community.name}`} marginStart='6rem'>
            <Box lineHeight='12px'>
                <Heading fontSize='1.5rem'>{community.name}</Heading>
                <Text color='gray' fontSize='1rem'>
                    {community.members.length} members
                </Text>
            </Box>
            
            <Text color='gray.400' marginStart='1.5rem' fontSize='1rem'>
                {community.description}
            </Text>
        </Stack>
        <Spacer/>
        <Options/>
    </HStack>)
}





//sugested communities on the side content
export function CommunitySuggested({communities}: any) {
    return(<Box width={['','600px','fit-content']}>
        <Card height='80px' marginBottom='20px'>
            <CardHeader display="flex" 
            justifyContent="space-between" 
            fontSize='2xl' margin='auto'>
                Suggested
            </CardHeader>
        </Card>
        <Box marginX='10px'>
            {communities && communities.map((community: any, index: Number) => (
            <ModulePreview key={index} community={community} preview={true}/>))}
        </Box>

        </Box>)
}
/**
 * Component to display community in the suggested list
 *  
 * @param {*} community object
 * @returns A module to display in the dashboard
 */
export function ModulePreview({community}: any) {
    const picture: string = getPicture(community);
    const navigate = useNavigate();


    return(<HStack paddingBottom='10px'>
        <Box borderRadius='full'
            as={Link} 
            to={`/community1/${community.name}`}
            borderWidth='2px' 
            marginBottom='auto'>
                <Box height='50px' width='50px'>
                    <Image src={picture} 
                alt={`${community.name} picture`}/>
                </Box>
                
        </Box>
        <VStack overflow='hidden' as={Link} to={`/community1/${community.name}`}>
            <Box>
            <Heading size='md'>{community.name}</Heading> 
            <Text color='gray' fontSize='sm'>
                    {community.members.length} members
                </Text>
            </Box>
            
            <Button marginRight='auto' 
            borderRadius='full' 
            onClick={async()=>{
                const { data: { user } } = await supabase.auth.getUser();
                joinCommunity(community.uuid, user?.id)
                navigate(`/community1/${community.name}`);
                //send a successful join toast
            }}
            variant='outline'>Join</Button>
        </VStack> 
    </HStack>)
}