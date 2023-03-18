import React from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import { Link, animateScroll as scroll } from 'react-scroll';

export default function Modal({ sections, toggleModal, setOpenModal, openModal }) {
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      bg='linear-gradient(to top, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.1))'
      w='100%'
      h='100%'
      position='absolute'
      zIndex='50'
    >
      <VStack
        bg='gray'
        position='absolute'
        top='3.5%'
        left='4%'
        padding='2rem 0'
        width='92%'
        transition='0.2s ease-in-out'
      >
        {sections.map((section, index) => {
          return (
            <Link
              to={`${section.href}`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              onClick={closeModal}
              key={index}
            >
              <Button variant='outline' fontWeight='700' key={index}>
                {section.name}
              </Button>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}
