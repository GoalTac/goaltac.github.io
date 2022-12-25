import {
    Box,
    Button,
    Flex,
    FormControl,
    Img,
    Input,
    useToast,
    Text,
    Textarea,
    IconButton,
  } from '@chakra-ui/react';
  import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';

  const Hero = () => {
    const toast = useToast();

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
      <Flex>
        <Flex
          alignItems="center"
          w="40%"
          px='16'
          py="16"
          justifyContent="space-between"
          flexDirection='column'
        >
          <Text>
          Sign up for email updates and a chance to be selected for exclusive access!

          </Text>

          <FormControl>
    
            <Flex h="10%" marginTop={3}>      
              <Button
                colorScheme="gray"
                textAlign="left"
                width="30%"
                type="submit"
                fontSize="xs"
                variant="solid"
                onClick={submitForm}
              >
                Notify Me:
              </Button>
              <Input id="email" type="email" placeholder="Email" />
             
            </Flex>
            
          </FormControl>
          <Link fontSize="sm" isExternal href="https://discord.gg/EzFPQDAKGf">
            Join Discord {' '}
            <IconButton mt={4} mb={2} variant="outlined" icon={<FaDiscord size="sm" color="rgba(114,137,218)" />}  />
          </Link>
        </Flex>
      </Flex>
      
    );
  };
  
  export default Hero;