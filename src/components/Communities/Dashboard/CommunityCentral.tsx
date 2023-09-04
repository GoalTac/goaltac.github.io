import {
    Box,
    Button, Card, useToast, useClipboard, Icon, useColorMode, Flex, HStack, Heading, List, Stack, Text, Image, Divider, VStack, CardHeader, useColorModeValue, Spacer, Spinner, IconButton, Menu, MenuButton, MenuItem, MenuList, FormControl, FormLabel, Input, Radio, RadioGroup, Textarea, Tooltip, useDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormHelperText
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { Community, _addCommunity, _addMember, _getAllCommunities, _getAllMembers, _getJoinedCommunities, _getMembers, _getRequestedCommunities, _getUnJoinedCommunities, _removeMember, _setMember, getCommunity, getCommunityByName, getPicture, measurements } from '../CommunityAPI';
import Calendar from '../../../pages/Calendar';
import { supabase } from '../../../supabase';
import { RxExit } from 'react-icons/rx'
import { LinkIcon, EditIcon, HamburgerIcon, RepeatIcon, InfoIcon, CheckIcon, AddIcon } from '@chakra-ui/icons'
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
            const [members, setMembers] = useState<any>([])
            
            useEffect(()=> {
                async function getMembers() {
                    setMembers(await _getAllMembers(community.community_id))
                }
                getMembers()
                
            },[])
        
            
            return(
            <HStack overflow='hidden' padding='20px' borderRadius='20px' backgroundColor={useColorModeValue('white','blackAlpha.200')}
            borderWidth={useColorModeValue('1px','0px')} marginY={measurements.general.rowGap}>
                
        
                <Stack as={Link} to={`/community/${community.name}`}>
                    <Flex columnGap='20px'>
                        <Box borderRadius='full' alignSelf='baseline'
                        overflow='hidden'
                        backgroundColor={useColorModeValue('gray.100', 'gray.700')}>
                            <Box height='60px' width='60px'>
                                <Image src={picture} 
                                alt={`${community.name} picture`}/>
                            </Box>
                        </Box>
                        <Box lineHeight='12px'>
                            <Heading fontSize='1.5rem'>{community.name}</Heading>
                            <Text color='gray' fontSize='1rem'>
                                {members.length} members
                            </Text>
                        </Box>
                    </Flex>
                
                    
                    <Text color='gray.400' overflow='hidden' fontSize='1rem' marginStart='2rem'>
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
            console.log(promisedCommunities)
            if (promisedCommunities.length == 0) {
                setView(
                    <Flex marginX='auto' justifyContent={'center'} paddingTop='60px'>
                    <Heading fontSize='2xl'>
                        You have not requested any communities!
                    </Heading>
                    </Flex>
                )
            } else {
                setView(<Box>
                    {promisedCommunities.map((community: any, index: Number) => (
                        <Module key={index} community={community}/> 
                    ))}
                </Box>) 
            }
           
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
        function CommunityDrawer() {
            const { isOpen, onOpen, onClose } = useDisclosure()
            const btnRef = React.useRef(null)
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
                    onClose()
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
          
            return (
              <>
                <Button ref={btnRef} colorScheme='green' leftIcon={<AddIcon/>} onClick={onOpen}>
                  Create
                </Button>
                <Drawer
                  isOpen={isOpen}
                  placement='right'
                  onClose={onClose}
                  finalFocusRef={btnRef}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize='lg'>Create your Community</DrawerHeader>
          
                    <DrawerBody>
                        <Stack spacing='40px' fontSize='sm'>
                            <FormControl>
                                <FormLabel htmlFor='title'>Title</FormLabel>
                                <Input placeholder='New community' value={name} onChange={(e) => setName(e.target.value)}/>
                                <FormHelperText>Max of 20 characters</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea placeholder='What is your community about?' value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='image'>Upload logo</FormLabel>
                                <Input placeholder="Select a logo" isDisabled padding='10px' height='100%' alignSelf='center' size="sm" type="file" />
                            </FormControl>
                            
                        </Stack>
                            
                      
                    </DrawerBody>
          
                    <DrawerFooter>
                      <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme='blue' onClick={handleAddCommunity}>Save</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
            )
          }
        

        return (<Box width={['375px','700px']}>
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
                        
                        <CommunityDrawer/>
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
        return(<Flex flexDirection='column' rowGap={measurements.general.colGap}>
            <Card height='80px' position='relative'>
                <CardHeader display="flex" 
                justifyContent="space-between"
                fontSize='lg' margin='auto'>
                    Suggested
                </CardHeader>
                <Flex top='10px' right='10px' position='absolute' >
                    <Tooltip label='Unjoined communities' >
                        <InfoIcon boxSize={4} />
                    </Tooltip>
                </Flex>
               
                
            </Card>
            <Flex padding='10px' borderWidth='1px' flexDirection='column' borderRadius={measurements.cards.borderRadius}>
                {communities && communities.map((community: any, index: Number) => (
                <ModulePreview key={index} community={community} preview={true}/>))}
            </Flex>
        </Flex>)
    }

    return(
        twoColumns(<CommunityList/>, <CommunitySuggested/>)
    );
}