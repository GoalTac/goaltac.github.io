import {
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  useToast,
  Text,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

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
    <Box padding="50">
      <Heading
        fontWeight="extrabold"
        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        bg = {colorMode === 'dark' ? 'white' : 'gray.700'}
        bgClip="text"
      >
        IMPROVE YOUR WORK ETHIC WITH
      </Heading>

      <Heading
        fontWeight="extrabold"
        bgGradient="linear(to-l, teal.300, blue.500)"
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        bgClip="text"
      >
        GoalTac
      </Heading>
      <FormControl marginTop="200">
        <Flex flexDirection="row" textAlign="center" alignItems="center">
          <Input
            id="email"
            type="email"
            placeholder=" Email Address "
            border="1px"
            borderRadius="2"
            marginRight="5"
            padding="3"
            _placeholder={{ color: 'inherit' }}
          />
          <Button
            borderRadius={5}
            width="20%"
            type="submit"
            fontSize="xs"
            border="1px"
            variant="solid"
            onClick={submitForm}
          >
            Sign Up
          </Button>
        </Flex>
        <Text
          color={colorMode === 'dark' ? 'white' : 'gray.700'}
          paddingLeft="1"
        >
          Sign up for a chance to be selected for exclusive access!
        </Text>
        <Button
          variant={'link'}
          colorScheme={'blue'}
          size={'sm'}
          paddingLeft="1"
        >
          Learn more
        </Button>
      </FormControl>
    </Box>
  );
};

export default Hero;
