import { Box, Flex, Text, IconButton, Drawer, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerContent, DrawerBody, Avatar, AvatarBadge, InputGroup, Input, InputRightElement, Button, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, FormControl, ModalBody, FormLabel, ModalFooter, Toast, useToast, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCircle, FaRegPaperPlane, } from 'react-icons/fa';
import { supabase } from '../supabase';
import { ChatIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

interface Message {
    text: string;
    sender: 'me' | 'other';
}

export default function Chat() {

    // Variables ----------------------------------------------------------------------

    const toast = useToast()
    // opens the social drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // handles whether this is a groupchat or not
    const [typeOfChat, setTypeOfChat] = useState(true);
    const location = useLocation();

    // display friends on the top bar
    const [friendIdArr, setFriendIdArr] = useState<string[]>([]); // array of friend ids
    const [friendAvatarArr, setFriendAvatarArr] = useState<string[]>([]); // array of friend ids avatars

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


    // UseEffect ----------------------------------------------------------------------

    useEffect(() => {
        async function fetchMessages() {
            if (location.pathname.includes('/communities')) {
                setTypeOfChat(true);
            } else if (location.pathname.includes('/community')) {
                // we in the CommunityView
                setTypeOfChat(false);

                // console.log(location.pathname.split('/')[2].toLowerCase())

                const { data, error } = await supabase
                    .from('communities')
                    .select('communityid')
                    .eq('name', location.pathname.split('/')[2].toLowerCase().replaceAll('%20', ' '));

                if (error) {
                    console.log(error);
                    return;
                }

                const communityId = data[0]?.communityid || '';

                setCurrentChatMessages(communityId);

                // get my user id
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    console.log('User not found');
                    return;
                }

                const { data: receivedMessages, error: receivedMessagesError } = await supabase
                    .from('messages')
                    .select('text, created_at, sender_id')
                    .eq('recipient_id', communityId)
                    .eq('sender_id', user.id);
                const { data: sentMessages, error: sentMessagesError } = await supabase
                    .from('messages')
                    .select('text, created_at, sender_id')
                    .eq('recipient_id', communityId);
                if (receivedMessagesError || sentMessagesError) {
                    console.log(receivedMessagesError || sentMessagesError);
                } else {

                    const messages = [...receivedMessages, ...sentMessages].map((message: any) => {
                        return {
                            text: message.text,
                            sender: message.sender_id === user.id ? 'me' : 'other',
                            time: message.created_at,
                        };
                    });

                    // sorts based on time sent
                    messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

                    setMessages(messages as Message[]);
                }
            }
        }

        fetchMessages();
    }, []);


    useEffect(() => {
        const getAllFriends = async () => {
            // get my user id
            const { data: { user } } = await supabase.auth.getUser();

            // get all friends
            const { data } = await supabase.from('profiles').select('friends').eq('userid', user?.id);

            if (data && data[0] && data[0].friends) {
                // fills in ids
                setFriendIdArr(data[0].friends);

                // current chat that shows up is the first friend
                if (typeOfChat)
                    handleFriendClick(data[0].friends[0]);

                // gets avatars
                const { data: friendAvatars } = await supabase
                    .from('profiles')
                    .select('avatarurl')
                    .in('userid', data[0].friends);

                // fills in avatars and sets current chat avatar
                setFriendAvatarArr(friendAvatars?.map((avatar: { avatarurl: any; }) => avatar.avatarurl) || []);
                setCurrentChatAvatar(friendAvatars?.[0]?.avatarurl || '');
            } else {
                setFriendIdArr([]);
                setFriendAvatarArr([]);
            }
        };
        getAllFriends();
    }, []);

    // Functions ----------------------------------------------------------------------

    // use this function to change the favicon to the alert icon
    const useAlert = (() => {
        useEffect(() => {
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = 'logoAlert.png';
        }, []);
    })

    // call the useAlert function to set the favicon
    useAlert();


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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log('User not found');
            return;
        }

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
                // add my id to my friends list
                const { error: friendError } = await supabase
                    .from('profiles')
                    .update({
                        friends: [...friendIdArr, data[0].userid],
                    })
                    .eq('userid', user.id);
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
                    console.log(theirRequests);
                    const requestsArray = firstRequest.requests;

                    requestsArray.push(user.id);

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

        // get my user id
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log('User not found');
            return;
        }

        const { error } = await supabase.from('messages').insert([{ text: inputValue, sender_id: user.id, recipient_id: currentChatMessages }]);
        if (error) {
            console.error(error);
            return;
        }


        setMessages([...messages, { text: inputValue, sender: 'me' }]);
        setInputValue('');

        // add cooldown NOT WORKING RN
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 2000);
    };


    const handleFriendClick = async (friendId: string) => {

        setCurrentChatMessages(friendId);

        // get my user id
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log('User not found');
            return;
        }

        const { data: receivedMessages, error: receivedMessagesError } = await supabase
            .from('messages')
            .select('text, created_at, sender_id')
            .eq('recipient_id', friendId)
            .eq('sender_id', user.id);
        const { data: sentMessages, error: sentMessagesError } = await supabase
            .from('messages')
            .select('text, created_at, sender_id')
            .eq('sender_id', friendId)
            .eq('recipient_id', user.id);
        if (receivedMessagesError || sentMessagesError) {
            console.log(receivedMessagesError || sentMessagesError);
        } else {

            const messages = [...receivedMessages, ...sentMessages].map((message: any) => {
                return {
                    text: message.text,
                    sender: message.sender_id === user.id ? 'me' : 'other',
                    time: message.created_at,
                };
            });

            // sorts based on time sent
            messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

            setMessages(messages as Message[]);
        }

    };

    const messages_channel = supabase.channel('custom-insert-channel')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            (payload) => {
                if (payload.new.sender_id === currentChatMessages)
                    setMessages([...messages, { text: payload.new.text, sender: 'other' }]);
            }
        )
        .subscribe()


    return (
        <>
            <Drawer placement="right" onClose={handleDrawerClose} isOpen={isDrawerOpen}>
                <DrawerOverlay />
                {typeOfChat ? (
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Friends</DrawerHeader>
                        <DrawerBody>
                            <Box>
                                {friendIdArr && friendIdArr.slice(0, 4).map((friend: any, index: number) => (
                                    <Avatar
                                        key={index}
                                        src={friendAvatarArr[index]}
                                        size="sm"
                                        m={1}
                                        mb={-10}
                                        onClick={() => handleFriendClick(friendIdArr[index])}
                                    />
                                ))}
                                {friendIdArr && friendIdArr.length > 4 && (
                                    <Button size="sm" m={1}>
                                        ...
                                    </Button>
                                )}

                                <Button size="sm" m={1} float="right" onClick={handleAddFriend}>
                                    +
                                </Button>
                            </Box>


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
                                                    <Avatar size="xs" m={2} ml={0} src={currentChatAvatar} />
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
                    </DrawerContent>)
                    : (
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerBody>
                                <Box bg={useColorModeValue('gray.100', 'gray.800')} boxShadow="md" p={3} mt={10} borderRadius="md">
                                    <Flex direction="column" height="85vh">
                                        <Box flex="1" mb={3} overflowY="scroll">
                                            {messages.map((message, index) => (
                                                <Flex key={index} justifyContent={message.sender === 'me' ? 'flex-end' : 'flex-start'} mb={2}>
                                                    {message.sender === 'other' && (
                                                        <Avatar size="xs" m={2} ml={0} src={currentChatAvatar} />
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
                    )}
            </Drawer>



            {/* chat button */}
            <Box position="fixed" bottom={4} right={4}>
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