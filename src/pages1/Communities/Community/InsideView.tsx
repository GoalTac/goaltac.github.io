import Header from './Information'
import HeaderNav from './HeaderNav'
import Roster from './Roster'
import { useState, useEffect } from 'react';
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'

import {
    Box,
} from '@chakra-ui/react'
import React from 'react'

/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView(community: any) {

    const [view, setView] = useState(<Roster community={community} />);

    return(
        <Box className='Specific Community View' >
            <Header community={community}/>
            <HeaderNav setView={setView} community={community} />
            
            {view}
            

            <Box height='10vh'>

            </Box>
        </Box>
        
    );
}