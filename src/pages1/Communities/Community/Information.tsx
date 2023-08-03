
import {
    Flex,
    Heading,
    Text,
    HStack,
    Box,
    VStack,
    Image,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Spacer,
    useColorMode,
    Icon,
    CircularProgress,
    CircularProgressLabel,
    IconButton
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { calculateLevel, experiencePercent } from '../../../hooks/Utilities'
import { formatNumber } from '../../../hooks/Utilities';
import { _getAllMembers, getPicture } from '../CommunityAPI';
import {
  GiArrowhead,
  GiPerson

} from 'react-icons/gi'
import { 
  ChevronDownIcon,
  ChevronUpIcon,  
 } from '@chakra-ui/icons';
 import { getUser } from '../../../hooks/Utilities';

 
/**
 * Contains profile picture, clan stats, and buttons
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Header({community}: any) {

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

        <OverviewGrid expandedView={expandedView} toggleExpandedView={toggleExpandedView} community={community} />
        
        {expandedView && 
        <VStack width='100%' rowGap='1rem'>

          {/* General Info */}  
          <GeneralInfoGrid community={community} />

          {/* PrerequisitesGrid Info */}  
          <PrerequisitesGrid community={community} />

          {/* Statistics   */}  
          <StatsGrid community={community}/>

          
     
        </VStack>}
    </Box>
  )
}


/**
 * Contains the title, description, 
 * profile picture, options, and progress
 * @returns Overview view
 */
function OverviewGrid({toggleExpandedView, expandedView, community}: any) {

  const picture: string = getPicture(community);
  const [userName, setUserName] = useState<any>();
    useEffect(() => {
        const fetchUserName = () => getUser(community.owner).then((response) => {
            setUserName(response?.name)
        })
        fetchUserName();
      }, []);
  
  return (<Flex width='100%' 
    flexDirection='column'
    paddingBottom='10px'
    height='min-content'
    marginBottom='auto'>
    <Flex flexDirection='row'>
      <VStack>
        {/* Profile Picture - use community object */}
        <Box 
        borderWidth='3px'
        borderRadius='16px'>
          <Image width='100px' src={picture} />
        </Box>
      </VStack>
      <VStack width='100%' 
        paddingTop='5px'
        paddingX='10px'
        alignItems='left'>
        {/* Title */}
        <Heading color='gray.500'>
          {community.name}
        </Heading>

        {/* Owner */}
        <Text paddingX='20px' maxWidth='500px' marginTop='-10px' color='gray.400'>
          {userName}
        </Text>
        
        {/* Description */}
        <Text paddingX='20px' maxWidth='500px'>
          {community.description}
        </Text>

        
      </VStack>
    </Flex>
    <IconButton 
      aria-label='Toggle View'
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
function PrerequisitesGrid({community}: any) {

  function typeCheck(type: Number) {
    switch(type) {
        case 0:
            return 'Anyone can Join';
        case 1:
            return 'Invite Only';
        case 2:
            return 'Password';
    }
  }

  const type = typeCheck(0)//typeCheck(community.stats.type)
  const pointsRequired = 0//community.stats.pReq

  return(<Flex width='100%' paddingX='20px'>
    <Flex flexDirection='row' alignItems='left' width='100%'>
      <StatComponent stats={{
        title: 'Type',
        value: type
      }} />
      <Spacer/>
      <StatComponent stats={{
        title: 'Date Created',
        value: `${community.created_at.toString().split('T')[0]}`
      }} />
      <Spacer/>
      <StatComponent stats={{
        title: 'Points Required',
        value: pointsRequired
      }} />
    </Flex>
  </Flex>);
}

/**
 * Contains the general information (members, etc.)
 * @returns General information
 */
function GeneralInfoGrid({community}: any) {

  const memberCount = _getAllMembers(community.community.id)
  //const goalsWIP = community.goals.length
  //const goalsCompleted = community.goalsC.length


  return(<Flex width='100%' paddingX='20px'>
    <Flex columnGap='1rem'
    flexDirection='row' alignItems='left' width='100%'>
      
      <HStack>
        <Icon boxSize='2rem'  as={GiPerson} />
        <StatComponent stats={{
          title: 'Members',
          value: memberCount
        }} />
      </HStack>
      <Spacer/>
      <StatComponent stats={{
          title: 'Goals in Progress',
          value: 0
        }} />
      <Spacer/>
      
      
      <StatComponent stats={{
        title: 'Goals Completed',
        value: 0
      }} />
      
    </Flex>
  </Flex>);
}

/**
 * Contains statistics (so numbers and such)
 * @returns Stats view
 */
function StatsGrid({community}: any) {
  const experience = 100//community.levelObj.exp
  const levelObject = calculateLevel(experience)
  const level = calculateLevel(experience).level
  const expLeftover = calculateLevel(experience).experience
  const expPercent = experiencePercent(experience)

  const totalPoints = 0//community.totalPoints

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
          value: totalPoints,
        }} />
      </HStack>
      
      <Spacer/>
      <Flex>
        <CircularProgress value={expPercent} color='blue.300' size='80px'>
          <CircularProgressLabel>
            <VStack>
              <Heading fontSize='1rem'>{level}</Heading>
              <Text fontSize='sm'>Level</Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
      
      <Spacer/>
      <StatComponent stats={{
        title: 'Battle W/L',
        value: 0
      }} />
    </Flex>

  </Flex>);
}

/**
 * Helper function for stats view
 * @param {stats} object containing information on a stat
 * @returns 
 */
function StatComponent({stats}: any) {
  return (
  <StatGroup flexDirection='column'>
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
