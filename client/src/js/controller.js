/* jshint esversion:6, devel:true */

export default class Controller {
    
    constructor(model, view) {
        this.model = model;
        this.view  = view;
    }
    
    
    render(data) {
        this.view.render(data);
    }
    
        
    // checks that the hash is valid, and triggers getJSON AJAX
    // and then renders using the AJAX response
    setView(hash) {
        
        const validHash = /^#\/T[0-9A-Z]{8}$/.test(hash);
        
        if (validHash) {
            
            let team_ID = hash.match(/^#\/(T[0-9A-Z]{8})$/)[1];
            
            this.model.getTeamSkills(team_ID)
                .then( data => this.render(data) );
            
        }
    }
    
}