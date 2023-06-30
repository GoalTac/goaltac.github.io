import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function ProfileView() {
    const { profileName } = useParams<{ profileName: string }>();
    console.log(profileName);
    return (
        <Box mt={'160px'}>
            <h1>{profileName}</h1>
        </Box>
    )
}