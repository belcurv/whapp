/* jshint esversion:6, devel:true */
/*
   T3BC1RPPH = chingu central
   T4ZS2DFAA = chingu rhinos
   T5518TKBR = extemporaneous
*/

import { getJSON } from './service';
import { makeFormattedSkillsArr, mapSkillCounts } from './util';

export default class Model {
    
    constructor() {
        
    }
    
    /* fetch user profiles for a given team ID
    */
    getProfiles(team) {
        return getJSON(`/api/team/${team}`)
            .then( (profiles) => {
//                console.log('Profiles from model.js', profiles);
                return profiles;
            });
    }
    
    
    /* fetch team skills*/
    getTeamSkills(team) {
        return getJSON(`/api/team/${team}`)
            .then( (profiles) => {
                let skillsMap = mapSkillCounts(profiles);
                return makeFormattedSkillsArr(skillsMap);
            });
    }
    
}
