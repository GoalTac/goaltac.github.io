export function experienceNeeded(level) {
    const scalar = (level+5) ** 4
    console.log(scalar)
    return scalar;
}

/**
 * Calculates the level given the amount of
 * experience a user has
 * 
 * @param {*} experience 
 * @returns 
 */
export function calculateLevel(experience) {
    let level = 1;
    for (let index = level; 
        experienceNeeded(index) <= experience; 
        index++) {
            experience -= experienceNeeded(index);
            level = index;
    }
    return level;
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
export function experiencePercent(level, exp) {
    const expPercent = (exp/experienceNeeded(level))
    if(expPercent > 1) {
        console.log("Clan needs to be leveled up")
    }
    return expPercent*100;
}