import {
    Box,
    Center,
    Image,
    useColorMode,
    VStack,
  } from '@chakra-ui/react';
import AboutUs from '../pages/BetaPages/AboutUs';
import Footer from '../pages/BetaPages/Footer';
import Hero from '../pages/BetaPages/Hero';
import Nav from '../pages/BetaPages/Nav';

import blurredImg from '../images/Blurred_Background.png';


function BetaPage() {
    const { colorMode } = useColorMode();

    return (
        <Box 
            w="100%" 
            h="100%"
            bgColor={colorMode === "light" ? "whiteAlpha.100" : "gray.700"}
            backgroundAttachment="fixed"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="100%"
            >
                <Nav />
                <Hero />
                <AboutUs />
        </Box>
    )
}
export default BetaPage;