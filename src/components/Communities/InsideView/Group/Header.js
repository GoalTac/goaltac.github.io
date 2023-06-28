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
  GiArrowhead,
  GiPerson

} from 'react-icons/gi'
import {
  TbTarget
} from 'react-icons/tb'
import {
  FaUserFriends,
  FaChalkboard
} from 'react-icons/fa'
import {
  RiCalendarEventLine
} from 'react-icons/ri'
import { 
  ArrowBackIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChatIcon
  
 } from '@chakra-ui/icons';
 
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
    return expandedView;
  }

  return (
    <Box 
      padding='3px'
      borderColor={colorMode == 'dark' ? 'gray.700' : 'gray.400'}>
      <VStack>

        <OverviewGrid expandedView={expandedView} 
        toggleExpandedView={toggleExpandedView} />

        {expandedView && 
        <VStack width='100%' rowGap='1rem'>

          {/* General Info */}  
          <GeneralInfoGrid/>

          {/* PrerequisitesGrid Info */}  
          <PrerequisitesGrid/>

          {/* Statistics */}  
          <StatsGrid experience={11210}/>  

          
     
        </VStack>}

        

        {/*
        Just keeping this here because it's great for
        changes we want to make when resizing
        flexDirection={['column', 'row']}*/}
        <Flex width='100%'>
          <IconButton 
            borderWidth='1px'
            borderEndRadius='unset'
            borderBlockEnd='unset'
            width='100%'
            variant='ghost' 
            fontSize='2rem' 
            icon={<RiCalendarEventLine/>}  />
          <IconButton 
            borderWidth='1px'
            borderEndRadius='unset'
            borderBlockEnd='unset'
            width='100%'
            variant='ghost' 
            fontSize='2rem' 
            icon={<TbTarget/>}  />
          <IconButton 
            borderWidth='1px'
            borderEndRadius='unset'
            borderBlockEnd='unset'
            width='100%'
            variant='ghost' 
            fontSize='2rem' 
            icon={<FaUserFriends/>}  />
          <IconButton 
            borderWidth='1px'
            borderEndRadius='unset'
            borderBlockEnd='unset'
            width='100%'
            variant='ghost' 
            fontSize='2rem' 
            icon={<FaChalkboard />}  />
          <IconButton 
            borderWidth='1px'
            borderEndRadius='unset'
            borderBlockEnd='unset'
            width='100%'
            variant='ghost' 
            fontSize='2rem' 
            icon={<ChatIcon />}  />
        </Flex>
      </VStack>
      <Divider marginY='2px' />
    </Box>
  )
}


/**
 * Contains the title, description, 
 * profile picture, options, and progress
 * @returns Overview view
 */
function OverviewGrid({toggleExpandedView, expandedView}) {

  return (<Flex width='100%' 
    flexDirection='column'
    paddingBottom='10px'
    height='min-content'
    marginBottom='auto'>
    <Flex flexDirection='row'>
      <VStack>
        {/* Profile Picture*/}
        <Box 
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
        <Heading color='gray.500'>
          GoalTac
        </Heading>
        
        {/* Description */}
        <Text paddingX='20px' maxWidth='500px'>
          Welcome to the GoalTac community, 
          a group of ambitious individuals who want 
          to become more productive members and join
          a place to keep people accountable and encourage efforts!
        </Text>
      </VStack>
    </Flex>
    <IconButton 
      marginTop='10px'
      paddingY='4px'
      variant='outline'
      onClick={toggleExpandedView}
      alignSelf='center' 
      height='min-content' 
      width='100px'
      _active={{}}
      _hover={{}} 
      fontSize='1rem' 
      icon={expandedView ? <ChevronUpIcon/> : <ChevronDownIcon/>} />
    

    
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
      
      <HStack>
        <Icon boxSize='2rem'  as={GiPerson} />

        <StatComponent stats={{
          title: 'Members',
          value: 20
        }} />
      </HStack>
     
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
    borderTop='2px'
    padding='20px'
    flexDirection='column'>
    <Box alignSelf='left'>
      <Heading fontSize='1.25rem'>
        Statistics
      </Heading>
    </Box>
    <Flex width='100%' flexDirection='row' paddingY='1rem'>
      
      <HStack>
        <Icon boxSize='2rem'  as={GiArrowhead} />

        <StatComponent stats={{
          title: 'Total Points',
          value: 11210,
          type: 'increase',
          percent: '21.1%',
        }} />
      </HStack>
      
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
      <StatLabel color='gray.400' fontSize='sm'>{stats.title}</StatLabel>
    </Stat>
  
</StatGroup>);
}