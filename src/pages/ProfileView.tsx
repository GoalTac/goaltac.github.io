import { Avatar, Box, Heading, Stack, Text, Badge, Textarea, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../supabase';

export default function ProfileView() {

    // Variables ----------------------------------------------------------------------
    const { profileName } = useParams<{ profileName: string }>();
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '', streak: 0, points: 0 });

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

    return (
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
            </Box>
        </Stack>
    );
}