import { Box, Flex, Text, IconButton, Drawer, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerContent, DrawerBody, Avatar, AvatarBadge, InputGroup, Input, InputRightElement, Button, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, FormControl, ModalBody, FormLabel, ModalFooter, Toast, useToast, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCircle, FaRegPaperPlane, } from 'react-icons/fa';
import { supabase } from '../../supabase';
import { ChatIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

interface Message {
    text: string;
    sender: 'me' | 'other';
    avatarurl: string;
}

export default function Chat() {

    // Variables ----------------------------------------------------------------------

    const toast = useToast();
    const location = useLocation();

    // opens the social drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // handles messaging
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // sets current chat messages
    const [currentChatMessages, setCurrentChatMessages] = useState('');
    const [myChatId, setMyChatId] = useState('');


    // UseEffect ----------------------------------------------------------------------

    useEffect(() => {
        fetchMyChatId();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [myChatId]);

    // Functions ----------------------------------------------------------------------
    async function fetchMessages() {

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

        const { data: sentMessages, error: sentMessagesError } = await supabase
            .from('messages')
            .select('text, created_at, sender_id')
            .eq('recipient_id', communityId);
        if (sentMessagesError) {
            console.log(sentMessagesError);
        } else {

            // console.log(sentMessages)

            const avatarKey = await getAvatarUrls(sentMessages || []);

            const messages = [...sentMessages].map((message: any) => {
                return {
                    text: message.text,
                    avatarurl: avatarKey[message.sender_id as string] || '',
                    sender: message.sender_id === myChatId ? 'me' : 'other',
                    time: message.created_at,
                };
            });

            // sorts based on time sent
            messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

            setMessages(messages as Message[]);
        }
    }

    async function fetchMyChatId() {
        const { data, error } = await supabase.auth.getUser();
        // not logged in
        if (error) {
            console.log(error);
        } else {
            // check if they got a username
            setMyChatId(data.user.id);
            console.log(data.user.id);
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

    // Efficiently gets all avatar urls for a given array of messages
    async function getAvatarUrls(receivedMessages: any[]) {
        const userIds: Set<string> = new Set(receivedMessages.map((message) => message.sender_id));
        const avatarUrls: { [key: string]: string } = {};

        for (const userId of userIds)
            avatarUrls[userId] = await getSingleAvatarUrl(userId);

        return avatarUrls;
    }

    // Gets the avatar url for a single user
    async function getSingleAvatarUrl(userId: string) {
        const { data: user, error } = await supabase.from('profiles').select('avatarurl').eq('userid', userId).single();
        if (error) {
            console.log(error);
        } else {
            return user.avatarurl;
        }
    }


    const handleChatClick = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
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

        const { error } = await supabase.from('messages').insert([{ text: inputValue, sender_id: myChatId, recipient_id: currentChatMessages }]);
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


    const messages_channel = supabase.channel('custom-insert-channel')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            async (payload) => {
                // console.log(payload);
                if (payload.new.recipient_id === currentChatMessages && payload.new.sender_id !== myChatId) {
                    setMessages([...messages, { text: payload.new.text, sender: 'other', avatarurl: await getSingleAvatarUrl(payload.new.sender_id) }]);
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
                    <DrawerBody>
                        <Box bg={useColorModeValue('gray.100', 'gray.800')} boxShadow="md" p={3} mt={10} borderRadius="md">
                            <Flex direction="column" height="85vh">
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
            <Box position="fixed" bottom={4} right={4}>
                <IconButton aria-label="Chat" icon={<ChatIcon />} onClick={handleChatClick} />
                <Box as={FaCircle} color="red.500" position={'absolute'} right={-1} bottom={-1} size={'.8em'} />
            </Box>
        </>
    )
}