import { Avatar, Box, Heading, Stack, Text, Badge, Textarea, Flex, useToast, Button, useColorModeValue} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../supabase';
import Chat from "../components/Chats/PrivateChat";
import { CloseIcon } from "@chakra-ui/icons";

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

export default function ProfileView() {

    // Variables ----------------------------------------------------------------------
    const { profileName } = useParams<{ profileName: string }>();
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '', streak: 0, points: 0 });
    //friends state variables
    const [friendUsername, setFriendUsername] = useState<string>('');

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
                console.log(error);
            } else {
                // console.log(data);
                setPerson({
                    name: data.name,
                    username: data.username,
                    biography: data.biography,
                    avatarurl: data.avatarurl,
                    streak: data.streak,
                    points: data.points,
                });
            }
        };
        getProfile();
    }, []);


    const handleAddFriend = async () => { 

        //get user profile
        const { data: {user} } = await supabase.auth.getUser()

        // get the profile of the friend being added
        const { data: friend, error: friendError} = await supabase
            .from('profiles')
            .select('userid')
            .eq('username', profileName)
            .single();

        if (friendError || !friend) {
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
                description: `You have sent a friend request to ${person.name}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    };
    
    return (
        <>
        <Stack
            direction={['column', null, 'row']}
            mt={12}
        >
            <Box ml={["auto", 12]} mt={6} mr={["auto", 12]}>
                <Avatar boxSize={300} name={person.name} src={person.avatarurl} />
                <Heading as="h1" size="xl" mt={4}>
                    {person.name}
                </Heading>
                <Text fontSize="lg" color="gray.500">
                    {person.username}
                </Text>
            </Box>

            <Box pt={12} pl={4} pr={4}>
                <Heading as="h1" size="xl" mb={4} >
                    Profile
                </Heading>
                <Badge colorScheme="blue" fontSize="md" mb={1}>biography</Badge>

                <Textarea
                    fontSize="sm"
                    color="gray.500"
                    mb={4}
                    value={person.biography}
                    readOnly
                />

                <Flex>
                    <Heading as="h1" size="md"  >Streak: <Badge colorScheme="blue" fontSize="lg" mb={1} mr={6}>{person.streak}</Badge></Heading>
                    <Heading as="h1" size="md"  >Points: <Badge colorScheme="blue" fontSize="lg" mb={1} mr={6}>{person.points}</Badge></Heading>
                </Flex>
                <Box bg={useColorModeValue('gray.100', 'gray.900')} rounded={'lg'} p={2} mb={4}>
                    <Button 
                        colorScheme="blue" 
                        fontSize="md" 
                        mb={1}
                        onClick={handleAddFriend}
                    >
                            Friend Status placeholder
                    </Button>

                                    {/* <IconButton
                                        aria-label="Remove friend"
                                        icon={<CloseIcon />}
                                        size="xs"
                                        variant="ghost"
                                        onClick={() => handleRemoveFriend(friend.userid)} // Need to implement this function to handle the removal of friends
                                        position="absolute"
                                        top={-1}
                                        right={-1}
                                        bg="red.500"
                                    /> */}
                </Box>
            </Box>
            <Chat />
        </Stack>
        </>
    );
}