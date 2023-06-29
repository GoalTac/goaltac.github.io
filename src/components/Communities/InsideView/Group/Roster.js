import {
    Box,
} from '@chakra-ui/react'
//roster has different viewables based on permission level
/**
 * Displays the clan's roster
 * @param {*} param0
 */
export default function Roster({people}) {
    return (
        <Box borderWidth='1px' height='10px'></Box>
    )
    
}

/**
 * Check what permission nodes the user viewing the clan
 * has. This is an integer value with 0 being the lowest.
 * Meaning they are not in the clan and do not have any other
 * permissions
 * 
 * @param {user} Supabase user session
 * @returns permission level
 */
function checkPermission(user) {
    return 1;
}

/**
 * 
 * @param {*} param0 
 * @returns ordered list of every member
 */
function numbericalOrdererRoster({people}) {

    const orderedMembers = people.sort((a, b) => (a.points > b.points) ? 1 : -1)


    return (<Box>
        {people.map((index, member) => (
            <Box key={index}>
                {}
            </Box>
        ))}
    </Box>)
}

/**
 * A row item contains the user's profile, name, personal
 * points, and other contributions made to the clan
 * @param {*} param0 
 * @returns Row display for roster
 */
function rowItem({member}) {
    return (<Box>

    </Box>);
}