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
    //send the root tasks
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
export async function _addTask(task: {}) {
    
}

/**
 * Creates new row with the same details as the taskID
 * @param taskID 
 */
export async function _duplicateTask(taskID: string) {

}





/**
 * TASK - USER METHODS
 */

/**
 * Get all tasks directly connected to the user
 * @param userID 
 */
export async function _getUserTasks(userID: string) {

}

/**
 * Adds a task related to a user
 * @param userID 
 * @param taskID 
 */
export async function _addUserTask(userID: string, taskID: string) {

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