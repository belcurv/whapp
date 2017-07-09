/* jshint esversion:6, devel:true */
/*
   T3BC1RPPH = chingu central
   T4ZS2DFAA = chingu rhinos
   T5518TKBR = extemporaneous
   T43U70EMR = hardlyknewhim
   T4Y16R6Q4 = whobot-test
*/

import { getJSON }      from './service';
import { formatSkills } from './util';

export default class Model {
    
    constructor() {
        
    }
    
    
    /* fetch team skills
     *
     * @param    [string]   team   [Slack team ID]
     * @returns  [object]          [team name & skills map]
    */
    getTeamSkills(team) {
        return getJSON(`/api/team/${team}`)
            .then( profiles => {
                return {
                    team   : profiles[0].team_domain,
                    skills : formatSkills(profiles)
                };
            });
    }
    
}
