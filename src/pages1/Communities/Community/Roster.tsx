import {
    Box,
    Text,
    Flex,
    Heading,
    Spacer,
    Icon,
    HStack,
    Divider,
    useColorMode
} from '@chakra-ui/react'
import {
    GiArrowhead,
    GiPerson
  
  } from 'react-icons/gi'
import { formatNumber } from '../../../hooks/Utilities/Numbers';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';

//roster has different viewables based on permission level
/**
 * Displays the clan's roster
 * @param {*} param0
 */
export default function Roster(community: any) : ReactElement {

    const members = community.members

    const orderedPeople = numericalOrder({members})

    return (<Box minHeight='100%' paddingTop='20px'>
        {orderedPeople}
    </Box>)
    
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
function checkPermission(user: Object) {
    return 1;
}

/**
 * 
 * @param {*} param0 
 * @returns ordered list of every member
 */
function numericalOrder(people: any) {
    const orderedPeople = people.sort((a: { points: number; }, b: { points: number; }) => (a.points < b.points) ? 1 : -1)
    return orderedPeople.map((personObj: any, index: Key | null | undefined) => (
        <RowItem key={index} 
        number={index}
        member={personObj}/>))
}

/**
 * A row item contains the user's profile, name, personal
 * points, and other contributions made to the clan
 * @param {*} param0 
 * @returns Row display for roster
 */
function RowItem(member: any, number: number) {
    
    const { colorMode } = useColorMode();


    return (
    <Flex height='60px' 
        marginY='5px'
        flexDirection='column'
        borderWidth='1px'
        borderRadius='15px'
        paddingX='1rem'>
        <HStack width='100%' justifyContent='center' marginY='auto'>
            <Heading fontSize='1.5rem' paddingEnd='1rem'>
                {number + 1}.
            </Heading>
            <Divider orientation='vertical' />
            <Text fontSize='1.5rem' paddingStart='0.5rem'>
                {member.userName}
            </Text>
            <Spacer/>
            <Flex borderColor='blue.200' 
                backgroundColor={colorMode == 'dark' ? 'blue.700' : 'blue.100'}
                borderRadius='10px' 
                width='120px'
                padding='4px' 
                columnGap='10px'
                justifyContent='right'
                borderWidth='2px'>
                <Text fontSize='1.25rem'>
                    {formatNumber(member.points)}
                </Text>
                <Icon boxSize='1.5rem' as={GiArrowhead}/>
            </Flex>

        </HStack>
    </Flex>);
}