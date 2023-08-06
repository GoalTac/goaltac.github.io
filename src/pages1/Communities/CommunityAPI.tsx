import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, Button, Progress, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
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

export function toastError(message: string) {
    const toast = useToast()

    toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
    })
}

export function toastSuccess(message: string) {
    const toast = useToast()

    toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
    })
}

//returns the community that matches the name
export async function getCommunityByName(name: any)  {

    const { data: communityData, error } = await supabase
        .from('communities')
        .select('*')
        .eq('name', name)
        .single();

    if (error) {
        throw new Error(error.message)
    }

    return communityData;
}

export async function _addCommunity(community : any) {
    const { data: data, error } = await supabase
        .from('communities')
        .insert([communityTemp(community)])
        .select().single();

    if (error) {
        return error
    }
    return data
}

export async function _removeCommunity(community_id : any) {
    const { data: data, error } = await supabase
        .from('communities')
        .delete()
        .eq('community_id', community_id)
        .select().single();

    if (error) {
        throw new Error(error.message)
    }
    return data
}

export async function _getAllMembers(communityID : string) {
    const { data: data, error } = await supabase
        .from('community_relations')
        .select('user_id')
        .eq('community_id', communityID);

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

//returns all members of a specific role
export async function _getMembers(communityID: string, role : string) { 
    const { data: data, error } = await supabase
        .from('community_relations')
        .select('user_id')
        .eq('community_id', communityID)
        .eq('roles', role)
        .single();

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

export async function _addMember(relationship : any) {
    const {data: data, error} = await supabase
        .from('community_relations')
        .insert(
            [relationTemp(relationship)]
        )
        .select();

    if (error) {
        return error
    }

    return data;
}

export function relationTemp(fields : any) {
    return {
        user_id: fields.user_id ? fields.user_id : '',
        community_id: fields.community_id ? fields.community_id : '',
        role: fields.role ? fields.role : 'Member',
        points: fields.points ? fields.points : 0,
        status: fields.status ? fields.status : 1
    }
}

//put as input an object with part of the community's fields and then output the complete community object
export function communityTemp(fields : any) {
    return {
        name: fields.name ? `${fields.name}`.toLowerCase() : '',
        description: fields.description ? fields.description : '',
        pic: fields.pic ? fields.pic : '',
        score: fields.score ? fields.score : 0,
        isPublic: fields.isPublic ? fields.isPublic : true
    }
}


export async function _removeMember(communityID : string, userID : string) {
    const {data: data,error} = await supabase
        .from('community_relations')
        .delete()
        .eq('community_id', communityID)
        .eq('user_id', userID)
        .select().single();

    if (error) {
        throw new Error(error.message)
    };
    
    const members = _getAllMembers(communityID).then((response)=>{
        if (response.length <= 0) {
            _removeCommunity(communityID)
        }
    })

    return data;
}

export async function _setMember(relationship : any) {
    const {data: data, error} = await supabase
        .from('community_relations')
        .upsert(relationTemp(relationship))
        .select();

    if (error) {
        throw new Error(error.message)
    }

    return data;
}



export async function _getJoinedCommunities(userID: any) {
    const { data: data, error } = await supabase
        .from('community_relations')
        .select('community_id')
        .eq('user_id', userID)
        .eq('status', 1);
    if (error) {
        throw new Error(error.message)
    } 

    const communities = await Promise.all(data.map(async(id) => {
        return await getCommunityByID(id.community_id)
    }))
    return communities;
}

export async function _getUnJoinedCommunities(userID : any) {

    //get all community uuids
    const { data: data, error } = await supabase
    .from('communities')
    .select('community_id');

    if (error) {
        throw new Error(error.message)
    } 

    const { data: relationalData } = await supabase
        .from('community_relations')
        .select('community_id')
        .eq('user_id', userID);

    const relationalIDs = relationalData?.map((id)=>{return id.community_id})
    const unJoinedCommunities = data.filter((community)=>{
        return !relationalIDs?.includes(community.community_id)
    })

    const communities = await Promise.all(unJoinedCommunities.map(async(id) => {
        return await getCommunityByID(id.community_id)
    }))

    return communities;
}

export async function getCommunityByID(communityID: any)  {
    const { data: data, error } = await supabase
        .from('communities')
        .select('*')
        .eq('community_id', communityID)
        .single();
    if (error) {
        throw new Error(error.message)
    }

    return data;
}

/**
 * Grab requested communities from a user
 * @param userID uuid
 * @returns all requested communities
 */
export async function _getRequestedCommunities(userID: any)  {
    const { data: data, error } = await supabase
    .from('community_relations')
    .select('community_id')
    .eq('user_id', userID)
    .eq('status', 0);
    if (error) {
        throw new Error(error.message)
    } 

    return data.map((id) => {return getCommunityByID(id)});
}

export async function getUserCommunities(user: any) {

}

export async function getAllCommunityNames() {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select('name');

    if (error) {
        throw new Error(error.message)
    }

    return communityData;
}

export async function _getAllCommunities() {
    const { data: data, error } = await supabase
        .from('communities')
        .select('*');

    if (error) {
        throw new Error(error.message)
    }
    return data;
}

/**

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


export async function joinCommunity(communityID: string, userID: string) {
    
    upsertMember(communityID, {uuid: userID, communityPoints : "0"})
        

}
*/


export interface Member {
    uuid: string,
    communityPoints: Number
}

export function getCommunity({community}: any) {
    try {
        return community as Community
    } catch(error) {
        console.log(error)
        return null
    }
}

export interface Community {
    name: string
    pic: string
    tags: [string]
    description: string
    score: number
    community_id: string //uuid
}