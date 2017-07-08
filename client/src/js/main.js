/* jshint esversion:6, browser:true */

import Model      from './model';
import { $on }    from './util';
import View       from './view';
import Controller from './controller';

class App {
    
    constructor() {
        const model = new Model();
        const view  = new View();
        
        this.controller = new Controller(model, view);
    }
    
}

const app = new App();

// event handler. Calls controller's 'setView' method with URI hash
const setView = () => {
    app.controller.setView(document.location.hash);
};


// register event listeners
$on(window, 'load', setView);
$on(window, 'hashchange', setView);
