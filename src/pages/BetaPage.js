import React, { useEffect } from 'react';
import { Box, Flex, useColorMode, Divider, Spacer, Image, VStack, HStack, Stack } from '@chakra-ui/react';

import { Header } from '../components/BetaPages/Header';
import { Intro } from '../components/BetaPages/Intro';
import { Features } from '../components/BetaPages/Features';
import { Slider } from '../components/BetaPages/Slider';
import { Prefooter } from '../components/BetaPages/Prefooter';
import { Footer } from '../components/BetaPages/Footer';
import { Modal } from '../components/BetaPages/Modal';
import createTask from '../images/CreateTask.png';

const sections = [
  {
    href: 'product',
    name: 'Product',
  },
  {
    href: 'features',
    name: 'Features',
  },

  {
    href: 'community',
    name: 'About',
  },
];
const measurements = {
  maxWidth: '1400px',

}

function BetaPage() {
  const initialState = window.innerWidth < 1000 ? false : true;
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

  React.useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth)
      if (window.innerWidth < 1000) {
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
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);

  return (
    <Flex 
    flexDirection='column'
    minH='100vh'
    bg={colorMode === 'dark' ? 'grey.100' : 'white'}
    bgGradient={colorMode === 
    'dark' ? 'linear(to-b, gray.800, teal.700, blue.500)' : 
    'linear(to-b, white, teal.100, teal.300, blue.500)'}>
      
      <Flex justifyContent='center' alignItems='center' >
        <Box overflowX='hidden'
          maxW={measurements.maxWidth}>

          {openModal && mobile ? (
            <Modal
              sections={sections}
              toggleModal={toggleModal}
              setOpenModal={setOpenModal}
            />
          ) : (<Header
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            openModal={openModal}
            sections={sections}
            toggleModal={toggleModal}
          />)}
          
          <Box>
            <Flex
            columnGap='6rem'
            alignItems='center'
            paddingX='4rem'
            flexDirection={mobile ? 'column-reverse' : 'row'}>
              <Intro />
              <Image src={createTask} maxW='400px' maxH='350px' borderRadius='12px'/>
            </Flex>
            

            <Box>
              <Features hideBgFeatureTitle={hideBgFeatureTitle} />
              <Slider showDots={showDots} />
              <Prefooter />
              
            </Box>
          </Box>
         
          
        </Box>

        
      </Flex>
      
      <Spacer/>
      {!mobile && (
        <HStack 
        minW='100%'
        id='about'
        bg='gray.900'
        justifyContent='center'
        py='3rem'
        bottom='0'>
        <Footer contentWidth={measurements.maxWidth} />
      </HStack>
      )}
      
    </Flex>
  );
}

export default BetaPage;
