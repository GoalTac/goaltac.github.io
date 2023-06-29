import Header from './Group/Header'
import HeaderNav from './HeaderNav'
import GoalTac_Logo from '../../../images/GoalTac_Logo.png'

import {
    Box,
} from '@chakra-ui/react'

/**
 * Contains all components of an individual community
 * @param {community} The community object
 */
export default function InsideView({community}) {

    const exampleCommunity = {
        name: 'GoalTac',
        desc:'Welcome to the GoalTac community, a group of ambitious individuals who want to become more productive members and join a place to keep people accountable and encourage efforts!',
        owner: ['cf636296-2c08-4a41-94dc-77b5518ba267'],
        members: ['d0ab045d-568d-409a-91d4-b09bb5805ce6', null],
        goals: [12, 142, 124, 29, 93], //id numbers of the goals (which consists of tasks)
        goalsC: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19],
        totalPoints: 11210, //this will be taken out later and we can calculate total points by looping through each member and getting their point value
        stats: {
            type: 0,
            pReq: 1000,
        },
        levelObj: {
            exp: 11219

        }
    }


    return(
        <Box name='Specific Community View' >
           <Header community={exampleCommunity}/>
           <HeaderNav community={exampleCommunity}/>

           <Box height='10vh'>

         </Box>
        </Box>
        
    );
}