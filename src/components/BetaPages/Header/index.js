import React from 'react';
import { Flex, Image, HStack, Button } from '@chakra-ui/react';
import logo from '../../../images/GoalTac_Logo.png';
import hamburgerIcon from '../resources/images/icon-hamburger.svg';
import closeIcon from '../resources/images/icon-close.svg';
import imgBg from '../resources/images/bg-tablet-pattern.svg';

import { Link, animateScroll as scroll } from 'react-scroll';

function Header({ showMenu, openModal, sections, toggleModal }) {
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
          <Image src={logo} boxSize='20%' pt='5px' />
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
          <Button variant='solid'>Get Started</Button>
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
          <Image src={logo} pt='8px' position='relative' zIndex='100' />
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
