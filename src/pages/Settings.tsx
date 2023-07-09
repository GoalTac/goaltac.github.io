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
} from '@chakra-ui/react';
import { supabase } from '../supabase';
import CheckAndTitle from '../components/CheckAndTitle';
import { Link } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

export default function Profile() {

    // Variables ----------------------------------------------------------------------

    // set up state variables for the name modal and user name input fields
    const [showNameModal, setShowNameModal] = useState(false);
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '', userid: '' });
    const [friendRequests, setFriendRequests] = useState<null | { username: string; avatarurl: string; userid: string; }[]>(null);
    const [friendIds, setFriendIds] = useState<string[]>([]);

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
                setFriendRequests([]);
            }

            if (friendRequestsData) {
                const { data: friendAvatars } = await supabase
                    .from('profiles')
                    .select('username, avatarurl, userid')
                    .in('userid', friendRequestsData[0].requests);

                if (friendAvatars) {
                    setFriendRequests(friendAvatars);
                    setFriendIds(friendAvatars.map((friendRequest) => friendRequest.userid));
                }
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



    function acceptFriend(friendUserId: string): MouseEventHandler<HTMLButtonElement> {

        const handleAccept = async () => {

            // Update friend request status in database
            const { error } = await supabase
                .from('friend_requests')
                .update({ requests: friendIds.filter((item) => item !== friendUserId) })
                .eq('userid', person.userid);

            if (error) {
                throw error;
            }
            else {
                // get friends list
                const { data: friends, error: error2 } = await supabase
                    .from('profiles')
                    .select('friends')
                    .eq('username', person.username);

                if (friends === null) {
                    throw error2;
                }

                // Add friend to friends list
                const { data, error } = await supabase
                    .from('profiles')
                    .update({ friends: [...friends, friendUserId] })
                    .eq('username', person.username);

                if (error || error2) {
                    throw error;
                }
            }


            toast({
                title: 'accepted friend request',
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: false,
            });
        };

        return handleAccept;
    }


    const handleEditProfile = () => {
        setShowNameModal(true);
    };


    function handleRemoveFriend(): MouseEventHandler<HTMLButtonElement> | undefined {
        throw new Error('Function not implemented.');
    }

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
                            {/* {friendRequests?.length === 0 ? ( */}
                            {/* <Text>No friends</Text> */}
                            {/* ) : ( */}
                            <Link to={'/profile/' + 'adi'} >
                                <Box textAlign='center' p={3} >
                                    <Flex direction="column" alignItems="center" position={'relative'}>
                                        <Avatar name='adi' size="lg" />
                                        <IconButton
                                            aria-label="Remove friend"
                                            icon={<CloseIcon />}
                                            size="xs"
                                            variant="ghost"
                                            onClick={() => handleRemoveFriend()}
                                            position="absolute"
                                            top={-1}
                                            right={-1}
                                            bg="red.500"
                                        />
                                    </Flex>
                                    <Text>adi</Text>
                                </Box>
                            </Link>
                            {/* )} */}
                        </Stack>
                    </Box>

                    <Box bg={useColorModeValue('gray.100', 'gray.900')} rounded={'lg'} p={2} mb={4}>
                        <Badge colorScheme="blue" fontSize="md" mb={1}>Friend Requests</Badge>

                        <Stack direction={'row'}>
                            {friendRequests?.length === 0 ? (
                                <Text>No friend requests</Text>
                            ) : (friendRequests?.map((friendRequest) => (
                                <Link to={'/profile/' + friendRequest.username} >
                                    <Box textAlign='center' p={3} >
                                        <Avatar key={friendRequest.username} src={friendRequest.avatarurl} size={"lg"} />
                                        <Text>{friendRequest.username}</Text>
                                        <Button onClick={acceptFriend(friendRequest.userid)}>Accept</Button>
                                    </Box>
                                </Link>

                            )))}
                        </Stack>
                    </Box>

                </Box>
            </Stack>
        </CheckAndTitle>
    );
}