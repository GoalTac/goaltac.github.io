import React from 'react';
import {
  Button,
  Box,
  Spacer,
  Img,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spinner,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import logo from '../../../images/GoalTac_Logo.png';
import hamburgerIcon from '../resources/images/icon-hamburger.svg';
import closeIcon from '../resources/images/icon-close.svg';
import imgBg from '../resources/images/bg-tablet-pattern.svg';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

function Header({ showMenu, openModal, sections, toggleModal }) {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false); //for login loading
  const loading = () => {
    setIsLoading(true);
    console.log(isLoading);
  };

  return (
    <>
      {showMenu ? (
        <Flex
          justify='space-between'
          alignItems='center'
          px='3rem'
          py='2rem'
          width='100%'
          _after={{
            content: "''",
            background: `no-repeat url(${imgBg})`,
            position: 'absolute',
            left: '46%',
            top: '-110px',
            zIndex: '-2',
            width: '100%',
            height: '100%',
          }}
        >
          <Image src={logo} boxSize='20%' pr='2px' />
          <Spacer />
          <HStack>
            {sections.map((section, index) => {
              return (
                <Link
                  to={`${section.href}`}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                >
                  <Button variant='ghost' key={index}>
                    {section.name}
                  </Button>
                </Link>
              );
            })}
          </HStack>
          <Spacer />

          <Button
            variant='solid'
            fontWeight='800'
            onClick={loading}
            bgClip='text'
            bgGradient='linear(to-l, teal.300, blue.500)'
            bgColor='white'
            borderRadius='30px'
            boxShadow='0 4px 4px gray'
            _hover={{
              boxShadow: '0 1px 1px gray',
            }}
          >
            <Link as={Link} to='/signin'>
              {isLoading == true ? <Spinner /> : 'Sign In'}
            </Link>
          </Button>
        </Flex>
      ) : (
        <Flex
          justify='space-between'
          alignItems='center'
          px='1rem'
          py='3rem'
          _after={{
            content: "''",
            background: `center/104% no-repeat url(${imgBg})`,
            position: 'absolute',
            left: '12%',
            top: '-5%',
            zIndex: '-2',
            width: '134%',
            height: '18%',
          }}
        >
          <Image
            src={logo}
            width='45%'
            height='45%'
            pt='6px'
            position='relative'
            zIndex='100'
          />
          <Button
            variant='icon'
            onClick={() => {
              toggleModal();
            }}
            paddingInlineStart='0'
            paddingInlineEnd='0'
            minWidth='0'
          >
            {openModal ? (
              <Image src={closeIcon} position='relative' zIndex='100'></Image>
            ) : (
              <Image src={hamburgerIcon}></Image>
            )}
          </Button>
        </Flex>
      )}
    </>
  );
}

export { Header };
