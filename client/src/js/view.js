/* view.js
   handles rendering and DOM events.
   uses the template strings, feeds them data, and adds their output
   to the right DOM elements.
*/
/* jshint esversion:6, browser: true */

import { table_template } from './template';

export default class View {
    
    constructor() {
        this.el = document.getElementById('target');
    }
    
    render(data) {
        console.log('data from view', data);
        this.el.innerHTML = table_template(data);
    }
    
}
