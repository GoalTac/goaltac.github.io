import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CheckAndTitle from "../components/CheckAndTitle";

export default function ProfileView() {

    // Variables ----------------------------------------------------------------------
    const { profileName } = useParams<{ profileName: string }>();

    // UseEffect ----------------------------------------------------------------------
    // Functions ----------------------------------------------------------------------
    
    return (
        <CheckAndTitle title={'Profile'}>
            <Box mt={'160px'}>
                <h1>{profileName}</h1>
            </Box>
        </CheckAndTitle>
    )
}