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
  } from '@chakra-ui/react';
  import React from 'react';
  import blurredImg from '../../images/Blurred_Background.png';
  import { FaDiscord } from 'react-icons/fa';

  const Hero = () => {
    const toast = useToast();
    const { colorMode } = useColorMode();

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
        width='90%'
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mb='4'
        marginLeft={30}
        marginTop={50}
        flexDirection="row"
      >
        <Flex
          alignItems="center"
          flexDirection='column'
          marginX={5}
          w="60%"
        >
          <Flex
            alignItems="center"
            marginTop={5}
            marginBottom={5}
            fontSize="2xl"
            >
            BETTER WORK ETHIC
          </Flex>
          <Text marginBottom={3}>
            Sign up for a chance to be selected for exclusive access!
          </Text>

          <FormControl>
    
            <Flex flexDirection="column" textAlign="center" alignItems="center">
              <Input id="email" type="email" placeholder=" Your Email" shadow="lg" py="2"
                bgColor={colorMode === "dark" ? "gray.600" : "ThreeDFace"}
                border="1px" variant="unstyled" borderRadius="none" />      
              <Button
                width="40%"
                type="submit"
                fontSize="xs"
                border="1px"
                borderRadius="none"
                variant="outline"
                marginTop={2}
                onClick={submitForm}
              >
                Notify Me:
              </Button>
              
             
            </Flex>
            
          </FormControl>
        </Flex>

        <Flex>
          <Img src={blurredImg} ml={70} w="70%" h="50%" />
        </Flex>
      </Flex>
      
    );
  };
  
  export default Hero;