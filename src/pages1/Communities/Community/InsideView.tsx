import Header from './Information'
import Roster from './Roster'
import { useState, useEffect, ReactElement } from 'react';
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'
import ProfileBackground from '../../../../public/ProfileBackground.svg'

import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Card,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Heading,
    IconButton,
    IconProps,
    Image,
    Select,
    Spinner,
    VStack
} from '@chakra-ui/react';
  import {
    TbTarget
  } from 'react-icons/tb'
  import {
    FaUserFriends,
    FaChalkboard
  } from 'react-icons/fa'
  import {
    RiCalendarEventLine, RiNotification2Fill
  } from 'react-icons/ri'
  import { 
    ChatIcon,
    InfoOutlineIcon,
    SettingsIcon
} from '@chakra-ui/icons';
import {
    Box,
    useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
import { measurements, _getAllMembers, getCommunityByName, getPicture } from './../CommunityAPI'
import { uniqueId } from 'lodash';
import Chat from '../../../components/Chats/CommunityChat';
import GoalDashboard from './Goals';
import Calendar from './Calender';
import { formatNumber, getUser, twoColumns } from '../../../hooks/Utilities';
/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView() {

    const { communityName } = useParams<{ communityName: string }>();
    const [community, setCommunity] = useState<any>();
    const [view, setView] = useState<ReactElement>(<Chat/>);
    const [members, setMembers] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)

    //load in the community variable asyncronously
    useEffect(() => {

      async function fetchCommunityData() {
        const fetchedCommunity = getCommunityByName(communityName)
        const promisedCommunity = await fetchedCommunity

        setCommunity(promisedCommunity)

        //after fetching community, then fetch members
        fetchedCommunity.finally(()=> {
          async function fetchMembers() {
            const promisedMembers = await _getAllMembers(promisedCommunity.community_id)
            setMembers(promisedMembers)
            setLoading(false)
          }
          fetchMembers()
        })
        
      }
      fetchCommunityData();
    }, []);

    //to display the group of toggleable views
    function MainContent() {
      return <Flex maxWidth='600px' width='max-content' 
      rowGap={measurements.general.rowGap} flexDirection='column'>
          <Card_Header />
          <Card_Post />
          <Card className='Specific Community View'
          borderRadius='20px'
          marginX='auto'  padding='10px'>
            {view}
          </Card>
        </Flex>
    }
    console.log('hi')
    //Statistics and such
    function SupportingContent() {
      return <Flex maxWidth='300px' width='max-content'>
        <Card_Roster/>
      </Flex>
    }
    
    function LoadingView() {
      return <Flex>
            <Spinner speed='1s' size='xl' />
        </Flex>
    }


    /**
     * CARDS TO DISPLAY
     */
    function Card_Header() {
      const picture: string = getPicture(community);

      return <Card height='400px' borderRadius={measurements.cards.borderRadius} position='relative'>

        {/* BANNER: The height and width should be set to the size of the banner */}
        <Box borderRadius='inherit' borderBottomRadius='unset' height='200px' overflow='clip'>
          <Image src={ProfileBackground} />
        </Box>

        <Flex marginY='auto' borderRadius='inherit' left='5%' position='absolute' height='100%'>
          <Card overflow='clip' borderRadius='inherit' borderColor='gray' borderWidth='2px' height='100px' width='100px' margin='auto' padding='10px'>
            <Image src={picture} />
          </Card>
        </Flex>
       
        <ButtonGroup alignSelf='end' borderRadius='full' marginEnd='5%' color='blue.600'>
          <IconButton borderRadius='inherit' variant='ghost' color='inherit' icon={<InfoOutlineIcon />} aria-label='Information'/>
          <IconButton borderRadius='inherit' variant='ghost' color='inherit' icon={<RiNotification2Fill />} aria-label='Notifications'/>
          <IconButton borderRadius='inherit' variant='ghost' color='inherit' icon={<SettingsIcon />} aria-label='Settings'/>
        </ButtonGroup>

        {/* TEXTS: Name and description */}
        <Box marginTop='20px' marginStart='5%'>
          <Heading>
            {(community ? community.name : '')}
          </Heading>
          <Box>
            <Heading size='sm' marginStart='5%' color='gray'>
            {(community ? community.description : '')}
            </Heading>
          </Box>
          
        </Box>
         
      </Card>
    }

    function Card_Post() {

      const [type, setType] = useState<string>('')

      //changing view for the different post types
      function ViewType() {

        function Task() {
          return <Box height='100px'>
            <Heading size='md' color='orange'>
              This is under construction!
            </Heading>
          </Box>
        }
        function Goal() {
          return <Box height='100px'>
            <Heading size='md' color='orange'>
              This is under construction!
            </Heading>
          </Box>
        }
        function Photo() {
          return <Box height='100px'>
            <Heading size='md' color='orange'>
              This is under construction!
            </Heading>
          </Box>
        }
        function Video() {
          return <Box height='100px'>
            <Heading size='md' color='orange'>
              This is under construction!
            </Heading>
          </Box>
        }
        function Poll() {
          return <Box height='100px'>
            <Heading size='md' color='orange'>
              This is under construction!
            </Heading>
          </Box>
        }

        function RenderView() {
          switch(type) {
            case 'Task':
              return <Task/>;
            case 'Goal':
              return <Goal />;
            case 'Photo':
              return <Photo />;
            case 'Video':
              return <Video />;
            case 'Poll':
              return <Poll />;
            default:
              return <Box/>
          }
        }
        
        return <RenderView/>
      }

      return <Card minH='100px' padding='5%' borderRadius={measurements.cards.borderRadius} position='relative'>
        
        <HStack>
          <Flex flexDirection='row' height='100%'>
            <Heading size='md' alignSelf='center'>
              Create a Post
            </Heading>
          </Flex>

          <FormControl borderRadius={measurements.cards.borderRadius} 
          marginY='auto' marginX={measurements.general.rowGap} width='300px'>
            <Select placeholder='Select a post' defaultValue={type}
            onChange={(e)=>setType(e.target.value)}>
              <option value='Task'>Task</option>
              <option value='Goal'>Goal</option>
              <option value='Photo'>Photo</option>
              <option value='Video'>Video</option>
              <option value='Poll'>Poll</option>

            </Select>
          </FormControl>
        </HStack>
        <ViewType />
      </Card>
    }

    function Card_Roster() {

      function RenderAvatar({member} : any) {

        async function getAvatarURL() {
          const profile = await getUser(member.user_id)
          setAvatarurl(profile?.['avatarurl'])
        }
        
        getAvatarURL()
        const [avatarurl, setAvatarurl] = useState<string>('')
        return <Avatar name={`${member.name}`} src={avatarurl ? avatarurl : ''} />

      }

      return <Card height='300px' minWidth='200px' padding='20px' borderRadius={measurements.cards.borderRadius} position='relative'>

        <Heading size='sm'>
          {members && `${formatNumber(members.length)} Members`}
        </Heading>

        <AvatarGroup max={4} columnGap='5px'>
          {members && members.map((member : any, id : number) => 
            <RenderAvatar member={member} key={id} />
          )}
        </AvatarGroup>
      </Card>
    }




    return(<Box width='max-content' marginX='auto' borderRadius='40px'>        
        {twoColumns( <MainContent/> , <SupportingContent/>)}
    </Box>
    );
}

function HeaderNav({setView, community}: any) {


    const navigation = [
        ['calendar', <RiCalendarEventLine/>, <Calendar community={community} />],
        ['goals', <TbTarget/>, <GoalDashboard community={community} />],
        ['chat', <ChatIcon />, <Chat />]]

    
    return (<VStack>
    <Flex width='100%'>
        {navigation.map((navItem, index) => {
            return (
            <IconButton key={index}
              borderWidth='1px'
              borderEndRadius='unset'
              borderBlockEnd='unset'
              width='100%'
              variant='ghost'
              fontSize='2rem'
              onClick={() => setView(navItem[2])}
              icon={navItem[1] as ReactElement} aria-label={navItem[0] as string}/>)})}
      </Flex>
    <Divider/>
  </VStack>)
}