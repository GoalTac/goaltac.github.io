import React from 'react';
import {
  Button,
  Box,
  Spacer,
  Img,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
  Spinner,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { NavLink, Navigate } from 'react-router-dom';

export function SignUp() {
    return <NavLink
        to='/signin'>
        <Button variant='ghost'
            padding='2rem'
            fontSize='1.5rem'
            borderWidth='1px'
            borderColor='gray.900'
            bgClip='text'
            bgGradient='linear(to-l, teal.300, blue.500)'
            borderRadius='1rem'
            _hover={{
                color: 'unset'

            }}>
            Sign Up
        </Button>
        </NavLink>
}
export function SignIn() {
    return <NavLink
        to='/signin'>
        <Button variant='ghost'
            padding='2rem'
            fontSize='1.5rem'
            bgClip='text'
            bgGradient='linear(to-l, teal.300, blue.500)'
            borderRadius='1rem'
            _hover={{
                color: 'unset'

            }}>
            Sign In
        </Button>
        </NavLink>
}