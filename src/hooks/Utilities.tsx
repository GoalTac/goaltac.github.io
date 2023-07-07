import { supabase } from './../supabase';


/**
 * LEVELS
 */
export function experienceNeeded(level: number) {
    const scalar = (level+5) ** 4
    return scalar;
}

/**
 * Calculates the level given the amount of
 * experience a user has
 * 
 * @param {*} experience 
 * @returns 
 */
export function calculateLevel(experience: number) {
    let level = 1;
    for (let index = level; 
        experienceNeeded(index) <= experience; 
        index++) {
            experience -= experienceNeeded(index);
            level = index;
    }
    return {level, experience};
}


/**
 * 
 * Calculates the string value of the percent
 * towards leveling up
 * 
 * @param {*} level 
 * @param {*} exp 
 * @returns 
 */
export function experiencePercent(exp: number) {
    const levelObject = calculateLevel(exp)
    const level = levelObject.level
    const leftOverExp = levelObject.experience
    const expNeeded = experienceNeeded(level)
    const expPercent = (leftOverExp/expNeeded)

    if(expPercent > 1) {
        console.log("Clan needs to be leveled up")
    }
    return expPercent*100;
}








/**
 * FORMATTING
 */

export function formatNumber(val: Number | String) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}






/**
 * USER
 */
export async function getUser(uuid: any) {
    const { data: user, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('userid', uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return await user;
}