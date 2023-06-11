import { 
    Box, Flex, useColorMode, Input, FormLabel, FormControl, VStack, Menu, FormHelperText
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

import { useSession } from '../../../hooks/SessionProvider';
import { json } from 'react-router';

/**
 * Creating a new community requires the following:
 * - The button which is either locked or unlocked depending on status of the user (level-locked? Coin-locked?)
 * - The modal which the user will fill out if eligible
 * 
 * A user will press the button and fill out a form. Then the community will be created
 */





/**
 * After filling out the modal's form, the contents should then be passed into 
 * insertCommunity in order to finally create the community for the userf
 * @param {*} a community object
 */
function insertCommunity(community = {}) {

}

/**
 * Compile all elements of a community to create the object to be inserted
 * When creating a community you will never have members initialized
 * This value is set when members join the community afterwards
 * 
 * @param {*} param0 
 */
export function communityObject({
    name = "", 
    image = null, 
    hashTags = [], 
    description = "", 
    score = 0, 
    isPublic = false, 
    uuid, members = null}) {
        const [community, setCommunity] = useState({
            name: name,
            pic: image,
            tags: hashTags,
            description: description,
            score: score,
            isPublic: isPublic,
            owner: uuid,
            members: members
        });

        return community;
    }



export default function createModal() {
    const { user, session, supabase } = useSession();
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen);

    /**
     * Create a community by filling out fields
     * 
     * @returns The UI of the form
     */
    function form() {
        const [name, setName] = useState();
        const [img, setImg] = useState();
        const [tags, setTags] = useState([]);
        const [desc, setDesc] = useState();
        const [isPublic, setIsPublic] = useState();

        const [community, setCommunity] = useState({
            name: name,
            pic: img,
            tags: tags,
            description: desc,
            score: 0,
            isPublic: isPublic,
            owner: user?.id,
            members: []
        });

        return(<VStack>
            
        </VStack>);
    }

    /**
     * 
     * @returns The UI components to the create button
     */
    function button(toggle) {
        return(<Button onClick={toggle}>
            Yo yo! Testing
        </Button>);
    } 

    return(<Menu name="Create Community Modal">


    </Menu>);


}