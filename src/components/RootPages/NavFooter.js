import React from 'react';
import { Flex, Button, VStack, Icon, Img, Spacer, Box } from '@chakra-ui/react';
import { Link, animateScroll as scroll } from 'react-scroll';
import logo from '../../images/logo.png';
import NavItem from './NavItem';

// <Image src={navSize == "small" ? smalllogo : largelogo}/>

export default function NavFooter({ activeItem, sections, isMobile}) {


  return (
    <Flex
      justify='space-between'
      alignItems='center'
      position='sticky'
      bottom='0'
      zIndex='overlay'
      flexDirection='row'
      bgColor='white'
      borderWidth='1px'
      h='25vh'
      
    >
      <Img src={logo} w='30px' h='30px' mt='10px' mb='10px' ml='10px'/>
      <Spacer />
      {sections.map((item, index) => {
        return (
          <Box px='5px'>
            <NavItem 

            key={index}
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
