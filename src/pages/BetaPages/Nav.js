import React, { useState } from 'react';
import {
  Text,
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Img,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import logo from '../../images/GoalTac_Logo.png';
import { FaMoon, FaSun } from 'react-icons/fa';


const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { toggleColorMode, colorMode } = useColorMode();

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener('scroll', changeScroll);

  return (
    <Flex
      h="10%"
      alignItems="center"
      boxShadow={scroll ? 'base' : 'none'}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="100%"
      bg={scroll ? 'blackAlpha.200' : ''}
      opacity='0.9'
      transitionDuration='500ms'
    >
      <Flex ml={30}>
        <Img src={logo} alt="logo" width="40%" height="40%"/>
      </Flex>

      <Spacer />
      
      <Flex alignItems="center">

        <IconButton
          variant="unstyled"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
          />

        <Button ref={btnRef} mr={5} fontSize='xl' variant='contained' onClick={onOpen}>
          About Us
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Text fontSize="xl" mr={3}>
          Coming soon!
        </Text>

      </Flex>
    </Flex>
  );
};

export default Nav;