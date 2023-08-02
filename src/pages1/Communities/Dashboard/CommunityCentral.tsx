import {
    Box,
    Button, Card,useToast, useClipboard, Icon, useColorMode, Flex, HStack, Heading, List, Stack, Text, Image, Divider, VStack, CardHeader, useColorModeValue, Spacer, Spinner, IconButton, Menu, MenuButton, MenuItem, MenuList, FormControl, FormLabel, Input, Radio, RadioGroup, Textarea
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { Community, _addCommunity, _addMember, getAllCommunities, getCommunity, getJoinedCommunities, getPicture, getRequestedCommunities, getTotalMembers, leaveCommunity } from '../CommunityAPI';
import Calendar from '../../../pages/Calendar';
import { supabase } from '../../../supabase';
import { RxExit } from 'react-icons/rx'
import { LinkIcon, EditIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { SessionProvider, useSession } from '../../../hooks/SessionProvider';
import { toastError, toastSuccess } from '../../../hooks/Utilities';


/**
 * Brings all components of community page together
 * @returns Dashboard page
 */
//TODO: Need to get this to auto update when someone leaves their community
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
        paddingBottom='100px'
        flexWrap='wrap'
        maxWidth='1200px'

        flexDirection={['column', 'row']} 
        justifyContent='center'>
            <CommunityList/>
            <CommunitySuggested communities={communities} />
        </Stack>
        
    </Flex>);
}




//Listing for all communities user has joined or requested
/**
 * NEEDS TO BE COMPLETELY CHANGED
 * SET A VAR TO {view} and set view to the react element
 * @returns 
 */
export function CommunityList() {

    //Could be joined communities or requested communities
    const [communities, setCommunities] = useState<any>(null);
    const [view, setView] = useState<ReactElement>();
    const [type, setType] = useState<String>('joined');
    const [loading, setLoading] = useState<Boolean>(true);
    const { user: user } = useSession();
    const navigate = useNavigate()

    useEffect(()=> {
        if(loading) {
            //first time loading the web page
            if (!view) {
                setJoinedView()
            } else {
               setLoadingView() 
            }
        }
        if(!communities) {
            setBlankView()
        }
    },[loading, type])

    function setJoinedView() {
        setLoading(true)
        setType('joined')
        getJoinedCommunities(user?.['id']).then((response) => {
            setCommunities(response)

            //sets the view variable to a box of joined communities
            response ? setView(
                <Box>
                {response?.map((community: any, index: Number) => (
                    <Module key={index} community={community}/> 
                ))}
                </Box>
            ) : setBlankView()
            setLoading(false)
        })
    }
    function setRequestedView() {
        setLoading(true)
        setType('requested')

        getRequestedCommunities(user?.['id']).then((response) => {
            setCommunities(response)
            
            //sets the view variable to a box of the requested modules
            response ? setView(
                <Box>
                {response?.map((community: any, index: Number) => (
                    <Module key={index} community={community}/> 
                ))}
                </Box>
            ) : setBlankView()
            setLoading(false)
        })
    }
    function setLoadingView() {
        setType('loading')

        setView(
            <Flex paddingTop='60px' justifyContent='center' >
                <Spinner speed='1s' size='xl' />
            </Flex>
        )
    }
    function setBlankView() {
        setType('blank')

        setView(<Heading paddingY='20px'>
            Where are your communities?!
        </Heading>)
    }
    function resetView() {
        setType('joined')

        setLoading(true)
        setCommunities(null)
        setLoading(false)
    }

    return (<Box width={['400px', '600px']}>
        <Card height='80px' 
            justifySelf='center' 
            alignSelf='center' 
            
            overflow='hidden' 
            flexDirection={'column'}>
                <CardHeader display="flex" justifyContent="space-between" columnGap='20px'>
                    <Button variant="ghost" colorScheme="blue" width='fit-content' 
                    isActive={type == 'joined'}
                    onClick={()=>setJoinedView()}>
                        Joined
                    </Button>
                    <Button variant="ghost" colorScheme="blue" width='fit-content'
                    isActive={type == 'requested'}
                    onClick={()=> setRequestedView()}>
                        Requested
                    </Button>
                    <Spacer/>
                    <Button variant="outline" colorScheme="blue" width='fit-content'
                    isActive={type == 'create'}
                    onClick={()=> setView(<CreateView/>)}>
                        Create
                    </Button>
                </CardHeader>
            </Card>
            {view}

        
        
        </Box>
        
    );
}
//to be used as the button UI to direct to the community
export function CommunityCentralButton() {
    return(<Link to='/communities'>
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
    const link = `https://goaltac.net/community/${community.name}`
    const { onCopy } = useClipboard(link);
    const navigatse = useNavigate();
    const { user: user } = useSession();
//


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
                onClick={()=>{
                    if(user) {
                        leaveCommunity(community.communityid, user?.['id'])

                    }
                    //send a successful leave toast
                }}>Leave
              </MenuItem>
            </MenuList>
          </Menu>);
    }

    return(<HStack overflow='hidden' padding='20px' borderRadius='20px'>
        <Box borderRadius='full'
        marginY='auto'
        overflow='hidden'
        backgroundColor={useColorModeValue('gray.100', 'gray.700')} position='absolute'>
            <Box height='80px' width='80px'>
                <Image src={picture} 
            alt={`${community.name} picture`}/>
            </Box>
        </Box>

        <Stack as={Link} to={`/community/${community.name}`} marginStart='6rem'>
            <Box lineHeight='12px'>
                <Heading fontSize='1.5rem'>{community.name}</Heading>
                <Text color='gray' fontSize='1rem'>
                    {getTotalMembers(community).toString()} members
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

function CreateView() {
    const [name, setName] = useState<any>('');
    const [description, setDescription] = useState<any>('');
    const [pic, setPic] = useState<any>(null);
    const [tags, setTags] = useState<any>(null);
    const [isPublic, setIsPublic] = useState<any>(true);
    const { user: user } = useSession()

    
    const handleAddCommunity = async() => {
        const community = {
            created_at: new Date(),
            name: name,
            description: description,
            pic: pic,
            tags: tags,
            score: 0,
            isPublic: isPublic,
            owner: user?.['id'],
            members: [],
            Tasks: []
        }
        const { error } = await supabase.from('communities').insert([community]);
        if (error) {
            
        }
    }

    return(
        <Box padding='20px'>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" mr={3} onClick={handleAddCommunity}>
                {'Save'}
            </Button>
        </Box>
    )
}





//sugested communities on the side content
export function CommunitySuggested({communities}: any) {

    return(<Box width={['400px', 'auto']}>
        <Card height='80px'>
            <CardHeader display="flex" 
            justifyContent="space-between"
            fontSize='2xl' margin='auto'>
                Suggested
            </CardHeader>
        </Card>
        <Box padding='10px' boxShadow='lg'>
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
    const { user: user } = useSession();


    return(<HStack paddingBottom='10px'>
        <Box borderRadius='full'
            as={Link} 
            to={`/community/${community.name}`}
            borderWidth='2px' 
            marginBottom='auto'>
                <Box height='50px' width='50px'>
                    <Image src={picture} 
                alt={`${community.name} picture`}/>
                </Box>
                
        </Box>
        <VStack overflow='hidden' as={Link} to={`/community/${community.name}`}>
            <Box>
            <Heading size='md'>{community.name}</Heading> 
            <Text color='gray' fontSize='sm'>
                    {getTotalMembers(community).toString()} members
                </Text>
            </Box>
            
            <Button marginRight='auto' 
            borderRadius='full' 
            onClick={()=>{
                if (user) {
                    _addMember(community.communityid, user?.['id'])
                    navigate(`/community/${community.name}`);
                }
                //send a successful join toast
            }}
            variant='outline'>Join</Button>
        </VStack> 
    </HStack>)
}