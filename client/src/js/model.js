/* jshint esversion:6, devel:true */
/*
   T3BC1RPPH = chingu central
   T4ZS2DFAA = chingu rhinos
   T5518TKBR = extemporaneous
*/

import { getJSON } from './service';

export default class Model {
    
    constructor() {
        
    }
    
    /* fetch user profiles for a given team ID
    */
    getProfiles() {
        return getJSON('/api/team/T3BC1RPPH')
            .then( (profiles) => {
                console.log('profiles from model.js', profiles);
                return profiles;
            });
    }

    
}
