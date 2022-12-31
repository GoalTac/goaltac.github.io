import { Box, useColorMode} from '@chakra-ui/react';

import Hero from '../pages/BetaPages/Hero';
import Nav from '../pages/BetaPages/Nav';
import AboutUs from '../pages/BetaPages/AboutUs';
import StaffProfiles from './BetaPages/StaffProfiles';

function BetaPage() {
  const { colorMode } = useColorMode();

  return (
    <Box w="100%" h="100%" bg={colorMode === 'dark' ? 'grey.100' : 'white'}>
      <Nav />
      <Hero />
      <AboutUs />
      <StaffProfiles />
    </Box>
  );
}
export default BetaPage;
