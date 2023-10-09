import { useColorMode, Flex, Box, Image, Avatar, Menu, MenuButton, MenuList, MenuItem, Switch, IconButton, InputGroup, InputLeftElement, Input, Icon, useMediaQuery, Button, Badge, AvatarBadge, useColorModeValue, Stack, LightMode, Tooltip, HStack, Heading, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, SkeletonText, ModalContextProvider, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaRegNewspaper, FaSearch, FaUsers, FaShoppingBag, FaCircle, FaThumbtack } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from '../supabase';
import { SessionProvider, useSession, useSupabaseClient } from "../hooks/SessionProvider";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from './../images/logo.png'
import { RiDashboard2Fill, RiDashboardLine, RiFeedbackFill } from "react-icons/ri";
import { AiFillDashboard, AiTwotoneDashboard } from "react-icons/ai";
import { TbLayoutDashboard } from "react-icons/tb";

//change the color theme for light mode from white to gray.50
export default function Root() {
  const { user: user, profile: profile } = useSession();
  const userName = profile?.['username']
  const  useSupabase: any  = useSupabaseClient();

  function HeaderNav() {

    const { colorMode, toggleColorMode } = useColorMode();
    const [inputValue, setInputValue] = useState('');
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const [avatarUrl, setAvatarUrl] = useState(profile?.['avatarurl']);
    const [points, setPoints] = useState(profile?.['points']);

    // to search and open new link
    const navigate = useNavigate();

    const { onOpen: help_OnOpen, onClose: help_onClose, isOpen: help_isOpen} = useDisclosure()

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
      }
      navigate('/login');
    };

    // Handles the search bar changing its value
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    // Handle search and Hides and shows the search bar
    const [showSearchBar, setShowSearchBar] = useState(true);
    const handleButtonClick = () => {
      if (isLargerThan768 || !showSearchBar && inputValue !== '')
        navigate(`/search/${inputValue}`);

      setShowSearchBar(!showSearchBar);
    };

    useEffect(()=>{
      const profileChange = useSupabase.channel('profileChanges').on('postgres_changes',{
        schema: 'public', // Subscribes to the "public" schema in Postgres
        event: '*',       // Listen to all changes
        table: 'profiles', filter: `userid=eq.${user?.['id']}`
      },(payload: any) => {
          setPoints(payload.new.points)
      }).subscribe()

      return () => {
        profileChange.unsubscribe()
        };
      },[])
    
    function FeedbackModal() {
      return <Modal isCentered scrollBehavior='inside' size='3xl' isOpen={help_isOpen} onClose={help_onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='18px'>
            <Flex>
                <Text>
                  Provide feedback to be rewarded up to 50
                </Text>
                <Flex marginTop='5px' marginX='6px'>
                  <FaThumbtack color='#4299E1'/>
                </Flex>
                <Text>
                  (repeatable)
                </Text>
              </Flex>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginX='auto' width='100%' justifyContent='center' alignItems='center'>
            <Box maxWidth='full'>
              <iframe onLoad={()=>console.log('hi')} width='100%' height='700px' src="https://docs.google.com/forms/d/e/1FAIpQLSdNIAaLRtEWnZq2w1lcSXVJPx1MhFJhIni8coTjK8WDFoZ7uw/viewform?embedded=true">
                <Skeleton>
                  <SkeletonText width='full' top='0'></SkeletonText>
                </Skeleton>
              </iframe>
            </Box>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={help_onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    }


    return (<Flex bg={colorMode === "light" ? 'gray.50' : 'gray.700'}
          p={1} marginBottom='10px'
          pl={2}
          alignItems="center"
          position='sticky'
          top={0}
          zIndex={10}>

          {/* logo to link to home (dashboard) */}
          <Tooltip label='Home' hasArrow fontSize='12px'>
          <Box display={showSearchBar ? 'block' : 'none'} position={"relative"}>
            
            <Link to="/home">
              <Image src={logo} alt="Logo" boxSize="40px" minWidth="40px" />
            </Link>
          </Box></Tooltip>

          {/* logo to link to home (dashboard) */}
          <Tooltip label='Dashboard' hasArrow fontSize='12px'>
          <Box  mr='auto' pl={'30px'} display={showSearchBar ? 'block' : 'none'} position={"relative"}>
            <Link to="/dashboard">
              <IconButton aria-label="dashboard" variant='unstyled' fontSize='3xl' icon={<TbLayoutDashboard/>}/>
            </Link>
          </Box></Tooltip>

          {/* Searchbar (changes depending on screen size)*/}
          <Tooltip label='Search tasks, people, and others soon'>
            {isLargerThan768 ? (
            <Flex justifyContent="center" width="80%">
              <InputGroup w="50%">
                <Input isDisabled bg={colorMode === "light" ? 'gray.200' : 'gray.800'} type="text" value={inputValue}
                  onChange={handleInputChange} placeholder="Search" m={.5} />
                <IconButton isDisabled icon={<FaSearch />} color="gray.500" cursor="pointer" fontSize="2xl" mt={2.5} ml={2} onClick={() => {/* handleButtonClick */ } } aria-label={""} />
              </InputGroup>
            </Flex>
          ) : (
            <Box>
              <InputGroup>
                <Input isDisabled bg={colorMode === "light" ? 'gray.200' : 'gray.800'} type="text" value={inputValue}
                  onChange={handleInputChange} placeholder="Search" display={showSearchBar ? 'none' : 'block'} width="80vw" />
                <IconButton isDisabled type="submit" color="gray.500" aria-label="Search" onClick={handleButtonClick} bg="none" fontSize="xl" ml={1} background="none" icon={<FaSearch />}/>
              </InputGroup>
            </Box>
          )}
          </Tooltip>
          
          {/**
           * 
           * <Box ml='auto' pr={'30px'}>
            <IconButton as={Link} to="/community" aria-label="Social" icon={<FaUsers />} fontSize="3xl" background="none" display={showSearchBar ? 'flex' : 'none'} float={"right"} />
          </Box>
           * 
           */}
          <Popover>
              <PopoverTrigger>
                <HStack cursor='pointer' flexDir='row' ml='auto' marginRight='10px'>
                  <Heading fontSize='1rem'>{points ? points : 0}</Heading>
                  <FaThumbtack color='#4299E1'/>
                </HStack>
              </PopoverTrigger>
              <PopoverContent borderColor='black' marginRight={['','50px']}>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Tacs Economy
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                <List spacing='0.75rem'>
                  <ListItem>
                    <ListIcon as={FaThumbtack} color='green.500' />
                    Receive likes on your post
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaThumbtack} color='green.500' />
                    Receive donations from your post
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaThumbtack} color='green.500' />
                    Send feedback for up to 50 tacs
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaThumbtack} color='red.500' />
                    Post a task for 5 tacs
                  </ListItem>
                  {/* You can also use custom icons from react-icons */}
                  <ListItem>
                    <ListIcon as={FaThumbtack} color='red.500' />
                    Encourage others by donating a tac to their post
                  </ListItem>
                </List>
                </PopoverBody>
              </PopoverContent>
            </Popover>



          {/* Profile */}
          <Tooltip label='Profiles' hasArrow fontSize='12px'>

          <Box pr={2} ml='auto'>
            <Menu>
              <MenuButton as={Avatar} size="sm" cursor="pointer" src={avatarUrl}/>
              <MenuList>
                  <MenuItem icon={<Avatar src={profile?.['avatarurl']} />} onClick={()=>navigate(`/profile/${userName}`)} fontSize="md" fontWeight='500'>
                    Your Profile
                  </MenuItem>
                  {/**
                   * <MenuItem icon={<FaShoppingBag />} onClick={()=>navigate('/market')} fontSize="sm">
                    Market
                  </MenuItem>
                   */}
                  

                  <MenuItem icon={<FaUser />} onClick={()=>navigate('/settings')} fontSize="sm">
                    Settings
                  </MenuItem>
                  <MenuItem icon={<RiFeedbackFill />} onClick={help_OnOpen} fontSize="sm">
                    Feedback <FeedbackModal/>
                  </MenuItem>

                  <MenuItem icon={colorMode=='dark' ? <MoonIcon/> : <SunIcon/>} onClick={toggleColorMode} fontSize="sm">
                    {colorMode=='dark' ? 'Dark Mode' : 'Light Mode'}
                    <Switch float='right' isChecked={colorMode === "dark"}  />
                  </MenuItem>

                <MenuItem icon={<FaSignOutAlt />} fontSize="sm" onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box></Tooltip>
        </Flex>);
  }
  return (
    <SessionProvider supabase={supabase}>
      <Stack minHeight='100vh' position='relative'>
        {userName && <HeaderNav />}
        <Box>
          <Outlet />
        </Box>
      </Stack>
    </SessionProvider>
  );
};

