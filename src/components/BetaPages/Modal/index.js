import React from 'react';
import { Box, Button, VStack, useColorMode, Divider } from '@chakra-ui/react';
import { Link, animateScroll as scroll } from 'react-scroll';

function Modal({ sections, toggleModal, setOpenModal, openModal }) {
  const closeModal = () => {
    setOpenModal(false);
  };
  const { colorMode } = useColorMode();


  return (
    <Box
      bg='linear-gradient(to top, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.1))'
      w='100%'
      h='100%'
      position='absolute'
      zIndex='50'
    >
      <VStack
        bg={colorMode === 'dark' ? 'gray.900' : 'white'}
        borderRadius={10}
        boxShadow='0px 10px 10px gray'
        position='absolute'
        top='3.5%'
        left='4%'
        padding='2rem 0'
        width='92%'
        transition='0.2s ease-in-out'
      >
        {sections.map((section, index) => {
          return (
            <>
            <Link
              to={`${section.href}`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              onClick={closeModal}
              key={index}
            >
              <Button
                variant='ghost'
                fontSize='2xl'
                background='teal.300'
                bgClip='text'
                transition='background 1500ms'
                
                _hover={{
                  background: 'blue.500',
                  bgClip: 'text',
                }}
              >
                {section.name}
              </Button>
            </Link>
            <Divider />
            </>
          );
        })}
      </VStack>
    </Box>
  );
}

export { Modal };
