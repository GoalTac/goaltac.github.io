import { useState, useEffect } from 'react';
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
    Toast,
} from '@chakra-ui/react';
import { supabase } from '../supabase';
import CheckAndTitle from '../components/CheckAndTitle';

export default function Profile() {

    // Variables ----------------------------------------------------------------------

    // set up state variables for the name modal and user name input fields
    const [showNameModal, setShowNameModal] = useState(false);
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '' });
    const [friend, setFriend] = useState({ name: '', username: '', });

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
                });
            }
        };
        getProfile();
    }, []);

    // get the user's friend requests
    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
        async function fetchFriendRequests() {
            // get my user id
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.log('User not found');
                return;
            }

            const { data: friendRequestsData, error: friendRequestsError } = await supabase
                .from('friend_requests')
                .select('requests')
                .eq('userid', user.id); // Replace 1 with the user ID of the current user

            if (friendRequestsError) {
                console.error(friendRequestsError);
            } else {
                setFriendRequests(friendRequestsData[0].requests);
            }
        }

        fetchFriendRequests();
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

    const handleEditProfile = () => {
        setShowNameModal(true);
    };

    
    // add a friend request in the friend_requests table
    const handleAddFriend = async () => {
        // get the user's information
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log('User not found');
            return;
        }

        const { data, error } = await supabase
            .from('friend_requests')
            .update({ userid: user.id, requests: [friend.username]});

        if (error) {
            console.log(error);
            return Toast({
                title: "Error sending friend request.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        return Toast({
            title: "Friend request sent.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };


    return (
        <CheckAndTitle title='Settings'>
            <Stack
                direction={['column', null, 'row']}
                mt={12}
            >
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
                                            onChange={(e) => setPerson({ name: e.target.value, username: person.username, biography: person.biography, avatarurl: person.avatarurl })}
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Avatar</FormLabel>
                                        <Input
                                            placeholder="put a url here"
                                            value={person.avatarurl}
                                            onChange={(e) => setPerson({ name: person.name, username: person.username, biography: person.biography, avatarurl: e.target.value })}
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

                <Box pt={12} pl={4} pr={4}>
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
                        mb={8}
                        value={person.biography}
                        onChange={(e) => setPerson({ name: person.name, username: person.username, biography: e.target.value, avatarurl: person.avatarurl })}

                    />

                    <Badge colorScheme="blue" fontSize="md" mb={1}>Friend Requests</Badge>

                    {friendRequests.map((friendRequest) => (
                        <Box>
                            <Avatar key={friendRequest} name={friendRequest} size={"lg"} src="" />
                            <Text>{friendRequest}</Text>
                            <Button>Accept</Button>
                        </Box>
                    ))}
                    <FormControl>
                        <FormLabel>Add Friend</FormLabel>
                        <Input
                            placeholder="friend's username"
                            value={friend.username}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '');
                            }}
                            // onSubmit={handleAddFriend}
                        />
                        <Button mt={4} onClick={handleAddFriend} w={"full"}>
                            Send Request
                        </Button>
                    </FormControl>
                </Box>
            </Stack>
        </CheckAndTitle>
    );
}