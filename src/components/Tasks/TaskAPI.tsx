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

export async function _getRootTask(taskID: string) {

}
export async function _getTaskTree(taskID: string) {

}
export async function _getChildTasks(taskID: string) {

}

export async function _setTaskTree(tree: {}, taskID: string) {

}
export async function _setRootTask(taskID: string, newTask: {}) {

}
export async function _setChildTasks(parentTaskID: string, childTasks: [{}]) {

}

export async function _addChildTask(parentTaskID: string) {

}

/**
 * Removes the root task, and sets it's highest priority child task as a root task
 * @param taskID 
 */
export async function _removeRootTask(taskID: string) {
    //child tasks would be orphans, and we can't have that so
    //we have to remove all the child tasks too
}

/**
 * Removes a selected child task from a parent
 * @param taskID 
 * @param position 
 */
export async function _removeChildTask(parentID: string, childID: string) {

}







/**
 * TASK GENERAL
 */

/**
 * Sets the task details of a task, leaves ID alone
 * @param taskID 
 * @param task 
 */
export async function _setTask(taskID: string, task: {}) {
    
}

/**
 * Deletes task after removing all relationships it has
 * @param taskID
 */
export async function _deleteTask(taskID: string) {
    
}

/**
 * Creates new task row
 * @param task 
 */
export async function _addTask(task: any) {
    const start_date = task.start_date ? task.start_date : null
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
    console.log(newTask)

    const { data: data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select().single();

    if (error) {
        throw new Error(error.message)
    }

    return data;
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

}

export async function _shareTasktoUser(taskID: string) {

}




/**
 * TASK - USER METHODS
 */

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

}

/**
 * Sets a task relationship
 * @param userID 
 * @param taskID 
 */
export async function _setUserTask(userID: string, taskID: string) {

}

/**
 * Returns progress made to a task from a user
 * @param userID 
 * @param taskID 
 */
export async function _getProgress(userID: string, taskID: string) {

}

/**
 * Adds progress to a task
 * @param userID 
 * @param taskID 
 * @param progress 
 */
export async function _addProgress(userID: string, taskID: string, progress: number) {

}

/**
 * Deletes progress from a task
 * @param userID 
 * @param taskID 
 * @param progress 
 */
export async function _deleteProgress(userID: string, taskID: string, progress: number) {

}

/**
 * Sets the progress of a task
 * @param userID 
 * @param taskID 
 * @param progress 
 */
export async function _setProgress(userID: string, taskID: string, progress: number) {

}

/**
 * Returns whether or not the task is complete by measuring the progress
 * @param userID
 * @param taskID 
 */
export async function _isComplete(userID: string, taskID: string) {

}