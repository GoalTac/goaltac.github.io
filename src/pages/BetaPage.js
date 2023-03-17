import React, { useEffect } from 'react';
import { Box, Flex, useColorMode, Divider, Spacer } from '@chakra-ui/react';

import { Header } from '../components/BetaPages/Header';
import { Intro } from '../components/BetaPages/Intro';
import { Features } from '../components/BetaPages/Features';
import { Slider } from '../components/BetaPages/Slider';
import { Prefooter } from '../components/BetaPages/Prefooter';
import { Footer } from '../components/BetaPages/Footer';
import { Modal } from '../components/BetaPages/Modal';

const sections = [
  {
    href: 'product',
    name: 'Product',
  },
  {
    href: 'pricing',
    name: 'Pricing',
  },

  {
    href: 'resources',
    name: 'Resources',
  },
];

function BetaPage() {
  const initialState = window.innerWidth < 768 ? false : true;
  const [showMenu, setShowMenu] = React.useState(initialState);
  const [hideBgFeatureTitle, setHideBgFeatureTitle] = React.useState(
    !initialState
  );
  const [showDots, setShowDots] = React.useState(!initialState);
  const [mobile, setMobile] = React.useState(!initialState);
  const [openModal, setOpenModal] = React.useState(false);
  const { colorMode } = useColorMode();

  const [windowSize, setWindowSize] = React.useState('100%');;

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const sizeSelect = (size) => {
    if (size < 1750) {
      return '100%'
    } else if (size < 2250) {
      return '90%'
    } else if (size < 2500) {
      return '80%'
    } else if (size < 2750) {
      return '70%'
    } else if (size < 3000) {
      return '60%'
    } else if (size < 3250) {
      return '50%'
    } else if (size < 3500) {
      return '40%'
    } else if (size < 3750) {
      return '30%'
    } else if (size < 99999) {
      return '20%'
    }
  }
  React.useEffect(() => {
    setWindowSize(sizeSelect(window.innerWidth))
    function handleResize() {
      if (window.innerWidth < 768) {
        setShowMenu(false);
        setHideBgFeatureTitle(true);
        setShowDots(true);
        setMobile(true);
      } else {
        setShowMenu(true);
        setHideBgFeatureTitle(false);
        setShowDots(false);
        setMobile(false);
      }
      setWindowSize(sizeSelect(window.innerWidth))
    }


    
      


    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);

  return (
    <Box bg={colorMode === 'dark' ? 'grey.100' : 'white'}>
      <Flex justifyContent='center' alignItems='center' >
        <Box
          bgSize='cover'
          bgPosition='center'
          bgRepeat='no-repeat'
          overflowX='hidden'
          position='relative'
          zIndex='100'
          width={windowSize}
          height='100%'
        >
          {openModal && mobile && (
            <Modal
              sections={sections}
              toggleModal={toggleModal}
              setOpenModal={setOpenModal}
            />
          )}
          <Header
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            openModal={openModal}
            sections={sections}
            toggleModal={toggleModal}
          ></Header>
          <Intro />
          
          <Box bgGradient='linear(to-b, white, teal.100, teal.300, blue.500)'>
            <Features hideBgFeatureTitle={hideBgFeatureTitle} />
            <Slider showDots={showDots} />

            <Prefooter />
            <Footer mobile={mobile} />
          </Box>
          
        </Box>
      </Flex>
    </Box>
  );
}

export default BetaPage;
