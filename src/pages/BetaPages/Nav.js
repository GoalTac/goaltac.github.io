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
      alignItems="center"
      boxShadow={scroll ? 'base' : 'none'}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="100%"
      bg={scroll ? 'whiteAlpha.500' : ''}
      opacity='0.9'
      transitionDuration='500ms'
    >
      <Flex ml={20}>
        <Img src={logo} alt="logo" width="50%" height="50%"/>
      </Flex>

      <Spacer />
      
      <Flex alignItems="center">

        <IconButton
          variant="unstyled"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
          />

      </Flex>
    </Flex>
  );
};

export default Nav;