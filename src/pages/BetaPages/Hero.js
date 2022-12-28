import {
    Box,
    Button,
    Flex,
    FormControl,
    Img,
    Input,
    useToast,
    Text,
    Link,
    IconButton,
    useColorMode,
    useMediaQuery
  } from '@chakra-ui/react';
  import React from 'react';
  import blurredImg from '../../images/Blurred_Background.png';
  import { FaDiscord } from 'react-icons/fa';

  const Hero = () => {
    const toast = useToast();
    const { colorMode } = useColorMode();
    const [isLargerThanMD] = useMediaQuery('(max-width: 75em)');

    const submitForm = () => {
      
      return toast({
        title: 'Message sent!🚀',
        description: 'Thank you for contacting us!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    };
    return (
      <Flex 
        borderRadius={20}
        width='100%'
        height='50%'
        alignItems="center"
        marginTop={50}
        marginBottom={20}
      >
        <Flex
          alignItems="center"
          flexDirection='column'
          marginX={5}
          w="100%"
        >
          <Flex
            
            alignItems="center"
            marginTop={5}
            fontSize="xxx-large"
            fontFamily="heading"
            fontWeight="bold"
            textColor={colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900"}
            textShadow={colorMode === "dark" ? "1px 1px 1px black" : "1px 1px 1px white"}
            >
            IMPROVE YOUR WORK ETHIC
          </Flex>
          <Flex
            textAlign="center"
            width="40%"
            alignItems="center"
            marginBottom={5}
            fontSize="x-large"
            fontFamily="bold"
            textColor={colorMode === "dark" ? "whiteAlpha.800" : "white"}

            >
            Compete with others in a ladder-style game by accomplishing your goals
          </Flex>

          <FormControl w="x-large" bgColor="blackAlpha.500" mb={10} mx={20}>
    
            <Flex flexDirection="row" textAlign="center" alignItems="center" mt={5} mx={4} mb={5}>
              <Input id="email" type="email" placeholder=" Email Address " py="2" w="80%"
                bgColor={colorMode === "dark" ? "gray.600" : "ThreeDFace"}
                border="1px" variant="unstyled" borderRadius="none" />      
              <Button
                borderRadius={5}
                width="20%"
                type="submit"
                fontSize="xs"
                border="1px"
                variant="solid"
                ml={3}
                bgColor="azure"
                textColor="black"
                onClick={submitForm}
              >
                Sign Up
              </Button>
              
             
            </Flex>
            <Text marginBottom={6} mx={3} textAlign="center" textColor="whiteAlpha.800">
              Sign up for a chance to be selected for exclusive access!
            </Text>
          </FormControl>
          
        </Flex>

  
      </Flex>
      
    );
  };
  
  export default Hero;