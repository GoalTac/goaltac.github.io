import { supabase } from "../../supabase";


export async function _getAllTasks() {

}

export async function _getUserTasks() {

}

/**
 * TASK - COMMUNITY RELATIONSHIPS
 */
export async function _getCommunityTasks() {
    //send the root tasks
}




/**
 * TASK - TASK RELATIONSHIPS
 */

export async function _getRootTask() {

}
export async function _getTaskTree() {

}
export async function _getChildTasks() {

}

export async function _setTaskTree() {

}
export async function _setRootTask() {

}
export async function _setChildTasks() {

}

export async function _addChildTask() {

}

//remember we are not deleting the task, we are just severing the relationship
export async function _removeRootTask() {
    //child tasks would be orphans, and we can't have that so
    //we have to remove all the child tasks too
}
export async function _removeChildTask() {

}


export async function _getAllMembers(communityID : string) {
    const { data: data, error } = await supabase
        .from('community_relations')
        .select('*')
        .eq('community_id', communityID);

    if (error) {
        throw new Error(error.message)
    }

    return data;
}