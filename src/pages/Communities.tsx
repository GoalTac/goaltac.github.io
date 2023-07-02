import { Badge, Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import Chat from "../components/Chat";
import CheckAndTitle from "../components/CheckAndTitle";

export default function Communities() {


    // Variables ----------------------------------------------------------------------

    // Temporary community until data is fetched from database
    const [albums, setAlbums] = useState([{
        title: "Official Goaltac",
        old: "5 years",
        description: "Get Announcements, Updates, and more!",
        image: "./logo.png",
        score: 0,
    }]);

    // useEffect ----------------------------------------------------------------------

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data, error } = await supabase.from('communities').select('*');

            if (error) {
                console.log(error);
            } else {
                const mappedAlbums = data.map((album) => ({
                    title: album.name.toUpperCase() || '',
                    old: album.created_at ? album.created_at.toString().split('T')[0] : '',
                    description: album.description || '',
                    image: album.pic || '',
                    score: album.score || 0,
                }));
                setAlbums(mappedAlbums);
                // console.log(mappedAlbums);
            }
        };

        fetchAlbums();
    }, []);

    // Functions ----------------------------------------------------------------------

    return (
        <CheckAndTitle title='Communities'>
            <Flex flexWrap="wrap" justifyContent="left" style={{ marginTop: "55px" }}>
                {albums.map((album) => (
                    <Box
                        key={album.title}
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        ml={3} mt={3}
                        bg={useColorModeValue("gray.300", "gray.700")}
                        as={Link} to={`/community/${album.title}`}
                    >
                        <Image src={album.image} alt={album.title} boxSize="250px" objectFit="cover" bg={"gray.100"} />

                        <Box p="6" maxW={250}>
                            <Text fontWeight="bold" fontSize="lg" mr="2" noOfLines={1}>
                                {album.title}
                            </Text>
                            <Text color="gray.500" fontSize="sm" noOfLines={1}>
                                {album.old}
                            </Text>

                            <Box as="span" color="gray.500" fontSize="sm" noOfLines={2}>
                                {album.description}
                            </Box>


                            <Badge fontSize="xs" bg={"gray.500"} color={"white"}>{album.score ?? 0} points</Badge>
                        </Box>
                    </Box>
                ))}

                <Chat />
            </Flex>
        </CheckAndTitle>
    );
}


// Communities Table:
// ``````````````````````````````````````````````````````

// create table
//   public.communities (
//     created_at timestamp with time zone null default now(),
//     name text not null,
//     pic text null,
//     tags text null,
//     description text null,
//     score double precision null,
//     isPublic boolean null default false,
//     owner uuid not null,
//     members array null,
//     constraint communities_pkey primary key (name),
//     constraint communities_name_key unique (name),
//     constraint communities_name_check check (
//       (
//         (length(name) < 20)
//         and (name ~ '^[a-z0-9 ]+$'::text)
//       )
//     )
//   ) tablespace pg_default;