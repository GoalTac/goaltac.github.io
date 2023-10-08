import { Box, Flex, Text, IconButton, Drawer, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerContent, DrawerBody, Avatar, AvatarBadge, InputGroup, Input, InputRightElement, Button, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, FormControl, ModalBody, FormLabel, ModalFooter, Toast, useToast, useColorModeValue, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCircle, FaRegPaperPlane, } from 'react-icons/fa';
import { supabase } from '../../supabase';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

interface Message {
    text: string;
    sender: 'me' | 'other';
    avatarurl: string;
}

type PersonType = {
    name: string,
    username: string,
    biography: string,
    avatarurl: string,
    userid: string,
}

export default function Chat() {

    // Variables ----------------------------------------------------------------------

    const toast = useToast();
    const location = useLocation();

    // opens the social drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // display friends on the top bar
    const [friendIdArr, setFriendIdArr] = useState<string[]>([]); // array of friend ids
    const [friends, setFriends] = useState<PersonType[]>([]);

    // handles adding friends
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');

    // handles messaging
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // sets current chat messages
    const [currentChatMessages, setCurrentChatMessages] = useState('');
    const [currentChatAvatar, setCurrentChatAvatar] = useState('');
    const [myChatId, setMyChatId] = useState('');



    // UseEffect ----------------------------------------------------------------------

    useEffect(() => {
        fetchMyChatId();
    }, []);


    // Copied from Settings.tsx 
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

    async function fetchMyChatId() {
        const { data, error } = await supabase.auth.getUser();
        // not logged in
        if (error) {
            console.log(error);
        } else {
            // check if they got a username
            setMyChatId(data.user.id);
        }

    }

    // use this function to change the favicon to the alert icon
    const useAlert = (() => {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = 'logoAlert.png';
    })

    // async function getSingleAvatarUrl(userId: string) {
    //     const { data: user, error } = await supabase.from('profiles').select('avatarurl').eq('userid', userId).single();
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         return user.avatarurl;
    //     }
    // }

    const avatarUrlCache = new Map<string, string>();

    async function getSingleAvatarUrl(userId: string) {
        if (avatarUrlCache.has(userId)) {
            return avatarUrlCache.get(userId);
        }

        const { data: user, error } = await supabase.from('profiles').select('avatarurl').eq('userid', userId).single();

        if (error) {
            console.log(error);
            return null;
        } else {
            const avatarUrl = user.avatarurl;
            avatarUrlCache.set(userId, avatarUrl);
            return avatarUrl;
        }
    }

    async function getAvatarUrls(receivedMessages: any[], sentMessages: any[]) {
        const userIds = new Set([...receivedMessages.map((message) => message.sender_id), ...sentMessages.map((message) => message.sender_id)]);
        const avatarUrls: { [key: string]: string } = {};

        for (const userId of userIds) {
            const avatarUrl = await getSingleAvatarUrl(userId);
            avatarUrls[userId] = avatarUrl;
        }

        return avatarUrls;
    }


    const handleChatClick = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleAddFriend = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };


    const handleAddFriendSubmit = async () => {
        // get my user id

        // find the user id of the username
        const { data, error } = await supabase
            .from('profiles')
            .select('userid')
            .eq('username', username)
        if (error || !data || !data[0]) {
            toast({
                title: "Seems like that username doesn't exist!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            console.log(error);
            return
        } else {
            // check if they are already friends
            if (!friendIdArr.includes(data[0].userid)) {
                if (data[0].userid === myChatId) {
                    toast({
                        title: "You can't add yourself!",
                        position: 'bottom',
                        status: 'error',
                        duration: 5000,
                        isClosable: false,
                    })
                    return
                }

                // add my id to my friends list
                const { error: friendError } = await supabase
                    .from('profiles')
                    .update({
                        friends: [...friendIdArr, data[0].userid],
                    })
                    .eq('userid', myChatId);
                if (friendError) {
                    console.log(friendError);
                } else {
                    setIsModalOpen(false);
                    setUsername('');

                    // get their friend requests
                    const { data: theirRequests, error: getRequestsError } = await supabase
                        .from('friend_requests')
                        .select('requests')
                        .eq('userid', data[0].userid);

                    const [firstRequest] = theirRequests || [];
                    // console.log(theirRequests);
                    const requestsArray = firstRequest.requests;

                    requestsArray.push(myChatId);

                    // add friend to my friend's friend requests
                    const { error: updateRequestsError } = await supabase
                        .from('friend_requests')
                        .update({ requests: requestsArray })
                        .eq('userid', data[0].userid);

                    // let { data, error } = await supabase
                    //     .rpc('append_array', {
                    //         id,
                    //         user.id
                    //     })

                    if (updateRequestsError || getRequestsError) {
                        console.log(updateRequestsError);
                    } else {
                        toast({
                            title: "Friend Request Sent!",
                            position: 'bottom',
                            status: 'success',
                            duration: 5000,
                            isClosable: false,
                        })
                        return
                    }
                }
            } else {
                toast({
                    title: "Already Your friend! Or you already sent a request!",
                    position: 'bottom',
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                })
                return
            }
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // send message
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim() === '') {
            return;
        }

        const { error } = await supabase.from('messages').insert([{ 
            text: inputValue, 
            sender_id: myChatId, 
            recipient_id: currentChatMessages 
        }]);
        console.log("Sender_id & recipient_id variables: ", myChatId, currentChatMessages);
        if (error) {
            console.error(error);
            return;
        }


        setMessages([...messages, { text: inputValue, sender: 'me', avatarurl: '' }]);
        setInputValue('');

        // add cooldown NOT WORKING RN
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 2000);
    };


    const handleFriendClick = async (friendId: string) => {

        setCurrentChatMessages(friendId);

        const { data: receivedMessages, error: receivedMessagesError } = await supabase
            .from('messages')
            .select('text, created_at, sender_id')
            .eq('recipient_id', friendId)
            .eq('sender_id', myChatId);
        const { data: sentMessages, error: sentMessagesError } = await supabase
            .from('messages')
            .select('text, created_at, sender_id')
            .eq('sender_id', friendId)
            .eq('recipient_id', myChatId);
        if (receivedMessagesError || sentMessagesError) {
            console.log(receivedMessagesError || sentMessagesError);

        } else {

            // if (receivedMessages.length === 0 && sentMessages.length === 0) {
            //     console.log("messages length = 0!!!!!")
            //     setMessages([]);
            //     return;
            // }

            const avatarUrls = await getAvatarUrls(receivedMessages, sentMessages);

            const messages = [...receivedMessages, ...sentMessages].map((message: any) => {
                return {
                    text: message.text,
                    sender: message.sender_id === myChatId ? 'me' : 'other',
                    avatarurl: avatarUrls[message.sender_id],
                    time: message.created_at,
                };
            });

            console.log(messages);

            // sorts based on time sent
            messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

            setMessages(messages as unknown as Message[]);
        }

    };

    const messages_channel = supabase.channel('custom-insert-channel')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            (payload) => {
                if (payload.new.sender_id === currentChatMessages && payload.new.sender_id !== myChatId) {
                    setMessages([...messages, { text: payload.new.text, sender: 'other', avatarurl: '' }]);
                    useAlert();
                }
            }
        )
        .subscribe()


    return (
        <>
            <Drawer placement="right" onClose={handleDrawerClose} isOpen={isDrawerOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Friends</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <Button size="sm" m={1} float="right" onClick={handleAddFriend}>
                                +
                            </Button>
                        </Box>
                        <Stack direction={'row'}>
                            {friends.length === 0 && <Text>No friends yet</Text>}
                            {friends.map((friend, i) => (
                                <Box key={i} textAlign='center' p={3} >
                                    <Flex direction="column" alignItems="center" position={'relative'}>
                                        <Avatar 
                                            size={"lg"} 
                                            src={friend.avatarurl} 
                                            onClick={() => handleFriendClick(friend.userid)} 
                                            />
                                    </Flex>
                                    <Text>{friend.username}</Text>
                                </Box>
                            ))}
                        </Stack>



                        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add Friend</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Username</FormLabel>
                                        <Input value={username} onChange={handleUsernameChange} />
                                    </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <Button m={1} onClick={handleModalClose}>Cancel</Button>
                                    <Button m={1} colorScheme="blue" onClick={handleAddFriendSubmit}>
                                        Add
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>


                        <Box bg={useColorModeValue('gray.100', 'gray.800')} boxShadow="md" p={3} mt={10} borderRadius="md">
                            <Flex direction="column" height="70vh">
                                <Box flex="1" mb={3} overflowY="scroll">
                                    {messages.map((message, index) => (
                                        <Flex key={index} justifyContent={message.sender === 'me' ? 'flex-end' : 'flex-start'} mb={2}>
                                            {message.sender === 'other' && (
                                                <Avatar size="xs" m={2} ml={0} src={message.avatarurl} />
                                            )}
                                            <Box maxW="70%" bg={message.sender === 'me' ? 'blue.500' : 'gray.200'} color={message.sender === 'me' ? 'white' : 'black'} px={3} py={1} borderRadius="md">
                                                <Text fontSize="sm">{message.text}</Text>
                                            </Box>
                                        </Flex>
                                    ))}
                                </Box>

                                <form onSubmit={handleFormSubmit}>
                                    <Flex alignItems="center">
                                        <InputGroup>
                                            <Input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type a message" bg={useColorModeValue('gray.50', 'gray.700')} />
                                            <InputRightElement>
                                                <Button type="submit" aria-label="Send" size="xs" fontSize="10px" colorScheme="blue" variant="ghost" bg={useColorModeValue('gray.50', 'gray.700')} mr={2}>
                                                    <FaRegPaperPlane />
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </Flex>
                                </form>
                            </Flex>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>



            {/* chat button */}
            <Box 
            // position="fixed" 
            // bottom={4} 
            // right={4}
            >
                <IconButton aria-label="Chat" icon={<ChatIcon />} onClick={handleChatClick} />
                <Box as={FaCircle} color="red.500" position={'absolute'} right={-1} bottom={-1} size={'.8em'} />
            </Box>
        </>
    )
}


// Friend requests table for the future
// make it so that
// - authenticated users can only see their own friend requests
// - authenticated users can only insert but not update or read other users' friend requests
//`````````````````````````````````````````````````````````````

// create table if not exists public.array_table (
//     id uuid not null primary key default uuid_generate_v4 (),
//     array_element uuid[] not null default array[]::uuid[]
// );

// create or replace function append_array(new_element uuid, id uuid)
// returns void
// as
// $func$
//     update array_table
//     set array_element = array_append(array_element, $1)
//     where id = $2
// $func$
// language sql;

// create or replace function remove_array(new_element uuid, id uuid)
// returns void
// as
// $func$
//     update array_table
//     set array_element = array_remove(array_element, $1)
//     where id = $2
// $func$
// language sql;



// Allows
// let { data, error } = await supabase
//   .rpc('append_array' or 'remove_array', {
//     id,
//     new_element
//   })