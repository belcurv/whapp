/* library of helper functions */
/* jshint esversion:6 */

/* register handler to an event emitted by a target */
const $on = (target, event, handler) => {
    return target.addEventListener(event, handler);
};

/* build map of unique skills and counts
 * 
 * @params    [array]   profiles   [array of profile objects]
 * @returns   [object]             [map of unique skills and counts]
*/
const mapSkillCounts = (profiles) => {
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
};


/* build formatted array of skill & count objects
 * 
 * @params    [object]   inputObj   [map of unique skills and counts]
 * @returns   [array]               [array of skill & count objects]
*/
const makeFormattedSkillsArr = (inputObj) => {
    return Object.keys(inputObj).map( key => {
        return {
            skill: key,
            count: inputObj[key]
        };
    });
};


export { $on, mapSkillCounts, makeFormattedSkillsArr };
