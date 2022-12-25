import {
    Box,
    Center,
    Image,
    VStack,
  } from '@chakra-ui/react';
import AboutUs from '../pages/BetaPages/AboutUs';
import ContactUs from '../pages/BetaPages/ContactUs';
import Footer from '../pages/BetaPages/Footer';
import Hero from '../pages/BetaPages/Hero';
import Nav from '../pages/BetaPages/Nav';
import Services from '../pages/BetaPages/Services';
import Title from '../pages/BetaPages/Title';

import Testimonials from '../pages/BetaPages/Testimonials';
import blurredImg from '../images/Blurred_Background.png';


function BetaPage() {
    return (
        <Box 
            w="100%" 
            h="100%"
            backgroundImage={blurredImg}
            backgroundAttachment="fixed"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="100%"
            >
                <Nav />
                <Title />
                <Hero />
                <AboutUs />
                <Services />
                <Testimonials />
                <ContactUs />
                <Footer />            
        </Box>
    )
}
export default BetaPage;