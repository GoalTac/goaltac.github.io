import AboutUs from '../pages/BetaPages/AboutUs';
import ContactUs from '../pages/BetaPages/ContactUs';
import DrawerComponent from '../pages/BetaPages/DrawerComponent';
import Footer from '../pages/BetaPages/Footer';
import Hero from '../pages/BetaPages/Hero';
import Nav from '../pages/BetaPages/Nav';
import Services from '../pages/BetaPages/Services';
import Testimonials from '../pages/BetaPages/Testimonials';
import { useDisclosure, useRef } from 'react';
import { Box, Center, VStack } from '@chakra-ui/react';


function BetaPage() {
    const btnRef = useRef();
    return (
        <VStack>
            <Nav ref={btnRef} />
            <Hero />
            <AboutUs />
            <Services />
            <Testimonials />
            <ContactUs />
            <Footer />
    
            <DrawerComponent btnRef={btnRef} />
        </VStack>
    );
}
export default BetaPage;