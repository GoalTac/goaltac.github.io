import { useColorMode, Flex, Box, Image, Avatar, Menu, MenuButton, MenuList, MenuItem, Switch, IconButton, InputGroup, InputLeftElement, Input, Icon, useMediaQuery, Button, Badge, AvatarBadge, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaRegNewspaper, FaSearch, FaUsers, FaShoppingBag, FaCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from '../supabase';
import { SessionProvider } from "../hooks/SessionProvider";

export default function Root() {
  return (
    <SessionProvider supabase={supabase}>
      <Box backgroundColor={useColorModeValue('gray.50','')}>
        <HeaderNav />
        <Box marginTop='30px' overflowX='auto'>
          <Outlet />
        </Box>
      </Box>
      
      
    </SessionProvider >
  );
};

export function HeaderNav() {

  const { colorMode, toggleColorMode } = useColorMode();
  const [inputValue, setInputValue] = useState('');
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [avatarUrl, setAvatarUrl] = useState('');

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

  // get avatar url
  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('avatarurl')
        .eq('userid', user?.id)

      if (error) {
        console.log(error);
      } else {
        //console.log(data);
        setAvatarUrl(data[0].avatarurl)
      };
    }
    getProfile()
  }, []);

  return (<Flex
        bg={colorMode === "light" ? 'gray.50' : 'gray.700'}
        p={1}
        pl={2}
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={10}>

        {/* logo to link to home (calendar) */}
        <Box display={showSearchBar ? 'block' : 'none'} position={"relative"}>
          <Badge position={"absolute"} right={-1} bottom={-1} bg={"rgb(15,15,15,.2)"} fontSize={'10px'}>10000</Badge>
          <Link to="/calendar">
            <Image src="/logo.png" alt="Logo" boxSize="40px" minWidth="40px" />
          </Link>
        </Box>

        {/* Link to Social */}
        <IconButton as={Link} to="/social" aria-label="Social" icon={<FaRegNewspaper />} fontSize="3xl" mr={9} ml={9} background="none" display={showSearchBar ? 'flex' : 'none'} />

        {/* Searchbar (changes depending on screen size)*/}
        {isLargerThan768 ? (
          <Flex justifyContent="center" width="80%">
            <InputGroup w="50%">
              <Input bg={colorMode === "light" ? 'gray.200' : 'gray.800'} type="text" value={inputValue}
                onChange={handleInputChange} placeholder="Search" m={.5} />
              <Icon as={FaSearch} color="gray.500" cursor="pointer" fontSize="2xl" mt={2.5} ml={2} onClick={handleButtonClick} />
            </InputGroup>
          </Flex>
        ) : (
          <Box>
            <InputGroup>
              <Input bg={colorMode === "light" ? 'gray.200' : 'gray.800'} type="text" value={inputValue}
                onChange={handleInputChange} placeholder="Search" display={showSearchBar ? 'none' : 'block'} width="80vw" />
              <IconButton type="submit" aria-label="Search" onClick={handleButtonClick} bg="none" fontSize="xl" ml={1} background="none"><FaSearch /></IconButton>
            </InputGroup>
          </Box>
        )}

        <Box position={'relative'}>
          <IconButton as={Link} to="/communities" aria-label="Social" icon={<FaUsers />} fontSize="3xl" background="none" display={showSearchBar ? 'flex' : 'none'} float={"right"} ml={9} mr={9} />
          <Box as={FaCircle} color="red.500" position={'absolute'} right={8} bottom={0} size={'.8em'}/>
        </Box>


        {/* Profile */}
        <Box ml="auto" pr={2} display={showSearchBar ? 'block' : 'none'}>
          <Menu>
            <MenuButton as={Avatar} size="sm" cursor="pointer" src={avatarUrl}>
              <AvatarBadge boxSize='1.25em' bg='red.500' />
            </MenuButton>
            <MenuList>
              <Link to="/market"><MenuItem icon={<FaShoppingBag />} fontSize="sm">Market<Badge float={"right"} m={1}>242,301 pts</Badge></MenuItem></Link>
              <Link to="/settings"><MenuItem icon={<FaUser />} fontSize="sm">Settings<Box as={FaCircle} color="red" float={"right"} m={1} /></MenuItem> </Link>
              <MenuItem icon={<FaSignOutAlt />} fontSize="sm" onClick={handleLogout}>Logout</MenuItem>
              <MenuItem fontSize="sm">Dark Mode<Switch ml="auto" isChecked={colorMode === "dark"} onChange={toggleColorMode} /></MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>);
}