/* library of helper functions */
/* jshint esversion:6 */

/* ============================ private methods ============================ */

/* build map of unique skills and counts
 * 
 * @params    [array]   profiles   [array of profile objects]
 * @returns   [object]             [map of unique skills and counts]
*/
function mapSkillCounts(profiles) {
    let skillCounts = {};
    profiles.forEach( profile => {
        profile.skills.forEach( skill => {
            if (skillCounts[skill]) {
                skillCounts[skill] += 1;
            } else {
                skillCounts[skill] = 1;
            }
        });
    });
    return skillCounts;
}


/* build formatted array of skill & count objects
 * 
 * @params    [object]   inputObj   [map of unique skills and counts]
 * @returns   [array]               [array of skill & count objects]
*/
function makeFormattedSkillsArr(inputObj) {
    return Object.keys(inputObj).map( key => {
        return {
            skill: key,
            count: inputObj[key]
        };
    });
}


/* ============================ puclic methods ============================= */

/* register handler to an event emitted by a target */
const $on = (target, event, handler) => {
    return target.addEventListener(event, handler);
};


/* builds array for {skill, count} objects
 *
 * @params    [array]   profiles   [the JSON array received from server]
 * @returns   [array]              [sorted array of {skill: count} objects]
*/
const formatSkills = (profiles) => {
    const skillsMap    = mapSkillCounts(profiles);
    const formattedArr = makeFormattedSkillsArr(skillsMap);
    return formattedArr.sort( (a, b) => {
        return b.count - a.count;
    });
};


export { $on, formatSkills };
