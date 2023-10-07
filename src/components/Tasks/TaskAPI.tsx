import { error } from "console";
import { supabase } from "../../supabase";

export type Task = {
    uuid?: string;
    created_at?: Date;
    name: string;
    start_date: Date;
    end_date: Date;
    description: string;
    requirement: number;
    difficulty: number;
    type: string;
    reoccurence: number;
};

export type Post = {
    id: number;
    created_at: Date;
    task_uuid: string;
    user_uuid: string;
    views: number;
    likes: number;
    post_uuid: string;
};

export type Relation = {
    id: number;
    created_at: Date;
    task_id: string;
    user_id: string;
    progress: number;
};

export type Profile = {
    id: number;
    created_at: Date;
    name: string;
    biography: string;
    userid: string;
    username: string;
    avatarurl: string;
    points: number;
    streak: number;
};

export async function _getAllTasks() {
    const { data: data, error } = await supabase
        .from('tasks')
        .select('*')

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

/**
 * TASK - COMMUNITY RELATIONSHIPS
 */

/**
 * Get all tasks directly connected to the community
 * @param communityID 
 */
export async function _getCommunityTasks(communityID: string) {
    
}

//user sends suggested task to community
export async function _shareTasktoCommunity(taskID: string) {
    
}

//community accepts suggested task from users
export async function _acceptTaskfromCommunity(taskID: string) {
    //duplicated task and sets owner to community
}
export async function _rejectTaskfromCommunity(taskID: string) {
    
}

export async function _getSuggestedTasks(taskID: string) {
    
}
export async function _addSuggestedTask(tasks: [{}]) {
    
}
export async function _removeSuggestedTask(taskID: string) {
    
}






/**
 * TASK - TASK METHODS
 */

//task_task_relations database structure
//id, created_at, parent_id (uuid), child_id (uuid) 

export async function _getRootTask(taskID: string) {
    let isChild = true;
    let currentTaskID = taskID;

    while (isChild) {
        const relation = await supabase
            .from('task_task_relations')
            .select('parent_id')
            .eq('child_id', currentTaskID)
            .single();

        if (relation.data && relation.data.parent_id) {
            currentTaskID = relation.data.parent_id;
        } else {
            isChild = false;
        }
    }

    return await _getTaskbyID(currentTaskID);
}


export async function _getTaskTree(taskID: string) {
//return array of all the tasks
    // Start with the root task
    const rootTask = await _getRootTask(taskID);

    // Recursively fetch child tasks
    async function fetchChildren(parentID: string) {
        const children = await _getChildTasks(parentID);
        for (const child of children) {
            child.children = await fetchChildren(child.uuid);
        }
        return children;
    }

    rootTask.children = await fetchChildren(rootTask.id);
    return rootTask;
}

export async function _getChildTasks(taskID: string) {
    const { data, error } = await supabase
        .from('task_task_relations')
        .select('child_id')
        .eq('parent_id', taskID);

    if (error) {
        throw new Error(error.message);
    }

    if (!data) return [];

    const tasks = await Promise.all(data.map(async (relation) => {
        return await _getTaskbyID(relation.child_id);
    }));

    return tasks;
}




export async function _createRootTask(taskID: string) {
    const relation = {
        parent_id: taskID,
        child_id: null
    };
    
    const { error } = await supabase
        .from('task_task_relations')
        .insert([relation]);
    
    if (error) {
        throw new Error(error.message);
    }

}

export async function _addChildTask(parentTaskID: string, childTask: any) {
    const newChild = await _addTask(childTask);
    
    // Check if parentTaskID exists as a root task
    const { data: parentData, error: parentError } = await supabase
        .from('task_task_relations')
        .select('id')
        .eq('parent_id', parentTaskID)
        .eq('child_id', null)
        .single();
    
    if (parentError) {
        throw new Error(parentError.message);
    }

    // If parentTaskID doesn't exist as a root task, create it
    if (!parentData) {
        await _createRootTask(parentTaskID);
    }

    const relation = {
        parent_id: parentTaskID,
        child_id: newChild.id
    };
    
    const { error: relationError } = await supabase
        .from('task_task_relations')
        .insert([relation]);
    
    if (relationError) {
        throw new Error(relationError.message);
    }

    return relation;
}


/**
 * Removes the root task, and sets it's highest priority child task as a root task
 * @param taskID 
 */
export async function _removeRootTask(taskID: string) {
    const taskTree = await _getTaskTree(taskID);
    
    // Flatten the task tree for deletion
    function flattenTasks(task: any) {
        let flat = [task];
        for (const child of task.children) {
            flat = flat.concat(flattenTasks(child));
        }
        return flat;
    }

    const flatTasks = flattenTasks(taskTree);

    for (const task of flatTasks) {
        await _deleteTask(task.id);
    }
}

/**
 * Removes a selected child task from a parent
 * @param taskID 
 * @param position 
 */
export async function _removeChildTask(parentID: string, childID: string) {
    // Removing the relation
    const { error: relError } = await supabase
        .from('task_task_relations')
        .delete()
        .eq('parent_id', parentID)
        .eq('child_id', childID);

    if (relError) {
        throw new Error(relError.message);
    }

    // Removing the child task and its descendants
    await _removeRootTask(childID);
}







/**
 * TASK GENERAL
 */

/**
 * Sets the task details of a task, leaves ID alone
 * @param taskID 
 * @param task 
 */
export async function _setTask(taskID: string, task: any) {
    const { data:data, error } = await supabase
    .from('tasks')
    .update([task])
    .eq('uuid', taskID).select().single();

    if (error) {
        throw new Error(error.message)
    }

    return data as Task
    
}

/**
 * Deletes task after removing all relationships it has
 * @param taskID
 */
export async function _deleteTask(taskID: string) {
    // 
    const { data, error: relationError } = await supabase
        .from('task_task_relations')
        .delete()
        .or(`parent_id.eq.${taskID},child_id.eq.${taskID}`);

    if (relationError) {
        throw new Error(relationError.message);
    }

    //delete the task
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('uuid', taskID);

    if (error) {
        throw new Error(error.message);
    }
}


/**
 * Creates new task row
 * @param task 
 */
export async function _addTask(task: any) {
    const start_date = task.start_date ? task.start_date : new Date()
    const end_date = task.end_date ? task.end_date : null
    const name = task.name ? task.name : ''
    const description = task.description ? task.description : ''
    const requirement = task.requirement ? task.requirement : 1
    const reoccurence = task.reoccurence ? task.reoccurence : 1
    const isCollaborative = task.isCollaborative ? task.isCollaborative : false
    const difficulty = task.difficulty ? task.difficulty : 1
    const type = task.type ? task.type : 'Boolean'

    const newTask = {
        start_date: start_date,
        end_date: end_date,
        name: name,
        description: description,
        requirement: requirement,
        difficulty: difficulty,
        type: type, reoccurence: reoccurence, isCollaborative: isCollaborative
    }
    //console.log(newTask)

    const { data: data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select().single();

    if (error) {
        throw new Error(error.message)
    }

    return data; 
}

/**
 * returns object of the user's task limit, how many they have left to make, and 
 * @param userID
 * @returns returns object
 */
export async function _getTaskLimit(userID: string) {
    const { data, count } = await supabase //returns number of tasks that the user has completed
        .from('task_user_relations')
        .select('*', { count: 'exact', head: true }).eq('user_id', userID)
    /**
     * retrieves the user's role from the database, and determines their task limit
     */

    const defaultTaskLimit = 15
    const tasksLeft = defaultTaskLimit - (count ? count : 0)
    return { 
        limit: defaultTaskLimit,
        available: tasksLeft,
        data: data
    }

}

export async function _getTaskbyID(taskID: string) {
    const { data: data, error } = await supabase
        .from('tasks')
        .select()
        .eq('uuid', taskID).single();

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

/**
 * Creates new row with the same details as the taskID
 * @param taskID 
 */
export async function _duplicateTask(task_uuid: string) {

    //get original task data
    let duplicated_task: Task = await _getTaskbyID(task_uuid) as Task;
    delete duplicated_task.uuid
    delete duplicated_task.created_at


    //check if task does not exist
    if (!duplicated_task) {
        throw new Error('Task not found');
    }
    
    //duplicate task in supabase
    const { data, error } = await supabase
        .from('tasks')
        .insert([duplicated_task]).select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data

}

//This is used on the home page to add a task another user has into the person's own dashboard
export async function _importTaskFromUser(task_uuid: string, user_uuid: string) {

    const duplicatedTask: Task = await _duplicateTask(task_uuid) as Task
    if (!duplicatedTask) {
        return new Error('Task creation error')
    }
    const new_task_uuid = duplicatedTask.uuid
    if (new_task_uuid == undefined) {
        return new Error('Task ID not found')
    }
    const addedRelation = await _addUserTask(user_uuid, new_task_uuid)
    addPoints(user_uuid, 1)

    if (addedRelation.message) {
        return addedRelation
    }
    return null
}




/**
 * TASK - USER METHODS
 */
export async function _getUserRelations(userID: string) {

    const { data: data, error } = await supabase
        .from('task_user_relations')
        .select('*')
        .eq('user_id', userID)

    if (error) {
        throw new Error(error.message)
    }

    return data;
}


/**
 * Get all tasks directly connected to the user
 * @param userID 
 */
export async function _getUserTasks(userID: string) {

    const { data: data, error } = await supabase
        .from('task_user_relations')
        .select('task_id')
        .eq('user_id', userID)

    if (error) {
        throw new Error(error.message)
    }

    const tasks = await Promise.all(data.map(async(id) => {
        return await _getTaskbyID(id.task_id)
    }))

    return tasks;
}


/**
 * This is to package the user relations and task info
 * @param userID 
 */
export async function _getUserTasksInfo(user_uuid: string) {

    const packagedData = [];

    // get all relations in batch with one api call
    const {data: relations, error: relationError} = await supabase
        .from('task_user_relations')
        .select('*')
        .eq('user_id', user_uuid).order('created_at', { ascending: false });

    
    if(relationError) {
        throw new Error(relationError.message)
    }

    const task_uuids = relations.map(relation => relation.task_id);

    // get all tasks in batch with one api call
    const {data: tasks, error: taskError} = await supabase
        .from('tasks')
        .select('*')
        .in('uuid', task_uuids);

            
    // get all relations in batch with one api call
    const {data: posts, error: postsError} = await supabase
        .from('posts')
        .select('*')
        .eq('user_uuid', user_uuid);

        // get all relations in batch with one api call
    const {data: profile, error: profileError} = await supabase
        .from('profiles')
        .select('*')
        .eq('userid', user_uuid).single();

    if(taskError) {
        throw new Error(taskError.message)
    }
    if(postsError) {
        throw new Error(postsError.message)
    }
    if(profileError) {
        throw new Error(profileError.message)
    }
    //how can we package multiple userIDs to show all collaborators?
    //may need to have another database call here to grab collaborators
    const getPackagedInfo = async(task: any, relation: any, post: any, profile: any) => {

        //each has the potential to be an array if there are multiple people working on this task
        let totalProgress = 0
        let collaborators: any = []

        if (task.isCollaborative) {
            const { data: collaborator_relations, error: error } = await supabase
                .from('task_user_relations')
                .select('*')
                .eq('task_id', task.uuid)
            
            if(error) {
                throw new Error(error.message)
            }
            
            //fetching the profiles of all collaborators
            const collaborator_uuids = collaborator_relations.map(relation => relation.user_id);
            const {data: collaborator_profiles, error: collaborator_profilesError} = await supabase
                .from('profiles')
                .select('*')
                .in('userid', collaborator_uuids);
            
            if(collaborator_profilesError) {
                throw new Error(collaborator_profilesError.message)
            }
            const getCollaboratorObject = (profile: any, relation: any) => {
                totalProgress += relation.progress
                return {
                    displayName: profile.name, avatarURL: profile.avatarurl,
                    userName: profile.username, progress: relation.progress, user_id: relation.user_id
                }
            }

            for (const relation of collaborator_relations) {
                //collaborator is the relation
                const profile = collaborator_profiles.find(it => it.userid === relation.user_id);
                const packagedCollaboratorInfo = await getCollaboratorObject(profile, relation)
                collaborators.push(packagedCollaboratorInfo)
            }
        }

        return {
            progress: relation.progress, isOwner: relation.isOwner, all_progress: totalProgress, 
            task_id: relation.task_id, isCollaborative: task.isCollaborative,
            user_id: relation.user_id, collaborators: collaborators,
            description: task.description,
            end_date: task.end_date,
            name: task.name,
            reoccurence: task.reoccurence,
            difficulty: task.difficulty,
            requirement: task.requirement,
            start_date: task.start_date,
            type: task.type, hasPosted: (post ? true : false),
            avatarURL: profile.avatarurl,
            userName: profile.username, displayName: profile.name
        }
    }

    for (const relation of relations) {
        const task = tasks.find(task => task.uuid === relation.task_id);
        const post = posts.find(post => post.user_uuid == relation.user_id && post.task_uuid == relation.task_id)

        if (task) {
            const packagedInfo = await getPackagedInfo(task, relation, post, profile);
            packagedData.push(packagedInfo);
        }
    }
    return packagedData
}

/**
 * Adds a task related to a user
 * @param userID 
 * @param taskID 
 */
export async function _addUserTask(userID: string, taskID: string, isOwner: boolean = true) {

    if (!userID) {
        return new Error('No user detected')
    }
    const taskCount = await _getTaskLimit(userID)
    if (taskCount.available <= 0) {
        return new Error('You can not add any more tasks')
    }

    const { data: checkExisting, error: errorExisting, count } = await supabase
        .from('task_user_relations')
        .select('*', { count: 'exact', head: true }).match({task_id: taskID, user_id: userID });
    if (errorExisting) {
        return new Error(errorExisting.message)
    }
    let existingCount = count ? count : 0
    if (existingCount > 0) {
        return new Error('You can not collaborate more than once on this task.')
    }

    const newRelation = {
        task_id: taskID,
        user_id: userID,
        isOwner: isOwner
    }
    const { data: data, error } = await supabase
        .from('task_user_relations')
        .insert([newRelation])
        .select().single();

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

/**
 * Deletes a task relationship
 * @param userID 
 * @param taskID 
 */
export async function _deleteUserTask(userID: string, taskID: string) {
    
    
    //to delete the task if there is only one person who has a relation to it
    const userRelations = await _userTaskRowCount(taskID)
    let count = userRelations ? userRelations : 0
    if (count <= 1) {
        const deletedTask = await _deleteTask(taskID)
    }
    const { error: error } = await supabase
        .from('task_user_relations')
        .delete()
        .eq('task_id', taskID)
        .eq('user_id', userID);
    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Returns how many relationships the task has
 * @param task_uuid 
 */
export async function _userTaskRowCount(task_uuid: string) {
    const { data, count } = await supabase //returns number of tasks that the user has completed
        .from('task_user_relations')
        .select('*', { count: 'exact', head: true }).eq('task_id', task_uuid)
    return count
}

/**
 * Sets a task relationship
 * @param userID 
 * @param taskID n
 */

export async function _setUserTask(userID: string, taskID: string) {
    const relationData = {
        task_id: taskID,
        user_id: userID
    };

    // check if a relation already exists
    const { data } = await supabase
        .from('task_user_relations')
        .select('*')
        .eq('task_id', taskID)
        .eq('user_id', userID)
        .single();

    if (data) {
        return data;

    } else {
        // if no relation create new one
        const { data: newData, error } = await supabase
            .from('task_user_relations')
            .insert([relationData])
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return newData;
    }
}

/**
 * Returns progress made to a task from a user
 * @param userID 
 * @param taskID 
 */
export async function _getProgress(userID: string, taskID: string) {
    const { data, error } = await supabase
        .from('task_user_relations')
        .select('progress')
        .eq('task_id', taskID)
        .eq('user_id', userID)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    // Return the progress value 
    return data;
}

/**
 * Adds progress to a task
 * @param userID 
 * @param taskID 
 * @param progress 
 */
export async function _addProgress(userID: string, taskID: string, progress: number) {
    // get the current progress
    const currentProgressObj = await _getProgress(userID, taskID);
    const currentProgressValue = currentProgressObj ? currentProgressObj.progress : 0;

    // calculate the updated progress
    const updatedProgress = currentProgressValue + progress;

    const { error } = await supabase
        .from('task_user_relations')
        .update({ progress: updatedProgress })
        .match({ user_id: userID, task_id: taskID })

    if (error) {
        throw new Error(error.message);
    }

}

/**
 * Deletes progress from a task
 * @param userID 
 * @param taskID 
 * @param progress 
 */
export async function _deleteProgress(userID: string, taskID: string) {
    const { error } = await supabase
        .from('task_user_relations')
        .update({ progress: 0 })
        .eq('task_id', taskID)
        .eq('user_id', userID);

    if (error) {
        throw new Error(error.message);
    }
}
/**
 * Sets the progress of a task
 * @param userID 
 * @param taskID 
 * @param progress 
 */
export async function _setProgress(userID: string, taskID: string, progress: number) {
    const { error } = await supabase
        .from('task_user_relations')
        .update({ progress: progress })
        .match({ 'user_id': userID, 'task_id': taskID })

    if (error) {
        throw new Error(error.message);
    }
}


/**
 * For collaborators. Only READS. Does not update other people's progress
 * @param task_uuid 
 */
export async function _getTotalProgress(task_uuid: string) {
    //iterate through all user relations that have the same task id
    //put progress, profile info, etc into an object and store that in an array
    //return that 
    const { data: data, error } = await supabase
        .from('task_user_relations')
        .select('progress')
        .eq('task_id', task_uuid)
    if (error) {
        throw new Error(error.message);
    }
    let sum : number = 0
    data.forEach((it_data) => {
        try {
            sum += it_data.progress
        } catch(issue) {
            throw new Error('Unable to add progress to sum')
        }
        
    })
    return sum
}

/**
 * Returns whether or not the task is complete by measuring the progress
 * @param userID
 * @param taskID 
 */
export async function _isComplete(userID: string, taskID: string) {

}

export const increment = async(id: any, user_id: any) => {
    const { data: increment, error: incrementError } = await supabase.rpc('increment', { query_post_uuid: id })
    addPoints(user_id)
}
export const addPoints = async(user_id: any, amount?: number) => {
    const { data: addPoints, error: addPointsError } = await supabase.rpc('addprofilepoints', { query_user_uuid: user_id, amount: amount ? amount : 1 })
}

export const decrement = async(id: any, user_id: any) => {
    const { data: decrement, error: decrementError } = await supabase.rpc('decrement', { query_post_uuid: id })
    removePoints(user_id)
}
export const removePoints = async(user_id: any, amount?: number) => {
    const { data: removePoints, error: removePointsError } = await supabase.rpc('removeprofilepoints', { query_user_uuid: user_id, amount: amount ? amount : 1 })
}

/**
 * Searches and packages for post information before posting
 * @param taskID 
 * @param userID 
 */
export async function _addPost(taskID: string, userID: string) {
    const newTask = {
        task_uuid: taskID,
        user_uuid: userID
    }
    //console.log(newTask)

    const { data: data, error } = await supabase
        .from('posts')
        .insert([newTask])
        .select().single();

    if (error) {
        throw new Error(error.message)
    }

    return data as Post;
}

/**
 * Returns post information on only one post given a task and user
 * @param task_uuid 
 * @param user_uuid 
 */
export async function _getPostInfo(posts: any[], user_uuid: string){

    const batch = posts
    const packagedData = [];

    const taskUUIDs = batch.map(post => post.task_uuid);
    const userUUIDs = batch.map(post => post.user_uuid);

    // get all relations in batch with one api call
    const {data: relations, error: relationError} = await supabase
        .from('task_user_relations')
        .select('*')
        .in('user_id', userUUIDs)
        .in('task_id', taskUUIDs);

    // get all tasks in batch with one api call
    const {data: tasks, error: taskError} = await supabase
        .from('tasks')
        .select('*')
        .in('uuid', taskUUIDs);

    const {data: profiles, error: profileError} = await supabase
        .from('profiles')
        .select('*')
        .in('userid', userUUIDs);
    
    //find all posts that the user has liked
    const {data: postsLiked, error: postsLikedError} = await supabase
        .from('posts_liked')
        .select('*')
        .eq('user_uuid', user_uuid);
    if(relationError) {
        throw new Error(relationError.message)
    }
    if(taskError) {
        throw new Error(taskError.message)
    }

    if(profileError) {
        throw new Error(profileError.message)
    }
    if(postsLikedError) {
        throw new Error(postsLikedError.message)
    }

    const getPackagedInfo = async(task: any, relation: any, profile: any, post: any, post_liked: any) => {
        const liked = post_liked ? true : false
        let totalProgress = 0
        let collaborators: any = []

        if (task.isCollaborative) {
            const { data: collaborator_relations, error: error } = await supabase
                .from('task_user_relations')
                .select('*')
                .eq('task_id', task.uuid)
            
            if(error) {
                throw new Error(error.message)
            }
            
            //fetching the profiles of all collaborators
            const collaborator_uuids = collaborator_relations.map(relation => relation.user_id);
            const {data: collaborator_profiles, error: collaborator_profilesError} = await supabase
                .from('profiles')
                .select('*')
                .in('userid', collaborator_uuids);
            
            if(collaborator_profilesError) {
                throw new Error(collaborator_profilesError.message)
            }
            const getCollaboratorObject = (profile: any, relation: any) => {
                totalProgress += relation.progress
                return {
                    displayName: profile.name, avatarURL: profile.avatarurl,
                    userName: profile.username, progress: relation.progress, user_id: relation.user_id
                }
            }

            for (const relation of collaborator_relations) {
                //collaborator is the relation
                const profile = collaborator_profiles.find(it => it.userid === relation.user_id);
                const packagedCollaboratorInfo = await getCollaboratorObject(profile, relation)
                collaborators.push(packagedCollaboratorInfo)
            }
        }
       
            
            
        const packaged = {
            created_at: post.created_at, all_progress: totalProgress, 
            progress: relation.progress, collaborators: collaborators, 
            task_id: relation.task_id,
            user_id: relation.user_id,
            description: task.description,
            end_date: task.end_date,
            name: task.name,
            reoccurence: task.reoccurence,
            difficulty: task.difficulty,
            requirement: task.requirement,
            start_date: task.start_date,
            type: task.type,
            likes: post.likes, liked: liked, 
            comments: 0, isCollaborative: task.isCollaborative,
            post_id: post.post_uuid, 
            avatarURL: profile.avatarurl,
            userName: profile.username, displayName: profile.name
        }
        return packaged
    }
    for (const relation of relations) {
        if (!relation.isOwner) {
            continue
        }

        const task = tasks.find(task => task.uuid === relation.task_id);
        const profile = profiles.find(profile => profile.userid == relation.user_id)
        const post = posts.find(post => post.user_uuid == relation.user_id && post.task_uuid == relation.task_id)
        const post_liked = postsLiked.find(liked => liked.post_uuid == post.post_uuid)
        
        if (task && profile && post) {
            const packagedInfo = await getPackagedInfo(task, relation, profile, post, post_liked);
            packagedData.push(packagedInfo);
        }
    }
    return packagedData
}

export async function _getAllPostInfo(offset: number, user_uuid: string) {

    const {data: posts, error: postError} = await supabase
        .from('posts')
        .select('*')
        .range(offset, offset + 9)
    
    if (postError) {
        throw new Error(postError.message)
    }
    const packagedInfo = await _getPostInfo(posts, user_uuid);
    return packagedInfo;
}

/**
 * Gets packaged info of all information about collaborators
 * @param task_uuid 
 */
export async function _getCollaboratorInfo(task_uuid: string) {
    //iterate through all user relations that have the same task id
    //put progress, profile info, etc into an object and store that in an array
    //return that 

}