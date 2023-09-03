import { useState, useEffect, MouseEventHandler } from 'react';
import {
    Avatar,
    Heading,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Stack,
    Box,
    FormControl,
    FormLabel,
    ModalFooter,
    Input,
    Textarea,
    Badge,
    useColorModeValue,
    useToast,
    Flex,
    CloseButton,
    IconButton,
    Toast,
} from '@chakra-ui/react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

type PersonType = {
    name: string,
    username: string,
    biography: string,
    avatarurl: string,
    userid: string,
}

type FriendRequestType = {
    username: string,
    avatarurl: string,
    
}


export default function Profile() {

    // Variables ----------------------------------------------------------------------

    // set up state variables for the name modal and user name input fields

    //personal profile state variables
    const [showNameModal, setShowNameModal] = useState(false);
    const [person, setPerson] = useState<PersonType>({ name: '', username: '', biography: '', avatarurl: '', userid: '' });

    //friends state variables
    const [friendUsername, setFriendUsername] = useState<string>('');
    const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);

    const [friends, setFriends] = useState<PersonType[]>([]);

    const toast = useToast();
    

    // UseEffects ----------------------------------------------------------------------

    // get the user's information from Supabase and update the person state
    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('userid', user?.id)
                .single();

            if (error) {
                console.log(error);
            } else {
                // console.log(data);
                setPerson({
                    name: data.name,
                    username: data.username,
                    biography: data.biography,
                    avatarurl: data.avatarurl,
                    userid: data.userid,
                });
            }
        };
        getProfile();
    }, []);


    //set friend requests

    
    useEffect(() => {
        const fetchFriendRequests = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                const { data: requests, error } = await supabase
                    .from('friends')
                    .select('relating_user')
                    .eq('related_user', user.id)
                    .eq('status', 1);
        
                if (error) {
                    console.log(error);
                }
        
                if (requests) {
                    const requestsWithUsernames: (FriendRequestType | undefined)[] = await Promise.all(requests.map(async (request) => {
                        const { data: user, error } = await supabase
                            .from('profiles')
                            .select('username, avatarurl')
                            .eq('userid', request.relating_user)
                            .single();
        
                        if (error) {
                            console.log(error);
                        }
                        if (user) {
                            return { username: user.username, avatarurl: user.avatarurl };
                        }
                    }));
        
                    setFriendRequests(requestsWithUsernames.filter((request): request is FriendRequestType => request !== undefined));
                }
            }
        };
        fetchFriendRequests();
    }, []);
    
    useEffect(() => {
        const fetchFriends = async () => {
            const { data: { user } } = await supabase.auth.getUser();
    
            if (user) {
                const { data: friendsData1, error: error1 } = await supabase
                    .from('friends')
                    .select('related_user')
                    .eq('relating_user', user.id)
                    .eq('status', 2);
    
                const { data: friendsData2, error: error2 } = await supabase
                    .from('friends')
                    .select('relating_user')
                    .eq('related_user', user.id)
                    .eq('status', 2);
    
                if (error1 || error2) {
                    console.log(error1, error2);
                } else {
                    const friendsData = [
                        ...friendsData1.map(item => ({ userId: item.related_user })),
                        ...friendsData2.map(item => ({ userId: item.relating_user }))
                    ];
    
                    const friendsWithUsernames: (PersonType | undefined)[] = await Promise.all(friendsData.map(async (friend) => {
                        const { data: user, error } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('userid', friend.userId)
                            .single();
    
                        if (error) {
                            console.log(error);
                        }
                        if (user) {
                            return {
                                name: user.name,
                                username: user.username,
                                biography: user.biography,
                                avatarurl: user.avatarurl,
                                userid: user.userid,
                            };
                        }
                    }));
    
                    setFriends(friendsWithUsernames.filter((friend): friend is PersonType => friend !== undefined));
                }
            }
        };
        fetchFriends();
    }, []);
    

    // Functions ----------------------------------------------------------------------

    // update the user's name in the user_profile table
    const handleNameSubmit = async () => {
        // get the user's information
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user);

        const { data, error } = await supabase
            .from('profiles')
            .update({
                name: person.name,
                biography: person.biography,
                avatarurl: person.avatarurl,
            })
            .eq('userid', user?.id);

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setShowNameModal(false);
        }
    };

    //friends functions
    const handleAddFriend = async () => { 

        //get user profile
        const { data: {user} } = await supabase.auth.getUser()

        // get the profile of the friend being added
        const { data: friend, error: friendError} = await supabase
            .from('profiles')
            .select('userid')
            .eq('username', friendUsername)
            .single();

        if (friendError) {
            toast({
                title: "An error occurred.",
                description: `There's no user with the username ${friendUsername}`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!friend) {
            toast({
                title: "No such user found.",
                description: `There's no user with the username ${friendUsername}`,
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
                status: 1,
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
                description: `You have sent a friend request to ${friendUsername}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            setFriendUsername(''); // clear the friend's username field
        }
    };

    

    const handleAcceptFriendRequest = async (request: FriendRequestType) => {
        const { data: { user } } = await supabase.auth.getUser();
    
        // get the profile of the friend being added
        const { data: friend, error: friendError } = await supabase
            .from('profiles')
            .select('userid')
            .eq('username', request.username)
            .single();
    
        if (friendError || !friend) {
            toast({
                title: "An error occurred.",
                description: `Unable to find user ${request.username}`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
    
        const { error } = await supabase
            .from('friends')
            .update({
                status: 2,
            })
            .eq('relating_user', friend.userid)
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
            setFriends([...friends, {
                name: request.username,
                username: request.username,
                biography: '',
                avatarurl: request.avatarurl,
                userid: friend.userid,
            }]);
            setFriendRequests(friendRequests.filter((fr) => fr.username !== request.username));
            toast({
                title: "Friend request accepted.",
                description: `You are now friends with ${request.username}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    };
    
    const handleRemoveFriend = async (friendId: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Delete the friend relationship in the database
        // where current user's ID is in either 'relating_user' or 'related_user' field
        const { error: error1 } = await supabase
            .from('friends')
            .delete()
            .match({
                relating_user: user?.id,
                related_user: friendId
            });
            
        const { error: error2 } = await supabase
            .from('friends')
            .delete()
            .match({
                relating_user: friendId,
                related_user: user?.id
            });
    
        if (error1 || error2) {
            console.log(error1, error2);
            return;
        }
    
        // Update the friends state to remove the friend from the UI
        setFriends((prevFriends) => prevFriends.filter(friend => friend.userid !== friendId));
    };
    



    
    const handleEditProfile = () => {
        setShowNameModal(true);
    };

    
    

    return (
        <Stack
            direction={['column', null, 'row']}
            mt={12}>
            <Box ml={["auto", 12]} mt={6} mr={["auto", 12]}>
                <Avatar boxSize={300} name={person.name} src={person.avatarurl} />
                <Heading as="h1" size="xl" mt={4}>
                    {person.username}
                </Heading>
                <Text fontSize="lg" color="gray.500">
                    {person.name}
                </Text>
                <Button mt={4} onClick={handleEditProfile} w={"full"}>
                    Edit Profile
                </Button>
                {/* modal for name and username */}
                {showNameModal && (
                    <Modal isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit Profile Information</ModalHeader>
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Full name</FormLabel>
                                    <Input
                                        placeholder="Uppercase and lowercase letters only"
                                        value={person.name}
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '');
                                        }}
                                        onChange={(e) => setPerson((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Avatar</FormLabel>
                                    <Input
                                        placeholder="put a url here"
                                        value={person.avatarurl}
                                        onChange={(e) => setPerson((prev) => ({ ...prev, avatarurl: e.target.value }))}
                                    />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={handleNameSubmit}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Box>

            <Box pt={12} pl={4} pr={4} w={'full'}>
                <Heading as="h1" size="xl" mb={4} >
                    Settings
                </Heading>
                <Badge colorScheme="blue" fontSize="md" mb={1}>biography</Badge>
                {person.biography !== '' && (
                    <Button
                        size="xs"
                        float={"right"}
                        onClick={handleNameSubmit}
                    >
                        Save
                    </Button>
                )}
                <Textarea
                    fontSize="sm"
                    color="gray.500"
                    mb={4}
                    value={person.biography}
                    onChange={(e) => setPerson((prev) => ({ ...prev, biography: e.target.value }))}

                />

                <Box bg={useColorModeValue('gray.100', 'gray.900')} rounded={'lg'} p={2} mb={4}>
                    <Badge colorScheme="blue" fontSize="md" mb={1}>Friends</Badge>

                    <Stack direction={'row'}>
                        {friends.length === 0 && <Text>No friends yet</Text>}
                        {friends.map((friend, i) => (
                            <Box key={i} textAlign='center' p={3} >
                                <Flex direction="column" alignItems="center" position={'relative'}>
                                    <Avatar size={"lg"} src={friend.avatarurl} />
                                    <IconButton
                                        aria-label="Remove friend"
                                        icon={<CloseIcon />}
                                        size="xs"
                                        variant="ghost"
                                        onClick={() => handleRemoveFriend(friend.userid)} // Need to implement this function to handle the removal of friends
                                        position="absolute"
                                        top={-1}
                                        right={-1}
                                        bg="red.500"
                                    />
                                </Flex>
                                <Text>{friend.username}</Text>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Box bg={useColorModeValue('gray.100', 'gray.900')} rounded={'lg'} p={2} mb={4}>
                    <Badge colorScheme="blue" fontSize="md" mb={1}>Friend Requests</Badge>

                    <Stack direction={'row'}>
                        {friendRequests.length === 0 && <Text>No friend requests</Text>}
                        {friendRequests.map((request, i) => (
                        <Box key={i} textAlign='center' p={3} >
                            <Avatar size={"lg"} src={request.avatarurl} />
                            <Text>{request.username}</Text>
                            <Button onClick={() => handleAcceptFriendRequest(request)}>Accept</Button>
                            </Box>
                        ))}
                    </Stack>



                </Box>


                <FormControl>
                    <FormLabel>Add Friend</FormLabel>
                    <Input
                        placeholder="friend's username"
                        value={friendUsername}
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '');
                            setFriendUsername(e.currentTarget.value);
                        }}
                        
                    />
                    <Button mt={4} w={"full"} onClick={handleAddFriend}>
                        Send Request
                    </Button>
                </FormControl>
            </Box>
        </Stack>
    );
}