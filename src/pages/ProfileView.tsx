import { Avatar, Box, Heading, Stack, Text, Badge, Textarea, Flex, useToast, Button, useColorModeValue, HStack, Image, VStack, Card, Spacer, Menu, MenuButton, IconButton, MenuList, MenuItem, CardBody, CardHeader, StackDivider} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../supabase';
import Chat from "../components/Chats/PrivateChat";
import { _getJoinedCommunities, getCommunityByID, measurements } from "../components/Communities/CommunityAPI";
import { HamburgerIcon } from "@chakra-ui/icons";
import ProfileBackground from '../images/ProfileBackground.svg'
import Header from "../components/Communities/Community/Information";

export default function ProfileView() {

    // Variables ----------------------------------------------------------------------
    const { profileName } = useParams<{ profileName: string }>();
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '', streak: 0, points: 0, id: ''});
    //friends state variables
    const [friendStatus, setFriendStatus] = useState(0);
    const [isFriendRequestSentByUser, setIsFriendRequestSentByUser] = useState(false);
    const [friendCount, setFriendCount] = useState(0);

    const toast = useToast();

    // UseEffects ----------------------------------------------------------------------

    // get the user's information from Supabase and update the person state
    useEffect(() => {
        const getProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('username', profileName)
                .single();

            if (error) {
                throw new Error(error.message)
            } else {
                setPerson({
                    name: data.name,
                    username: data.username,
                    biography: data.biography,
                    avatarurl: data.avatarurl,
                    streak: data.streak,
                    points: data.points,
                    id: data.userid,
                });
            }
        };
        getProfile();
    }, []);

    /*async function getCommunityNameByID(communityID: any)  {
        const { data: data, error } = await supabase
            .from('communities')
            .select('name')
            .eq('community_id', communityID)
            .single();
        if (error) {
            throw new Error(error.message)
        }
    
        return data;
    }

    // Get the communities that the user is a part of
    useEffect(() => {
        async function _getJoinedCommunities(userID: any) {
            const { data: data, error } = await supabase
                .from('community_relations')
                .select('*')
                .match({'user_uuid': userID, 'status': 'Accepted'});
            if (error) {
                throw new Error(error.message)
            } 
        
            const communities = await Promise.all(data.map(async(id) => {
                return await getCommunityNameByID(id.community_id)
            }))
            
            // Get the whole array of communities
            // return all the communities that the user is a part of

            return communities;
        }
        _getJoinedCommunities(person.id);
    });*/


    // useEffect(() => {
    //     const getCommunities = async () => {
    //         const { data, error } = await supabase
    //             .from('community_relations')
    //             .select('community_id, communities(community_id, name)')
    //             .eq('user_id', person.id);

    //         if (error) {
    //         }
    //         else {
    //             console.log(data);
    //         }
    //     };
    //     getCommunities();
    // }, [person.id]);

    // Get the names of the communities that the user is a part of
    // useEffect(() => {
    //     const getCommunities = async () => {
    //         const { data, error } = await supabase
    //             .from('community_relations')
    //             .select('community_id, communities(community_id, name)')
    //             .eq('user_id', person.id);
    //         if (error) {
    //             console.log(error.message);
    //         }
    //         else {
    //             console.log(data);
    //         }
    //     }
    //     getCommunities();
    // });

    // Get posts from Social.tsx


    // Find the number of friends the user has and update the friendCount state, both as the user and as the profile being viewed
    useEffect(() => {
        const getFriendCount = async () => {
            //get user profile
            // const { data: {user} } = await supabase.auth.getUser();

            // get the number of friends the user has
            const { data: data1, error:error1 } = await supabase
                .from('friends')
                .select('*')
                .eq('relating_user', person?.id)
                .eq('status', 2);
            const { data: data2, error:error2 } = await supabase
                .from('friends')
                .select('*')
                .eq('related_user', person?.id)
                .eq('status', 2);
            if (error1 || error2) {
                throw new Error(`Error determining friend count: \n ${error1} ${error2}`);
            }
            else {
                setFriendCount(data1.length + data2.length);
            }
        };
        getFriendCount();
    });

    // Find whether user is already friends with this profile
    useEffect(() => {
        const checkFriendStatus =async () => {
            //get user profile
            const { data: {user} } = await supabase.auth.getUser();

            if (user) {
                // if the user's on their own profile page, they shouldn't be friends with themselves
                if (user.id == person.id) {
                    setFriendStatus(-1);
                }

                // Check both: if user is the "related_user" or the "relating_user"
                const { data: data1, error:error1 } = await supabase
                    .from('friends')
                    .select('*')
                    .eq('related_user', user.id)
                    .eq('relating_user', person.id);
                const { data: data2, error:error2 } = await supabase
                    .from('friends')
                    .select('*')
                    .eq('related_user', person.id)
                    .eq('relating_user', user.id);
                if (error1 || error2) {
                    throw new Error(`Error determining friend status: \n ${error1} ${error2}`);
                }

                else {
                    if (data1.length > 0) {
                        setFriendStatus(data1[0].status);
                        if (friendStatus==1 && data1[0].relating_user == user.id) {
                            setIsFriendRequestSentByUser(true);
                        }
                    }
                    else if (data2.length > 0) {
                        setFriendStatus(data2[0].status);
                        if (friendStatus==1 && data2[0].relating_user == user.id) {
                            setIsFriendRequestSentByUser(true);
                        }
                    }
                    throw new Error(`Friend Status is: \n ${friendStatus}`);
                }
            }
        };
        checkFriendStatus();
    });


    // ---- Friends Functions ----
    const handleAddFriend = async () => { 
        //get user profile
        const { data: {user} } = await supabase.auth.getUser()

        // get the id of the friend being added
        const { data: friend, error: friendError} = await supabase
            .from('profiles')
            .select('userid')
            .eq('username', profileName)
            .single();

        if (friendError) {
            toast({
                title: "An error occurred.",
                description: `There's no user with the username ${profileName}`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!friend) {
            toast({
                title: "No such user found.",
                description: `There's no user with the username ${profileName}`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        
        const { error } = await supabase
            .from('friends')
            .insert({
                relating_user: user?.id,
                related_user: friend.userid ,
                status: 'Accepted',
            });

        if (error){
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }

        else {
            toast({
                title: "Friend request sent.",
                description: `You have sent a friend request to ${person.name}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    };
    
    const handleRemoveFriend = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Delete the friend relationship in the database
        // where current user's ID is in either 'relating_user' or 'related_user' field
        const { error: error1 } = await supabase
            .from('friends')
            .delete()
            .match({
                relating_user: user?.id,
                related_user: person.id
            });
            
        const { error: error2 } = await supabase
            .from('friends')
            .delete()
            .match({
                relating_user: person.id,
                related_user: user?.id
            });
    
        if (error1 || error2) {
            
            toast({
                title: "An error occurred.",
                description: "Unable to remove friend",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            throw new Error(`${error1?.message} ${error2?.message}`);
        }
        else {
            toast({
                title: "Friend removed.",
                description: `You have removed ${person.name} as a friend`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleCancelFriendRequest = async () => {
        // just call handleRemoveFriend() because the friend relationship is already in the database (it just has a differnt status)
        handleRemoveFriend();
    }

    const handleAcceptFriendRequest = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase
            .from('friends')
            .update({
                status: 2,
            })
            .eq('relating_user', person.id)
            .eq('related_user', user?.id);
    
        if (error) {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Friend request accepted.",
                description: `You are now friends with ${person.name}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <HStack
        overflow='hidden' 
        padding='20px'  
        direction='row'
        spacing='4'
        backgroundColor={useColorModeValue('white','blackAlpha.200')} 
        marginY={measurements.general.rowGap}>
            <Card
            w='65vw'
            overflow='hidden'
            >
                <Stack>
                <Card
                backgroundImage={ProfileBackground}
                overflow='hidden' 
                >
                    <Image 
                    height={'20%'} 
                    objectFit={'cover'}
                    width={'20%'} 
                    src={ProfileBackground} 
                    overflow={'hidden'}
                    />
                </Card>
                    <HStack 
                    padding={'20px'}
                    spacing={20}
                    alignSelf={'flex-start'}
                    >
                        <Avatar size='2xl' name={person.name} src={person.avatarurl} />
                        <VStack
                        spacing={3}
                        align={'left'}
                        >
                            <HStack>
                                <Heading size='lg'>{person.name}</Heading>
                                <Spacer/>
                                <Button 
                                colorScheme="blue" 
                                fontSize="md" 
                                onClick={
                                friendStatus==2 ? handleRemoveFriend : 
                                friendStatus==1 && isFriendRequestSentByUser ? handleCancelFriendRequest : 
                                friendStatus==1 ? handleAcceptFriendRequest : 
                                friendStatus==0 ? handleAddFriend : () => {}}
                                >
                                    {friendStatus==2 ? "Remove Friend" : 
                                    friendStatus==1  && isFriendRequestSentByUser ? "Cancel Friend Request" : 
                                    friendStatus==1 ? "Accept Friend Request from " + person.name :
                                    friendStatus==0 ? "Add Friend" : "You can't friend yourself"}
                                </Button>
                                {friendStatus==2 ? <Chat/> : <Box/>}
                                <Menu isLazy>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<HamburgerIcon />}
                                        variant='outline'
                                    />
                                    <MenuList>
                                        <MenuItem>
                                            New Tab
                                        </MenuItem>
                                        <MenuItem>
                                            New Window
                                        </MenuItem>
                                        <MenuItem>
                                            Open Closed Tab
                                        </MenuItem>
                                        <MenuItem>
                                            Open File...
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                            <Box>
                                <Badge fontSize='xl' fontWeight='bold'>
                                        {friendCount} {friendCount == 1 ? 'Friend' : 'Friends'}
                                </Badge>
                            </Box>
                            
                            <Text fontSize="lg">{person.username}</Text>
                            <Text
                            fontSize="md"
                            >
                                {person.biography}
                            </Text>
                        </VStack>

                </HStack>
                <Box textAlign={'center'}>
                    <Text fontSize={'3xl'} as='b'>
                    Wish to add posts here!
                    </Text>
                </Box>
        </Stack>            
        </Card>
        <Card 
            w='35vw'
            alignSelf={'flex-start'}
        >
            <HStack
            justifyContent={'right'}
            >
                
                
            </HStack>
            <Box textAlign={'center'}>
                <Text fontSize='3xl' as='b' >Wish to add communities here!</Text>  
            </Box>
        </Card>
    </HStack>
    );
}
