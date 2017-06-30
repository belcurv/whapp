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

const setView = () => {
    app.controller.setView();
};

$on(window, 'load', setView);
