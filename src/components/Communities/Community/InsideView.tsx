import Header from './Information'
import { useState, useEffect, ReactElement, useRef } from 'react';
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'
import ProfileBackground from '../../../images/ProfileBackground.svg'
import { useNavigate, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Card,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Text,
    HStack,
    Heading,
    IconButton,
    IconProps,
    Image,
    Select,
    Spinner,
    Stack,
    VStack,
    Spacer,
    Progress,
    Icon,
    Input,
    Textarea,
    transition
} from '@chakra-ui/react';
  import {
    TbTarget
  } from 'react-icons/tb'
  import {
    FaUserFriends,
    FaChalkboard,
    FaArrowRight,
    FaHistory
  } from 'react-icons/fa'
  import {
    RiCalendarEventLine, RiNotification2Fill
  } from 'react-icons/ri'
  import { 
    ChatIcon,
    InfoOutlineIcon,
    SettingsIcon, 
    CheckIcon,
    InfoIcon,
    ArrowForwardIcon
} from '@chakra-ui/icons';
import {
    Box,
    useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
import { measurements, _getAllMembers, getCommunityByName, getPicture, _getMembers } from '../CommunityAPI'
import { uniqueId } from 'lodash';
import Chat from '../../Chats/CommunityChat';
import GoalDashboard from './Goals';
import Calendar from './Calender';
import { formatNumber, getUser, twoColumns } from '../../../hooks/Utilities';
import { useSession } from '../../../hooks/SessionProvider';
import { GiArrowhead, GiFastArrow } from 'react-icons/gi';
/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView() {
    const { communityName } = useParams<{ communityName: string }>();
    const [community, setCommunity] = useState<any>([]);
    const [members, setMembers] = useState<any>([])
    const [vipMembers, setVipMembers] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(true)
    const darkOrLightColor = useColorModeValue('blue.200', 'blue.500')
    const { user: user } = useSession();

    //load in the community variable asyncronously
    useEffect(() => {
      let promisedCommunity: any;
      let promisedMembers: any;
      let promisedVipMembers: any;
      fetchCommunityData()

      async function fetchCommunityData() {
        const fetchedCommunity = getCommunityByName(communityName)
        promisedCommunity = await fetchedCommunity

        //after fetching community, then fetch members
        fetchedCommunity.finally(()=> {

          async function fetchMembers() {
            const fetchedMembers = _getAllMembers(promisedCommunity.community_id)
            promisedMembers = await fetchedMembers
            render()
          }
          async function fetchVipMembers() {
            const fetchedVipMembers = _getMembers(promisedCommunity.community_id, ['Owner', 'Admin', 'Moderator'])
            promisedVipMembers = await fetchedVipMembers
            render()
          }
          fetchMembers()
          fetchVipMembers()
        })
      }
      function render() {
        if (promisedCommunity && promisedMembers && promisedVipMembers) {
          setCommunity(promisedCommunity)
          setMembers(promisedMembers)
          setVipMembers(promisedVipMembers)
          setLoading(false)
        } else {
          setLoading(true)
        }
      }
      
    }, []);

    //to display the group of toggleable views
    function MainContent() {
      return <Flex maxWidth='600px'
      rowGap={measurements.general.rowGap} flexDirection='column'>
          <Card_Header />
          <Card_Tasks/>
          <Card_Post />
          <Heading>
            Below this will be all the posts that people have made
          </Heading>
        </Flex>
    }

    //Statistics and such
    function SupportingContent() {
      return <Flex maxWidth='200px' width='max-content' 
      rowGap={measurements.general.rowGap} flexDirection='column'>
        <Card_Roster/>
        <Card_VIP />
        {members.map((member : any)=> member.user_id).includes(user?.['id']) && 
          <Card height='400px' padding='10px' borderRadius={measurements.cards.borderRadius}>
            <Chat />           
          </Card>}
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
        <Box borderRadius='inherit' borderBottomRadius='unset' height='50%' overflow='clip'>
          <Image src={ProfileBackground} />
          
        </Box>

       
        
        {/* TEXTS: Name and description */}
        <Box marginTop='10px' paddingX='5%'>
          <Flex borderRadius={measurements.cards.borderRadius} left='5%' position='absolute' marginTop='-90px'>
            <Card borderRadius='inherit' borderColor='gray' borderWidth='2px' height='100px' width='100px' margin='auto' padding='10px'>
              <Image src={picture} />
              <Badge variant='solid' position='relative' height='min' width='min' marginTop='10px' marginX='auto' zIndex='9' borderWidth='1px'>
                {community && (community.isPublic ? 'Public' : 'Private')}
              </Badge>
            </Card>
          </Flex>
          <HStack alignSelf='end' marginEnd='10px' marginTop='10px'>
            <Heading> {(community ? community.name : '')} </Heading>
            <Spacer/>
            <ButtonGroup borderRadius='full' color={darkOrLightColor}>
              <IconButton borderRadius='inherit' variant='ghost' color='inherit' icon={<InfoOutlineIcon />} aria-label='Information'/>
              <IconButton borderRadius='inherit' variant='ghost' color='inherit' icon={<RiNotification2Fill />} aria-label='Notifications'/>
              <IconButton borderRadius='inherit' variant='ghost' color='inherit' icon={<SettingsIcon />} aria-label='Settings'/>
            </ButtonGroup>
            
          </HStack>
            <Text size='sm' height='100px' marginStart='30px' overflowY='scroll'>
            {(community ? community.description : '')}
            </Text>
          
        </Box>
         
      </Card>
    }

    function Card_Post() {

      const [type, setType] = useState<string>('')

      //changing view for the different post types
      function ViewType() {

        function Task() {
            const [name, setName] = useState<any>('');
            const [description, setDescription] = useState<any>('');
            const [pic, setPic] = useState<any>(null);
            const [isPublic, setIsPublic] = useState<any>(true);
            const [community_id, setCommunity_id] = useState<any>('');
            const [points, setPoints] = useState<any>(0);
            const [role, setRole] = useState<any>(0);
            const [status, setStatus] = useState<any>(1); //joined
        
            const handleAddCommunity = async() => {
              /*
                _addCommunity({
                    name: name,
                    description: description,
                    pic: pic,
                    score: 0,
                    isPublic: isPublic,
                }).then((response : any)=>{ //fix this setting community id to the wrong id

                    if(response.message) {
                        toast({
                            title: "Error",
                            description: response.message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                        return
                    }

                    const uuid = response?.['community_id']
                    const addedMember = _addMember({
                        community_id: uuid, 
                        user_id: (user ? user?.['id'] : ''),
                        role: 'Owner'
                    })
                    addedMember.then((response : any)=> {
                        if(response.message) {
                            toast({
                                title: "Error",
                                description: response.message,
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                            })
                        } else {
                            toast({
                                title: "Success",
                                description: `Successfully created ${name}`,
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            })
                        }
                    })
                    
                    setName('')
                    setDescription('')
                    setPic('')
                    setIsPublic('')

                })
                */
            }
        
            return(
                <Box padding='20px'>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
        
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="blue" mt={3} onClick={handleAddCommunity}>
                        {'Save'}
                    </Button>
                </Box>
            )
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
          <Spacer/>
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
      const maxViewableRoster : number = 2

      function RenderAvatar({member} : any) {
        const [profile, setProfile] = useState<{ [x: string]: any; } | undefined>(undefined)

        useEffect(()=> {
          async function fetchProfile() {
            const profile = await getUser(member.user_id)
            setProfile(profile)
          }
          fetchProfile()
        },[])
        
        return (profile ? <Box as={Link} to={`/profile/${profile.username}`}>
          <Avatar name={`${profile.name}`} src={profile.avatarurl}  />
        </Box> : <Avatar src='' />)
      }

      function RosterButton() {
        return <Button variant='ghost' width='100%' rightIcon={<FaArrowRight />}>
          <Heading size='xs'>
            Show Everyone
          </Heading>
        </Button>
      }

      return <Card rowGap='20px' height='min-content'
       padding='20px' borderRadius={measurements.cards.borderRadius} 
       position='relative' borderWidth='2px' borderColor={darkOrLightColor}>
        <Heading size='sm'>
          {members && `${formatNumber(members.length)} Members`}
        </Heading>

        <AvatarGroup max={maxViewableRoster} columnGap='5px'>
          {/* ISSUE : Eventually we need to limit this 
          to only map through a chunk of members at a time */}
          {members && members.map((member : any, id : number) => 
            <RenderAvatar member={member} key={id}/>
          )}
        </AvatarGroup>
        <RosterButton/>
      </Card>
    }

    function Card_VIP() {

      function RenderAvatar({member} : any) {
        const [profile, setProfile] = useState<{ [x: string]: any; } | undefined>(undefined)
        

        useEffect(()=> {
          async function fetchProfile() {
            const profile = await getUser(member.user_id)
            setProfile(profile)
          }
          fetchProfile()
        },[])

        return (profile ? <Flex as={Link} to={`/profile/${profile.username}`}
        flexDirection='column' rowGap={measurements.general.rowGap}>
          <HStack>
            <Avatar name={`${profile.name}`} src={profile.avatarurl}  />
            <Box>
              <Heading size='md'>
                {profile.name}
              </Heading>
              <Badge variant='subtle' backgroundColor={darkOrLightColor}>
                <Text fontSize='xs'>
                  {member.role}
                </Text>
              </Badge>
            </Box>
          </HStack>
          <Text fontSize='xs'>
            {profile.biography}
          </Text>
        </Flex> : <Avatar src='' />)
      }

      return <Card rowGap='20px' height='min-content' minWidth='200px'
       padding='20px' borderRadius={measurements.cards.borderRadius} 
       position='relative' borderWidth='2px' borderColor={darkOrLightColor}>
          {/* ISSUE : Eventually we need to limit this 
          to only map through a chunk of members at a time */}
          {members && vipMembers.map((member : any, id : number) => 
            <RenderAvatar member={member} key={id}/>
          )}
      </Card>
    }

    //STOP THIS RE RENDERING SO MUCH
    function Card_Tasks() {
      //will show score, task completion, and top performers
      const [view, setView] = useState<ReactElement>(<TaskDisplay/>);
      const [type, setType] = useState<string>('progress')
      const exampleTasks : any = [
        {
          name: 'Do a backflip',
          description: 'THE BEST BACKFLIP',
          owner: '136021e3-4e2c-4ed2-8a32-06803fd800e5',
          members: [''],
          created_by: new Date(),
          type: 'Number', //can be number, boolean, tasks
          reward: 15
        },
        {
          name: 'Do a frontflip',
          description: 'THE BEST BACKFLIP',
          owner: '136021e3-4e2c-4ed2-8a32-06803fd800e5',
          members: [''],
          created_by: new Date(),
          type: 'Number', //can be number, boolean, tasks
          reward: 15
        },
        {
          name: 'Do a backflip',
          description: 'THE BEST BACKFLIP',
          owner: '136021e3-4e2c-4ed2-8a32-06803fd800e5',
          members: [''],
          created_by: new Date(),
          type: 'Number', //can be number, boolean, tasks
          reward: 10
        },
        {
          name: 'Do a backflip',
          description: 'THE BEST BACKFLIP',
          owner: '136021e3-4e2c-4ed2-8a32-06803fd800e5',
          members: [''],
          created_by: new Date(),
          type: 'Number', //can be number, boolean, tasks
          reward: 10
        },
      ]
      function TasksCarousel(TaskViews : any) {
        return <Flex marginX='auto' flexDirection='column' overflow='clip' width='100%'>
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlaySpeed={10000}
          autoPlay={true}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={true}
          renderDotsOutside={true}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 1
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 1
            }
          }}
          rewind={true}
          rewindWithAnimation={true}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
          >
          {TaskViews}
        </Carousel>
      </Flex>
      }

      //create a list of react elements and push into carousel
      function TaskDisplay() {
        //creating a caraousel of goals which can be clicked on to view all the arrows made
        //Should load all tasks and profiles before rendering individually
        function Card_Goal(props : any) : ReactElement {
          const task = props.task
          const [selectedTab, setSelectedTab] = useState<Number>(0)
          const [tab, setTab] = useState<ReactElement>(Card_View(task))

          function Card_View(task : any) {
            return <Flex>
              <Flex flexDirection='row'>
                <Flex flexDirection='column'>
                  <Heading size='md'>
                    {task ? task.name : 'Unknown'}
                  </Heading>
                  <Text marginStart='20px' fontSize='sm'>
                    {task ? task.description : 'unknown'}
                  </Text>
                </Flex>
              </Flex>
              
              <Box position='absolute' right='20px'>
                <IconButton isRound={true} variant='solid' zIndex='9'
                  colorScheme='green' aria-label='Done'
                  fontSize='20px' icon={<CheckIcon />} />
                <Badge colorScheme='green' borderRadius='5px' padding='10px' paddingRight='25px' right='20px' position='absolute'>
                  {task ? task.reward : 0} pts
                </Badge>
              </Box>

              <Box position='absolute' right='20px' bottom='20px'>
                <IconButton isRound={true} variant='ghost' zIndex='9'
                  _active={{paddingLeft: '100px', paddingRight: '10px'}}
                  colorScheme='blue' aria-label='Information'
                  fontSize='20px' icon={<InfoIcon />} />
              </Box>
            </Flex>
          }

          //console.log('1')
          //NEED TO REDUCE RE RENDER AMOUNT. This is absurd
          return <Card minHeight='300px' borderWidth='1px' borderColor='gray'
          marginX='40px' padding='20px' borderRadius={measurements.cards.borderRadius} 
          position='relative' >
            {tab}
            <ButtonGroup position='absolute' right='-40px' flexDirection={'column'} zIndex='-1'>
              {//Display all the existing community tasks for one goal
              exampleTasks.map((task : any, id : number) => {
                return <Button variant='solid' onClick={()=>{
                    setSelectedTab(id) 
                    setTab(Card_View(task))
                  }}
                  key={id} paddingRight='10px'
                  right={(selectedTab == id ? '0px' : '10px')}
                  colorScheme={(selectedTab == id ? 'green' : 'gray')}
                  fontSize='20px' rightIcon={(0 == id ? <TbTarget /> : <GiArrowhead/>)} />
              })}
            </ButtonGroup>
          </Card>
        }
        
        return TasksCarousel(
          exampleTasks.map((task : any, id : any)=>{
            return <Card_Goal task={task} key={id}/>
          }))
      }

      function TasksCompleted() {
        //Should load all tasks and profiles before rendering individually
        function TaskCompletedView(props : any) : ReactElement {
          console.log('AH')
          const task = props.task
          const user = members ? members.filter((member : any) => member.user_id == task.owner)[0].user_id : null
          const [profile, setProfile] = useState<{ [x: string]: any; } | undefined>()
        
          useEffect(()=> {
            async function fetchProfile() {
              const profile = await getUser(user)
              setProfile(profile)
            }
            (user && fetchProfile())
          },[])

          return (profile ? <Card minHeight='300px' borderWidth='1px' borderColor='gray'
          padding='20px' borderRadius={measurements.cards.borderRadius} 
          position='relative' >
            <Flex flexDirection='row'>
              <Flex flexDirection='column'>
                <Heading >
                  {task ? task.name : 'Unknown'}
                </Heading>
                <Text marginStart='20px' fontSize='sm'>
                  {task ? task.description : 'unknown'}
                </Text>
              </Flex>
            </Flex>
            
            <Box position='absolute' right='20px'>
              <IconButton isRound={true} variant='solid' zIndex='9'
                colorScheme='green' aria-label='Done'
                fontSize='20px' icon={<CheckIcon />} />
              <Badge colorScheme='green' borderRadius='5px' padding='10px' paddingRight='25px' right='20px' position='absolute'>
                {task ? task.reward : 0} pts
              </Badge>
            </Box>

            <Box position='absolute' right='20px' bottom='20px'>
              <IconButton isRound={true} variant='ghost' zIndex='9'
                _active={{paddingLeft: '100px', paddingRight: '10px'}}
                colorScheme='blue' aria-label='Information'
                fontSize='20px' icon={<InfoIcon />} />
                
              {/**
               * <Avatar name={`${profile.name}`} src={profile.avatarurl} />
              <Badge colorScheme='gray' borderRadius='5px' bottom='0px' padding='10px' width='fit-content' paddingRight='30px' right='20px' position='absolute'>
                {profile.name}
              </Badge>
               */}
            </Box>

          </Card> : <LoadingView/>)
        }

        return TasksCarousel(
            exampleTasks.map((task : any, id : any)=>{
              return <TaskCompletedView task={task} key={id}/>
            }))
      }

      function TasksScheduled() {

      }

      return (<Card rowGap='20px' height='min-content'
      padding='20px' borderRadius={measurements.cards.borderRadius} 
      position='relative'>
        <HStack>
          <Heading>
            Tasks
          </Heading>
          <Spacer/>
          <ButtonGroup variant='outline'>
            <Button fontSize='xs' isActive={type == 'progress'} onClick={()=>{
              setType('progress')}}>
              In Progress
            </Button>
            <Button fontSize='xs' isActive={type == 'scheduled'} onClick={()=>{
              setView(<TasksCompleted/>)
              setType('scheduled')}}>
              Scheduled
            </Button>
            <Button fontSize='xs' isActive={type == 'pending'} onClick={()=>{
              setView(<TasksCompleted/>)
              setType('pending')}}>
              Pending
            </Button>
            <IconButton aria-label='completed' icon={<FaHistory/>} onClick={()=>{
              setView(<TasksCompleted/>)
              setType('completed')}} />
          </ButtonGroup>
        </HStack>
        <Divider/>
        {view}
        
      </Card>)
    }

    return(<Box marginX='auto' borderRadius='40px'>        
        {twoColumns( <MainContent/> , <SupportingContent/>)}
    </Box>
    );
}