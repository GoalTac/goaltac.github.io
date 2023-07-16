import {
    Box,
    Text,
    Heading,
    Stack,
    CardHeader,
    CardBody,
    Card,
    StackDivider,
    useColorModeValue,
    Flex,
    CardFooter,
    Button,
    Spacer,
    ButtonGroup,
    Image,
    HStack,
    Divider,
    Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider
  } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import InsideView from '../Community/InsideView';
import { getExampleCommunities } from '../Example';
import { getAllCommunities, getPicture, Community } from '../CommunityAPI';
import { Link } from "react-router-dom";
import { RandomUUIDOptions } from 'crypto';
import { Module } from './CommunityCentral';


  
export default function CommunityList({communities}: any ) {
    

    return (
      <Flex justifySelf='center' alignSelf='center' width={['400px', '600px']}
       overflow='hidden' flexDirection={'column'}>
        <CommunityNav communities={communities} />
        {communities && communities.map((community: any, index: Number) => (
          <Module key={index} community={community}/>
        ))}
      </Flex>
      
    );
  }

  function CommunityNav({communities}: any) {
    return (
    <Card bg={useColorModeValue('gray.50', 'gray.900')} boxShadow={'xl'} height='100px'>
      <CardHeader display="flex" justifyContent="space-between">
          <Button variant="solid" colorScheme="blue" width='fit-content'>
            Joined
          </Button>
          <Button variant="ghost" colorScheme="blue" width='fit-content'>
            Requested
          </Button>
          <Spacer/>
          <Button variant="outline" colorScheme="blue" width='fit-content'>
            Create
          </Button>
      </CardHeader>
    </Card>);
  }