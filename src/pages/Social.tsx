import { Box, Flex, Heading, Image, Text, IconButton, Spacer, Badge, Avatar, Button, useColorMode, useBreakpointValue, Icon, Drawer, DrawerContent, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerBody, FormControl, FormLabel, Input, Textarea, Checkbox, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaAudioDescription, FaHeart, FaPlusCircle, } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

interface Post {
    id: number;
    imageurl: string;
    title: string;
    date: string;
    userid: string;
    avatarurl: string;
    description: string;
    college: string;
    liked: boolean;
    isAd: boolean;
    isHidden: boolean;
}

export default function Social() {

    // failsafe redirect to login if not authenticated
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            // console.log(data);
            if (error)
                navigate('/login');

            if (data.user)
                setPost({ ...post, userid: data.user.id });
        };
        getUser();
    }, []);

    // changes title of the html tab
    useEffect(() => {
        document.title = 'Social';
    }, []);


    // Variables ----------------------------------------------------------------------

    // create post template
    const [post, setPost] = useState({
        imageurl: '',
        title: '',
        description: '',
        userid: '',
        college: '',
    });

    // Temporary posts until loaded in from database
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 0,
            imageurl: './logo.png',
            avatarurl: './logo.png',
            title: 'Goaltac +',
            userid: '',
            date: '2021-10-01',
            description: "get goaltac plus today!",
            college: 'Offical Goaltac',
            liked: false,
            isAd: true,
            isHidden: true,
        },
    ]);

    // ui niceness
    const { colorMode } = useColorMode();
    const toast = useToast()

    // opens the add post drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // these change the sizes
    const boxSize = useBreakpointValue({ base: '200px', md: '300px', lg: '400px' })
    const widthSize = useBreakpointValue({ base: '300px', md: '500px', lg: '800px' })
    const [isShortScreen, setIsShortScreen] = useState(false);


    const toggleHidden = (postid: number) => {
        setPosts(posts.map((post) => {
            if (post.id === postid) {
                post.isHidden = !post.isHidden;
            }
            return post;
        }));
    };


    // Use Effects --------------------------------------------------------------------

    // update post template with userid and avatarurl
    useEffect(() => {
        async function getAvatarId(userid: string) {
            const { data: avatarData, error: avatarError } = await supabase
                .from('profiles')
                .select('avatarurl')
                .eq('userid', userid);

            // success
            if (avatarData) {
                return avatarData;
            }
        }
        async function fetchPosts() {
            const { data, error } = await supabase.from('posts').select('*');
            if (data) {
                // fetch liked posts
                const { data: likedData, error: likedError } = await supabase
                    .from('posts_liked')
                    .select('postid');

                if (likedError) {
                    console.log(likedError);
                } else {

                    // fetch avatar url posts
                    for (let x = 0; x < data.length; x++) {
                        const avatarData = await getAvatarId(data[x].userid);
                        if (avatarData) {
                            data[x].avatarurl = avatarData[0].avatarurl;
                        }

                        // set hidden to true
                        data[x].isHidden = true;

                        // set liked
                        data[x].liked = likedData?.some((liked) => liked.postid === data[x].id);

                        // set date created
                        data[x].date = data[x].created_at.toString().split('T')[0];
                    }

                    setPosts(data as Post[]);
                    console.log(data)
                }
            }
            if (error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setIsShortScreen(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.nextElementSibling?.classList.toggle('hidden');
    };


    // Functions ----------------------------------------------------------------------

    async function handlePostCreate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        console.log(post)
        const { data, error } = await supabase.from('posts').insert([post]);
        if (error) {
            toast({
                title: 'Try a different title',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setPost({ ...post, title: '' });
        } else {
            toast({
                title: 'Post created',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setPost({
                imageurl: '',
                title: '',
                description: '',
                userid: post.userid,
                college: '',
            });
            setIsDrawerOpen(false);
        }

    }

    const likeElementsRef = useRef<{ [key: number]: HTMLInputElement }>({});

    async function handleLike(id: number): Promise<React.MouseEventHandler<HTMLButtonElement> | undefined> {
        const { data: checkData, error: checkError } = await supabase
            .from('posts_liked')
            .select('id')
            .eq('postid', id)
            .eq('userid', post.userid);

        // doesn't exist so we add it
        if (checkError || checkData.length === 0) {
            console.log('does not exist');
            const { data, error } = await supabase
                .from('posts_liked')
                .insert({ userid: post.userid, postid: id })

            if (error) console.log(error);

            else setPosts(posts.map((post) => post.id === id ? { ...post, liked: true } : post));

        } else {
            // does exist so we delete it
            const { data, error } = await supabase
                .from('posts_liked')
                .delete()
                .eq('userid', post.userid)
                .eq('postid', id);

            if (error) console.log(error);

            else setPosts(posts.map((post) => post.id === id ? { ...post, liked: false } : post));
        }
        return undefined;
    }


    // Render -------------------------------------------------------------------------

    return (
        <Box>
            {/* post template that maps everything */}
            {posts.map((post) => {
                return (
                    <>
                        {isShortScreen ? (
                            // mobile layout
                            <Flex direction="column" position="relative">
                                <Image src={post.imageurl} alt={post.title} boxSize={"100vw"} objectFit="cover" onClick={handleImageClick} />
                                <Box p={4} display={post.isHidden ? 'none' : 'block'} position="absolute" bottom={0} left={0} right={0} bg="rgba(0, 0, 0, 0.5)">
                                    <Heading size="md" color="white" mb={2}>
                                        {post.title}
                                    </Heading>
                                    <Text fontSize="sm" color="gray.200" mb={2}>
                                        {post.date}
                                    </Text>
                                    <Text fontSize="md" color="white">
                                        {post.description}
                                    </Text>
                                    <Badge colorScheme="blue" mt={2}>
                                        {post.college}
                                    </Badge>
                                </Box>
                                <Spacer />

                                <Avatar src={post.avatarurl} size="sm" position="absolute" left={2} top={2} zIndex={1} />

                                {/* like button or ad logo */}
                                {post.isAd ? <Icon as={FaAudioDescription} mr={2} fontSize="xl" position="absolute" right={2} top={2} zIndex={1} />
                                    : <IconButton aria-label="Like" icon={<FaHeart />} position="absolute" right={2} top={2} zIndex={1} border="1px solid white" onClick={() => handleLike(post.id)} bg={post.liked ? 'pink.300' : 'white.300'} />}

                                {/* expand button */}
                                <Button onClick={() => { toggleHidden(post.id); return undefined; }} position="absolute" bottom={2} right={2} zIndex={1} size={"sm"}>
                                    <FiMoreHorizontal />
                                </Button>


                            </Flex>
                        ) : (
                            // website layout
                            <Box key={post.id} bg={colorMode === "light" ? 'gray.50' : 'gray.700'} boxShadow="md" mt={4} maxW={widthSize} mx="auto">
                                <Flex alignItems="center" position="relative">
                                    <Image src={post.imageurl} alt={post.title} boxSize={boxSize} objectFit="cover" mr={4} />
                                    <Box>
                                        <Heading size="md" color={colorMode === 'light' ? 'black' : 'white'} mb={2}>{post.title}</Heading>
                                        <Text fontSize="sm" color="gray.500" mb={2}>{post.date}</Text>
                                        <Text fontSize="md" color={colorMode === 'light' ? 'black' : 'white'}>{post.description}</Text>
                                        <Badge colorScheme="blue" mt={2}>{post.college}</Badge>
                                    </Box>
                                    <Spacer />
                                    <Avatar src={post.avatarurl} size="sm" position="absolute" left={2} top={2} zIndex={1} />
                                    {post.isAd ? <Icon as={FaAudioDescription} mr={2} fontSize="xl" /> :
                                        <IconButton aria-label="Like" icon={<FaHeart />} mr={2} onClick={() => handleLike(post.id)} bg={post.liked ? 'pink.500' : 'transparent'} />}
                                </Flex>
                            </Box>
                        )}
                    </>
                );
            })}

            {/* add post button */}
            <Drawer placement="right" onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create Post</DrawerHeader>
                    <DrawerBody>
                        <DrawerBody p={0.5}>
                            <Image src={post.imageurl} />
                            <FormControl mb={4} mt={2} isRequired>
                                <FormLabel>Image URL</FormLabel>
                                <Input type="text" value={post.imageurl} onChange={(event) => setPost({ ...post, imageurl: event.target.value })} />
                            </FormControl>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} />
                            </FormControl>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea value={post.description} onChange={(event) => setPost({ ...post, description: event.target.value })} />
                            </FormControl>
                            <FormControl mb={4} isRequired>
                                <FormLabel>College</FormLabel>
                                <Input type="text" value={post.college} onChange={(event) => setPost({ ...post, college: event.target.value })} />
                            </FormControl>
                            <Button colorScheme="green" onClick={handlePostCreate}>
                                Create
                            </Button>
                        </DrawerBody>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Add post button */}
            <Box position="fixed" bottom={4} right={4} zIndex={11}>
                <IconButton background={'black'} color={'white'} aria-label="Chat" icon={< FaPlusCircle />} onClick={() => setIsDrawerOpen(true)} />
            </Box>
        </Box>
    );
}



// posts table (will need to userid)
//`````````````````````````````````````````````

// CREATE TABLE posts (
//     id SERIAL PRIMARY KEY,
//     imageurl TEXT NOT NULL,
//     title TEXT NOT NULL,
//     date TEXT NOT NULL,
//     avatarurl TEXT NOT NULL,
//     description TEXT NOT NULL,
//     college TEXT NOT NULL,
//     isAd BOOLEAN NOT NULL
//   );