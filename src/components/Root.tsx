import { useColorMode, Flex, Box, Image, Avatar, Menu, MenuButton, MenuList, MenuItem, Switch, IconButton, InputGroup, InputLeftElement, Input, Icon, useMediaQuery, Button, Badge, AvatarBadge, useColorModeValue, Stack, LightMode, Tooltip, HStack, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaRegNewspaper, FaSearch, FaUsers, FaShoppingBag, FaCircle, FaThumbtack } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from '../supabase';
import { SessionProvider, useSession, useSupabaseClient } from "../hooks/SessionProvider";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from './../images/logo.png'
import { RiDashboard2Fill, RiDashboardLine } from "react-icons/ri";
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
          
          <HStack flexDir='row' ml='auto' marginRight='10px'>
            <Heading fontSize='1rem'>{points ? points : 0}</Heading>
            <FaThumbtack/>
          </HStack>


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

