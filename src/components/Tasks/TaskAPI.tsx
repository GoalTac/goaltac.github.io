import { error } from "console";
import { supabase } from "../../supabase";


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

//task-task-relations database structure
//id, created_at, parent_id (uuid), child_id (uuid) 

export async function _getRootTask(taskID: string) {
    let isChild = true;
    let currentTaskID = taskID;

    while (isChild) {
        const relation = await supabase
            .from('task-task-relations')
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
            child.children = await fetchChildren(child.id);
        }
        return children;
    }

    rootTask.children = await fetchChildren(rootTask.id);
    return rootTask;
}

export async function _getChildTasks(taskID: string) {
    const { data, error } = await supabase
        .from('task-task-relations')
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
        .from('task-task-relations')
        .insert([relation]);
    
    if (error) {
        throw new Error(error.message);
    }

    return relation;
}

export async function _addChildTask(parentTaskID: string, childTask: any) {
    const newChild = await _addTask(childTask);
    
    // Check if parentTaskID exists as a root task
    const { data: parentData, error: parentError } = await supabase
        .from('task-task-relations')
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
        .from('task-task-relations')
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
        .from('task-task-relations')
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
    const { error } = await supabase
    .from('tasks')
    .update({start_date: task.start_date,
            end_date: task.end_date, 
            name: task.name, 
            description: task.description, 
            requirement: task.requirement, 
            reward: task.reward, 
            type: task.type})
    .eq('id', taskID);

    if (error) {
        throw new Error(error.message)
    }

}

/**
 * Deletes task after removing all relationships it has
 * @param taskID
 */
export async function _deleteTask(taskID: string) {
    // 
    const { data, error: relationError } = await supabase
        .from('task-task-relations')
        .delete()
        .or(`parent_id.eq.${taskID},child_id.eq.${taskID}`);

    if (relationError) {
        throw new Error(relationError.message);
    }

    //delete the task
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskID);

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
    const reward = task.reward ? task.reward : 1
    const type = task.type ? task.type : 'Boolean'

    const newTask = {
        start_date: start_date,
        end_date: end_date,
        name: name,
        description: description,
        requirement: requirement,
        reward: reward,
        type: type
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

    const defaultTaskLimit = 20
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
export async function _duplicateTask(taskID: string) {

    //get original task data
    const duplicated_task = await _getTaskbyID(taskID);

    //check if task does not exist
    if (!duplicated_task) {
        throw new Error('Task not found');
    }
    
    //duplicate task in supabase
    const { data, error } = await supabase
        .from('tasks')
        .insert([duplicated_task])
        .single()

    if (error) {
        throw new Error(error.message)
    }

}

export async function _shareTasktoUser(taskID: string, userID: string) {
    const { data, error } = await supabase 
        .from('task_user_relations')
        .insert({ task_id: taskID, user_id: userID})
        .single()

    if (error) {
        throw new Error(error.message);
    }

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
 * Adds a task related to a user
 * @param userID 
 * @param taskID 
 */
export async function _addUserTask(userID: string | undefined, taskID: string) {

    if (!userID) {
        throw new Error('No user ID found')
    }
    const newRelation = {
        task_id: taskID,
        user_id: userID
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
    const { error } = await supabase
        .from('task_user_relations')
        .delete()
        .eq('task_id', taskID)
        .eq('user_id', userID);
    
    if (error) {
        throw new Error(error.message);
    }


}

/**
 * Sets a task relationship
 * @param userID 
 * @param taskID 
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
        .upsert({ 
            user_id: userID,
            task_id: taskID,
            progress: updatedProgress 
        });

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
        .upsert({ 
            user_id: userID,
            task_id: taskID,
            progress: progress 
        });

    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Returns whether or not the task is complete by measuring the progress
 * @param userID
 * @param taskID 
 */
export async function _isComplete(userID: string, taskID: string) {

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

    return data;
}

/**
 * Returns post information on only one post given a task and user
 * @param task_uuid 
 * @param user_uuid 
 */
export async function _getPostInfo(task_uuid: string, user_uuid: string) {
    //gets only one row of user relations
    const {data: relation, error: relationError} = await supabase
        .from('task_user_relations')
        .select('*')
        .eq('user_id', user_uuid)
        .eq('task_id', task_uuid)
    
    const {data: task, error: taskError} = await supabase
        .from('tasks')
        .select('*')
        .eq('uuid', task_uuid).single()

    if(relationError) {
        throw new Error(relationError.message)
    }
    if(taskError) {
        throw new Error(taskError.message)
    }
    const getPackagedInfo = (task: any, relation: any) => {
        return {
            progress: relation.progress,
            task_id: relation.task_id,
            user_id: relation.user_id,
            description: task.description,
            end_date: task.end_date,
            name: task.name,
            reoccurence: task.reoccurence,
            reward: task.reward,
            requirement: task.requirement,
            start_date: task.start_date,
            type: task.simple,
            likes: 0, comments: 0
        }
    }
    return getPackagedInfo(task, relation)
}

export async function _getAllPostInfo() {

    const {data: posts, error: postError} = await supabase
        .from('posts')
        .select('*')
    
    if (postError) {
        throw new Error(postError.message)
    }

    const getPackagedInfo = async(post: any) => {
        /* Figure out how to perform the same function, but only having to
        call the database ONCE per batch of posts, instead of iterating
        through each collected post to find it's information

        example:
        post = [1, 2, 3]
        const posts = fetchPostInfo([post])
        console.log(posts)
        '[[allTasks], [allRelations]]'
        getPackagedInfo(posts) -> returns [{info as seen in ine 663},{},{}]

        what we have currently:
        post = [1, 2, 3]
        fetchPostInfo([post]) -> returns post.map((it)=>calls the database for info and packages it)
        THIS IS INEFFICIENT BECAUSE WE CALL THE DATABASE EACH TIME FOR THE LENGTH OF THE LIST

        const {data: relation, error: relationError} = await supabase
            .from('task_user_relations')
            .select('*')
        
        const {data: task, error: taskError} = await supabase
            .from('tasks')
            .select('*')

        if(relationError) {
            throw new Error(relationError.message)
        }
        if(taskError) {
            throw new Error(taskError.message)
        }*/
        return await _getPostInfo(post.task_uuid, post.user_uuid)
    }

    const getAllPackagedInfo = await Promise.all(posts.map(async(it_post) => {
        const info = await getPackagedInfo(it_post)
        return info
    }))
    return getAllPackagedInfo

}