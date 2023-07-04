export const exampleCommunity = {
    name: 'GoalTac',
    desc:'Welcome to the GoalTac community, a group of ambitious individuals who want to become more productive members and join a place to keep people accountable and encourage efforts!',
    owner: ['cf636296-2c08-4a41-94dc-77b5518ba267'],
    members: [
        {
            uuid: 'cf636296-2c08-4a41-94dc-77b5518ba267',
            userName: 'Adi',
            points: 1209,
    
        },
        {
            uuid: 'd0ab045d-568d-409a-91d4-b09bb5805ce6',
            userName: 'My',
            points: 312
        },
        {
            uuid: 'something!',
            userName: 'Nikhil',
            points: 12019
        },
        {
            uuid: 'woo woo',
            userName: 'Andrew',
            points: 19
        },
    ],
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

export const exampleCommunityTwo = {
    name: 'Woo',
    desc:'PEANUT',
    owner: 'cf636296-2c08-4a41-94dc-77b5518ba267',
    members: [
        {
            uuid: 'cf636296-2c08-4a41-94dc-77b5518ba267',
            userName: 'Adi',
            points: 1209,

        },
        {
            uuid: 'd0ab045d-568d-409a-91d4-b09bb5805ce6',
            userName: 'My',
            points: 312
        },
        {
            uuid: 'something!',
            userName: 'Nikhil',
            points: 12019
        },
        {
            uuid: 'woo woo',
            userName: 'Andrew',
            points: 19
        },
    ],
    goals: [12, 142, 124, 29, 93], //id numbers of the goals (which consists of tasks)
    goalsC: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19],
    totalPoints: 11210, //this will be taken out later and we can calculate total points by looping through each member and getting their point value
    stats: {
        type: 0,
        pReq: 1000,
    },
    levelObj: {
        exp: 112190

    }
}



export function getExampleCommunities() {
    return [
        exampleCommunity, exampleCommunityTwo
    ];
  }