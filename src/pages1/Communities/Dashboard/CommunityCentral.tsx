import {
    Box,
    Button, Card, useToast, useClipboard, Icon, useColorMode, Flex, HStack, Heading, List, Stack, Text, Image, Divider, VStack, CardHeader, useColorModeValue, Spacer, Spinner, IconButton, Menu, MenuButton, MenuItem, MenuList, FormControl, FormLabel, Input, Radio, RadioGroup, Textarea
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { Community, _addCommunity, _addMember, _getAllCommunities, _getAllMembers, _getJoinedCommunities, _getMembers, _getRequestedCommunities, _getUnJoinedCommunities, _removeMember, _setMember, getCommunity, getCommunityByName, getPicture, measurements } from '../CommunityAPI';
import Calendar from '../../../pages/Calendar';
import { supabase } from '../../../supabase';
import { RxExit } from 'react-icons/rx'
import { LinkIcon, EditIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { SessionProvider, useSession } from '../../../hooks/SessionProvider';
import { twoColumns } from '../../../hooks/Utilities';


/**
 * Brings all components of community page together
 * @returns Dashboard page
 */
//TODO: Need to get this to auto update when someone leaves their community
export default function CommunityCentral() {
    const { user: user } = useSession();
    const toast = useToast();

    function CommunityList() {
        //Could be joined communities or requested communities
        const [communities, setCommunities] = useState<any>(null);
        const [view, setView] = useState<ReactElement>();
        const [type, setType] = useState<String>('joined');
        const [loading, setLoading] = useState<Boolean>(true);

        useEffect(()=> {
            
            if(loading) {
                setLoadingView()
                //first time loading the web page
                if (!view) {
                    setJoinedView()
                    return
                }
            }
        },[])

        function Module({community}: any) {
            const picture: string = getPicture(community);
            const link = `https://goaltac.net/community/${community.name}`
            const { onCopy } = useClipboard(link);
            const { user: user } = useSession();
            const [members, setMembers] = useState<any>([])
            
            useEffect(()=> {
                async function getMembers() {
                    setMembers(await _getAllMembers(community.community_id))
                }
                getMembers()
                
            },[])
        
            
            return(
            <HStack overflow='hidden' padding='20px' borderRadius='20px' 
            borderWidth='1px' marginY={measurements.general.rowGap}>
                <Box borderRadius='full' alignSelf='baseline'
                overflow='hidden'
                backgroundColor={useColorModeValue('gray.100', 'gray.700')} 
                position='absolute'>
                    <Box height='80px' width='80px'>
                        <Image src={picture} 
                        alt={`${community.name} picture`}/>
                    </Box>
                </Box>
        
                <Stack as={Link} to={`/community/${community.name}`} marginStart='6rem'>
                    <Box lineHeight='12px'>
                        <Heading fontSize='1.5rem'>{community.name}</Heading>
                        <Text color='gray' fontSize='1rem'>
                            {members.length} members
                        </Text>
                    </Box>
                    
                    <Text color='gray.400' maxWidth='300px' overflow='hidden' marginStart='1.5rem' fontSize='1rem'>
                        {community.description}
                    </Text>
                </Stack>
                <Spacer/>
                <Menu>
                    <MenuButton
                    alignSelf='baseline'
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='ghost'/>
                    <MenuList>
                    <MenuItem icon={<LinkIcon />}
                        onClick={() => {
                            onCopy()
                            
                        }}>Copy link
                    </MenuItem>
                    <MenuItem icon={<RxExit />} 
                        onClick={()=>{ 
                            if(user) {
                                _removeMember(community.community_id, user?.['id']).finally(()=>{
                                    setJoinedView() 
                                })
                               
                            }
                            toast({
                                title: "Success",
                                description: `Left ${community.name}`,
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        }}>Leave
                    </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>)
        }

        async function setJoinedView() {
            setLoading(true)
            setType('joined')
            const promisedCommunities = await _getJoinedCommunities(user?.['id']).finally(()=> {
                setLoading(false)
            })
            setCommunities(promisedCommunities)
            setView(<Box>
                {promisedCommunities.map((community: any, index: Number) => (
                    <Module key={index} community={community}/> 
                ))}
            </Box>) 
        }
        async function setRequestedView() {
            setLoading(true)
            setType('requested')
            const promisedCommunities = await _getRequestedCommunities(user?.['id']).finally(()=> {
                setLoading(false)
            })
            setCommunities(promisedCommunities)
            setView(<Box>
                {promisedCommunities.map((community: any, index: Number) => (
                    <Module key={index} community={community}/> 
                ))}
            </Box>) 
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
                        onClick={()=> {
                            setType('create')
                            setView(<CreateView/>)
                        }}>
                            Create
                        </Button>
                    </CardHeader>
                </Card>
                {view}
            </Box>);
    }   

    //sugested communities on the side content
    function CommunitySuggested() {
        const [communities, setCommunities] = useState<any>([]);

        useEffect(()=>{
            async function fetchCommunities() {
                setCommunities(await _getUnJoinedCommunities(user?.['id']))
            }
            fetchCommunities()
        },[])

        function ModulePreview({community}: any) {
            const picture: string = getPicture(community);
            const navigate = useNavigate();
            const [members, setMembers] = useState<any>([])

            useEffect(()=> {
                async function fetchMembers() {
                    setMembers(await _getAllMembers(community.community_id))
                }
                fetchMembers()
            },[])

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
                            {members.length} members
                        </Text>
                    </Box>
                    
                    <Button marginRight='auto' 
                    borderRadius='full' 
                    onClick={()=>{
                        if (user) {
                            _addMember({
                                community_id : community.community_id, 
                                user_id : user?.['id']})
                            navigate(`/community/${community.name}`);
                        }
                        //send a successful join toast
                    }}
                    variant='outline'>Join</Button>
                </VStack> 
            </HStack>)
        }
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
    function CreateView() {
        const [name, setName] = useState<any>('');
        const [description, setDescription] = useState<any>('');
        const [pic, setPic] = useState<any>(null);
        const [isPublic, setIsPublic] = useState<any>(true);

        const [community_id, setCommunity_id] = useState<any>('');
        const [points, setPoints] = useState<any>(0);
        const [role, setRole] = useState<any>(0);
        const [status, setStatus] = useState<any>(1); //joined
    
        const handleAddCommunity = async() => {
            _addCommunity({
                name: name,
                description: description,
                pic: pic,
                score: 0,
                isPublic: isPublic,
            }).then((response : any)=>{ //fix this setting community id to the wrong id

                if(response.message) {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                const uuid = response?.['community_id']
                const addedMember = _addMember({
                    community_id: uuid, 
                    user_id: (user ? user?.['id'] : ''),
                    role: 'Owner'
                })
                addedMember.then((response : any)=> {
                    if(response.message) {
                        toast({
                            title: "Error",
                            description: response.message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: "Success",
                            description: `Successfully created ${name}`,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                })
                
                setName('')
                setDescription('')
                setPic('')
                setIsPublic('')

            })
            
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
                <Button colorScheme="blue" mt={3} onClick={handleAddCommunity}>
                    {'Save'}
                </Button>
            </Box>
        )
    }

    return(
        twoColumns(<CommunityList/>, <CommunitySuggested/>)
    );
}