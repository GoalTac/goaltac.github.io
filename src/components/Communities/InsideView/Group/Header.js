import {
    Flex,
    Heading,
    Stack,
    Text,
    Button, 
    HStack,
    Box,
    VStack,
    Image,
    Progress,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Spacer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Grid,
    GridItem,
    Divider,
    useColorMode,
    Icon,
    CircularProgress,
    CircularProgressLabel,
    IconButton
} from '@chakra-ui/react';
import OptionComponent from '../Options/OptionComponent';
import GoalTac_Logo from '../../../../images/logo.png'
import React, { useState, useEffect } from 'react';

import { calculateLevel, experiencePercent } from '../../../../hooks/Utilities/Levels'
import { formatNumber } from '../../../../hooks/Utilities/Numbers';
import {
  GiArrowhead
} from 'react-icons/gi'
import {
  TbTargetArrow
} from 'react-icons/tb'
import {
  RiCalendarEventLine
} from 'react-icons/ri'
import { ArrowBackIcon,ChevronDownIcon } from '@chakra-ui/icons';

/**
 * Contains profile picture, clan stats, and buttons
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Header({community}) {

  const { colorMode } = useColorMode();
  const [expandedView, setExpandedView] = useState(true);
  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  }

  return (
    <Box 
      bgColor={colorMode == 'dark' ? 'gray.700' : 'gray.100'}
      padding='3px'
      minWidth='50vw'
      borderWidth='2px'
      borderTopRadius='20px'
      borderColor={colorMode == 'dark' ? 'gray.700' : 'gray.400'}>
      <VStack>

        <OverviewGrid toggleExpandedView={toggleExpandedView} />
        
        <Divider />


        {expandedView && 
        <VStack width='100%' rowGap='1rem'>

          {/* General Info */}  
          <GeneralInfoGrid/>

          {/* PrerequisitesGrid Info */}  
          <PrerequisitesGrid/>

          {/* Statistics */}  
          <StatsGrid experience={11210}/>  

          
     
        </VStack>}



        <VStack>

        </VStack>

        

        {/*
        Just keeping this here because it's great for
        changes we want to make when resizing
        flexDirection={['column', 'row']}*/}
        <Flex >
          <IconButton fontSize='2rem' icon={<RiCalendarEventLine/>}  />
          <Button>Goals</Button>
          <Button>Members</Button>
          <Button>Leaderboard</Button>
          <Button>Chat</Button>
        </Flex>
      </VStack>
    </Box>
  )
}


/**
 * Contains the title, description, 
 * profile picture, options, and progress
 * @returns Overview view
 */
function OverviewGrid({toggleExpandedView}) {

  return (<Flex width='100%' 
    flexDirection='column'
    paddingBottom='10px'
    height='min-content'
    borderBottom='2px'
    marginBottom='auto'>
    <Flex flexDirection='row'>
      <VStack>
        {/* Profile Picture*/}
        <Box borderColor='gray.400'
        borderWidth='3px'
        borderRadius='16px'>
          <Image width='100px' src={GoalTac_Logo} />
        </Box>
      </VStack>
      <VStack width='100%' 
        paddingTop='5px'
        paddingX='10px'
        alignItems='left'>
        {/* Title */}
        <Heading>
          Example Title
        </Heading>
        
        {/* Description */}
        <Text paddingX='10%'>
          Example description
        </Text>
      </VStack>
    </Flex>
    <IconButton 
      onClick={toggleExpandedView}
      alignSelf='center' 
      boxSize='min-content' 
      _active={{}}
      _hover={{}} 
      fontSize='1rem' 
      icon={<ChevronDownIcon/>} />
    

    
  </Flex>);

}


/**
 * Contains the various requisites to join the community
 * @returns Pre-reqs grif
 */
function PrerequisitesGrid() {
  return(<Flex width='100%' paddingX='20px'>
    <Flex flexDirection='row' alignItems='left' width='100%'>
      <StatComponent stats={{
        title: 'Type',
        value: 'Anyone can Join'
      }} />
      <Spacer/>
      <StatComponent stats={{
        title: 'Points Required',
        value: 1000
      }} />
    </Flex>
  </Flex>);
}

/**
 * Contains the general information (members, etc.)
 * @returns General information
 */
function GeneralInfoGrid() {
  return(<Flex width='100%' paddingX='20px'>
    <Flex columnGap='1rem'
    flexDirection='row' alignItems='left' width='100%'>
      <StatComponent stats={{
        title: 'Members',
        value: 20
      }} />
      <Spacer/>
      <StatComponent stats={{
        title: 'Goals in Progress',
        value: 12
      }} />
      <Spacer/>
      <StatComponent stats={{
        title: 'Goals Completed',
        value: 1213
      }} />
    </Flex>
  </Flex>);
}

/**
 * Contains statistics (so numbers and such)
 * @returns Stats view
 */
function StatsGrid({experience}) {

  const levelObject = calculateLevel(experience)
  const level = calculateLevel(experience).level
  const expLeftover = calculateLevel(experience).experience
  const expPercent = experiencePercent(experience)

  return (<Flex width='100%' 
    borderY='2px'
    padding='20px'
    flexDirection='column'>
    <Box alignSelf='left'>
      <Heading fontSize='1.25rem'>
        Statistics
      </Heading>
    </Box>
    <Divider/>
    <Flex width='100%' flexDirection='row' paddingY='1rem'>
      
      <Flex>
        <Icon boxSize='2rem'  as={GiArrowhead} />

        <StatComponent stats={{
          title: 'Total Points',
          value: 11210,
          type: 'increase',
          percent: '21.1%',
        }} />
      </Flex>
      
      <Spacer/>
      <Flex>
        <CircularProgress value={expPercent} color='blue.300'>
          <CircularProgressLabel>
            <VStack rowGap='0.5rem'>
              <Heading fontSize='1rem'>{level}</Heading>
              <Text fontSize='sm'>Level</Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
      
      <Spacer/>
      <StatComponent stats={{
        title: 'War W/L',
        value: 2.1,
        type: 'increase',
        percent: '12%'
      }} />
    </Flex>

  </Flex>);
}

/**
 * Helper function for stats view
 * @param {stats} object containing information on a stat
 * @returns 
 */
function StatComponent({stats}) {
  return (<StatGroup flexDirection='column'>
    <Stat>
      <StatNumber fontSize='lg'>{formatNumber(stats.value)}</StatNumber>
      {stats.type && 
      <StatHelpText>
        <StatArrow type={stats.type} />
        {stats.percent}
      </StatHelpText>}
      <StatLabel fontSize='sm'>{stats.title}</StatLabel>
    </Stat>
  
</StatGroup>);
}