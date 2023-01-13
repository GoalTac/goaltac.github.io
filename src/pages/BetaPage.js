import { Box, Flex, useColorMode } from '@chakra-ui/react';

import Hero from '../components/BetaPages/Hero';
import AboutUs from '../components/BetaPages/AboutUs';
import StaffProfiles from '../components/BetaPages/StaffProfiles';

function BetaPage() {
  const { colorMode } = useColorMode();

  return (
    <Box w="100%" h="100%" bg={colorMode === 'dark' ? 'grey.100' : 'white'}>
      <Flex justifyContent="center" alignItems="center">
        <Box maxWidth={1444}>
          <Hero />
          <AboutUs />
          <StaffProfiles />
        </Box>
      </Flex>
    </Box>
  );
}
export default BetaPage;
