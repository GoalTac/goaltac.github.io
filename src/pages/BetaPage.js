import React from 'react';
import { Box, Flex, useColorMode } from '@chakra-ui/react';

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

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  React.useEffect(() => {
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
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box bg={colorMode === 'dark' ? 'grey.100' : 'white'} overflowX='hidden'>
      <Flex justifyContent='center' alignItems='center'>
        <Box
          bgSize='cover'
          bgPosition='center'
          bgRepeat='no-repeat'
          overflowX='hidden'
          position='relative'
          zIndex='100'
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
          <Features hideBgFeatureTitle={hideBgFeatureTitle} />
          <Slider showDots={showDots} />
          <Prefooter />
          <Footer mobile={mobile} />
        </Box>
      </Flex>
    </Box>
  );
}

export default BetaPage;
