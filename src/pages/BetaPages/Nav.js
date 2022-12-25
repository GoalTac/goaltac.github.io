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
} from '@chakra-ui/react';
import logo from '../../images/GoalTac_Logo.png';


const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

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
      bg='blackAlpha.200'
      opacity='0.9'
    >
      <Flex>
        <Img src={logo} alt="logo" width="60%" height="60%"/>
      </Flex>

      <Spacer />
      
      <Flex alignItems="center">

        <Button ref={btnRef} mr={5} fontSize='xl' variant='contained' colorScheme='teal' onClick={onOpen}>
          About Us
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
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

        <Text fontSize="xl" fontWeight="bold">
          Coming soon!
        </Text>

      </Flex>
    </Flex>
  );
};

export default Nav;