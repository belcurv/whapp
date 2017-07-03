/* controller.js -- connects our model and view */
/* jshint esversion:6, devel:true */

export default class Controller {
    
    constructor(model, view) {
        this.model = model;
        this.view  = view;
    }
    
    
    render(data) {
        this.view.render(data);
        
    }
    
    
    setView() {
        console.log('controller setView fired');
        this.model.getTeamSkills('T3BC1RPPH')
            .then( data => this.render(data) );
    }
    
}