import React from 'react';
import { Flex, Button, VStack, Icon, Img, Spacer, Box } from '@chakra-ui/react';
import { Link, animateScroll as scroll } from 'react-scroll';
import logo from '../../../images/logo.png';
import { NavItem } from './NavItem';
import { useSupabaseClient } from '../../../hooks/SessionProvider';
import Settings from '../Settings';


export default function NavFooter({ activeItem, sections, isMobile}) {


  return (
    <Flex
      justify='space-between'
      alignItems='center'
      pos='fixed'
      bottom='0'
      right='0'
      left='0'
      bgColor='white'
      borderWidth='1px'
      width='100vw'
    >
      {/*<Img src={logo} w='30px' h='30px' mt='10px' mb='10px' ml='10px'/>*/}
      <Box>
        <Settings pSize={30} session={useSupabaseClient.session} />
      </Box>
      
      <Spacer />
      {sections.map((item, index) => {
        return (
          <Box px='5px' key={index}>
            <NavItem 
            navSize={isMobile ? "small" : "large"}
            icon={item.icon} 
            title={item.title}
            description={item.description}
            nav={item.nav}
            active={activeItem == item.nav ? true : false}
            isMobile={isMobile}
            />
          </Box>
        );
      })}
    </Flex>
  );
}
