import { Avatar, Box, Heading, Stack, Text, Badge, Textarea, Flex, useToast, Button, useColorModeValue} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../supabase';
import Chat from "../components/Chats/PrivateChat";
import { CloseIcon } from "@chakra-ui/icons";

export default function ProfileView() {

    // Variables ----------------------------------------------------------------------
    const { profileName } = useParams<{ profileName: string }>();
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '', streak: 0, points: 0, id: ''});
    //friends state variables
    const [friendUsername, setFriendUsername] = useState<string>('');
    const [friendStatus, setFriendStatus] = useState(0);

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
                    id: data.userid,
                });
            }
        };
        getProfile();
    }, []);

    // Find whether user is already friends with this profile
    useEffect(() => {
        const checkFriendStatus =async () => {
            //get user profile
            const { data: {user} } = await supabase.auth.getUser();

            if (user) {
                
                // Check both: if user is the "related_user" or the "relating_user"
                const { data: data1, error:error1 } = await supabase
                    .from('friends')
                    .select('status')
                    .eq('related_user', user.id)
                    .eq('relating_user', person.id);
                const { data: data2, error:error2 } = await supabase
                    .from('friends')
                    .select('status')
                    .eq('related_user', person.id)
                    .eq('relating_user', user.id);
                if (error1 || error2) {
                    console.log("Error determining friend status: \n", error1, error2);
                }

                else {
                    if (data1.length > 0) {
                        setFriendStatus(data1[0].status);
                    }
                    else if (data2.length > 0) {
                        setFriendStatus(data2[0].status);
                    }
                    console.log("Friend Status is: \n", friendStatus);
                    // if friend status == 1, then one person has requested the other as a friend, but 
                    // the request has not been accepted yet. 
                    // We should distinguish if the user or the profile sent the request, so that 
                    // it is displayed differently on this page, ie "Cancel Request you sent" vs "Accept Request from profile"
                }
            }
        };
        checkFriendStatus();
    });


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
            console.log(error1, error2);
            toast({
                title: "An error occurred.",
                description: "Unable to remove friend",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
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


    // Messages functions: 
    // to be implemented / checked. Not sure how /components/Chats/PrivateChat.tsx works, we just imported it

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
                
                <Box bg={useColorModeValue('gray.100', 'gray.900')} rounded={'lg'} p={2} mb={4} mt={4}>
                    <Button 
                        colorScheme="blue" 
                        fontSize="md" 
                        mb={1}
                        onClick={friendStatus==2 ? handleRemoveFriend : handleAddFriend 
                            /* need to add a check for friendstatus==1*/ }
                    >
                            {friendStatus==2 ? "Remove Friend" : friendStatus==0 ? "Add Friend" : "Cancel Friend Request"}
                    </Button>
                </Box>
            </Box>
            {/* Display the DM icon only if they're already friends */}
            {friendStatus==2 ? <Chat/> : <Box/>}
        </Stack>
        </>
    );
}