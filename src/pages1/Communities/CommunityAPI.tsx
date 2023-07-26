import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, Button, Progress, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { VerticalTimeline } from 'react-vertical-timeline-component';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FaChartBar, FaCheck, FaSearch, FaShoppingBag, FaStar, FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { supabase } from './../../supabase';
import { SessionProvider, useSession, useSupabaseClient } from './../../hooks/SessionProvider';
import { ChatIcon } from '@chakra-ui/icons';
import { uniqueId } from 'lodash';
import { RandomUUIDOptions } from 'crypto';
import { getUser } from './../../hooks/Utilities';

export function getPicture(community: any) {
    return community.pic ? community.pic : './../GoalTac_TLogo.png'
}

export async function getCommunityByName(name: any)  {

    const { data: communityData, error } = await supabase
        .from('communities')
        .select('*')
        .eq('name', name)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

export function getTotalMembers(community : any) : Number {
    return community.members.length + 1
}

/**
 * Grab joined communities from a user
 * @param userID uuid
 * @returns all joined communities
 */
export async function getJoinedCommunities(userID: any)  {

    const { data: communityData, error } = await supabase
        .from('profiles')
        .select('joinedCommunities')
        .eq('userid', userID).single();

    if (error) {
        console.error(error);
        return;
    }
    if (communityData.joinedCommunities == null) {
        return null
    }

    const communities = await getCommunityByID(communityData.joinedCommunities)
    return communities;
}

export async function getMembers(community : any) {
    if (!community[0].members) return null

    return community.members;
}

export async function getCommunityByID(communityID: any)  {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select()
        .in('communityid', communityID);
    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

/**
 * Grab requested communities from a user
 * @param userID uuid
 * @returns all requested communities
 */
export async function getRequestedCommunities(userID: any)  {

    const { data: communityData, error } = await supabase
        .from('profiles')
        .select('reqCommunities')
        .eq('userid', userID).single();

    if (error) {
        console.error(error);
        return;
    }
    if (communityData.reqCommunities == null) {
        return null
    }

    const communities = await getCommunityByID(communityData.reqCommunities)
    return communities;
}

export async function getUserCommunities(user: any) {

}

export async function getAllCommunityNames() {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select('name');

    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

export async function getAllCommunities() {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select('*');

    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

//for suggested communities
export function getUnJoinedCommunities(userID: String) {
    const allCommunities = getAllCommunities()
    const joinedCommunities = getJoinedCommunities(userID)
     
}

/**
 * 
 * @param community 
 * @param member 
 * @returns 
 */
export async function upsertMember(communityID : string, member: any) {
    
    const { data: data,error } = await supabase
        .from('communities')
        .select('members')
        .eq('communityid', communityID).single()
    const { data: communities } = await supabase
        .from('profiles')
        .select('joinedCommunities')
        .eq('userid', member.uuid).single()

    if (error) {
        console.error(error);
        return;
    }

    let exists = false;
    //check for duplicates
    data.members.filter((dude: any) => {
        if (dude.uuid == member.uuid) {
            //updating the community points
            dude.communityPoints = member.communityPoints
            exists=true;
        }
    })

    // Get the existing members array or initialize it as an empty array if it doesn't exist
    const existingMembers = data ? data.members || [] : [];
    const existingCommunities = communities ? communities.joinedCommunities || [] : [];

    // Append the new member to the existing members array
    const updatedMembers = (exists ? existingMembers : [...existingMembers, member])
    const updatedCommunities =  existingCommunities.includes(communityID) ? existingCommunities : [...existingCommunities, communityID]
    // Update the row with the updated members array
    
    await supabase
      .from('communities')
      .update({ members: updatedMembers })
      .eq('communityid', communityID);
    await supabase
      .from('profiles')
      .update({joinedCommunities: updatedCommunities})
      .eq('userid', member.uuid).single();
}

export async function removeMember(communityID : string, member: any) {
    const { data: data,error } = await supabase
        .from('communities')
        .select('members')
        .eq('communityid', communityID).single()
    const { data: communities } = await supabase
        .from('profiles')
        .select('joinedCommunities')
        .eq('userid', member).single()

    if (error) {
        console.error(error);
        return;
    }
    //check for duplicates
    const updatedMembers = data.members.filter((dude: any) => {
        return dude.uuid != member
    })

    if(updatedMembers.length < 1) {
        const { error } = await supabase
            .from('communities')
            .delete()
            .eq('communityid', communityID)
    }

    const updatedCommunities = communities?.joinedCommunities.filter((community: any) => {
        return community != communityID
    })
    // Update the row with the updated members array
    
    await supabase
      .from('communities')
      .update({ members: updatedMembers })
      .eq('communityid', communityID);
    await supabase
      .from('profiles')
      .update({ joinedCommunities: updatedCommunities })
      .eq('userid', member);
}


export async function leaveCommunity(communityID: string, userID: string) {
    removeMember(communityID, userID)


}

/*
//check first to make sure user isn't in the community
    const { data: profileData } = await supabase
        .from('profiles')
        .select('joinedCommunities')
        .eq('userid', userID).single();

    const isJoined = profileData?.joinedCommunities.includes(communityID)
 */

export async function joinCommunity(communityID: string, userID: string) {
    
    upsertMember(communityID, {uuid: userID, communityPoints : "0"})
    /**await supabase
        .from('profiles')
        .upsert([ communityID ])
        .eq('userid', userID)
        .select()*/
        

}


export interface Member {
    uuid: string,
    communityPoints: Number
}

export interface Community {
    name: string
    pic: string
    tags: [string]
    description: string
    score: number
    owner: string //uuid
    members: [Member]
    tasks: [string] //replace with call to the task interface
    communityID: string //uuid
}