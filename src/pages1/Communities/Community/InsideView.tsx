import Header from './Information'
import HeaderNav from './HeaderNav'
import Roster from './Roster'
import { useState, useEffect } from 'react';
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'

import {
    Box,
    useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
import { getCommunity } from './../CommunityAPI'
import { uniqueId } from 'lodash';
/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView() {

    const { communityName } = useParams<{ communityName: string }>();
    const [community, setCommunity] = useState<any>();

    useEffect(() => {
        const fetchCommunityData = async() => getCommunity(communityName).then((response) => {
            setCommunity( response );
            })
        fetchCommunityData();
    }, []);

    
    
    /**
     * <Header community={community}/>
        <HeaderNav setView={setView} community={community} />
        
        {view}
        */
    const [view, setView] = useState();
    return(community && 
        <Box className='Specific Community View' bg={useColorModeValue('gray.50', 'gray.700')}
        borderRadius='20px'
        marginX='auto' minWidth='fit-content' maxWidth='60vw' boxShadow='2xl' padding='10px'>
            <Header community={community}/>
            <HeaderNav setView={setView} community={community} />
            <Roster community={community} />
            

            <Box height='10vh'>

            </Box>
        </Box>
        
    );
}