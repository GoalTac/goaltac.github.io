/**
 * A category is a component which contains an object of task IDs, a description,
 * a title, and a UUID to identify it
 *  
 */
export default class CategoryObject {
    #title = ''
    #description = ''
    #tasks = []
    #uuid = ''
    constructor(category) {
        try {
            this.#tasks = category.tasks;
            this.#title = category.title;
            this.#description = category.description;
            this.#uuid = category.uuid;
        } catch(e) {
            console.log("Category has invalid properties")
        }

    }

    get title() { return this.#title; }
    get description() { return this.#description; }
    /**
     * Returns a list of task IDs
     */
    get tasks() { return this.#tasks; }
    get uuid() { return this.#uuid; }

    set title(x) { this.#title = x; }
    set description(x) { this.#description = x; }
    set tasks(x) { this.#tasks = x; }
    set uuid(x) { this.#uuid = x; }

    removeTask(id) {

        const newTask = this.#tasks.filter(i => i !== id) //new list with removed task
        this.#tasks = newTask

        return newTask
    }

    addTask(id) {

        const newTask = this.#tasks
        this.#tasks = newTask.concat(id)

        return newTask
    }


}