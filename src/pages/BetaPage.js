import { Box, useColorMode} from '@chakra-ui/react';

import Hero from '../pages/BetaPages/Hero';
import Nav from '../pages/BetaPages/Nav';

function BetaPage() {
  const { colorMode } = useColorMode();

  return (
    <Box w="100%" h="100%" bg={colorMode === 'dark' ? 'black' : 'white'}>
      <Nav />
      <Hero />
    </Box>
  );
}
export default BetaPage;
