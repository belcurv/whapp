/* view.js
   handles rendering and DOM events.
   uses the template strings, feeds them data, and adds their output
   to the right DOM elements.
*/
/* jshint esversion:6, browser: true */

import { table_template }  from './template';
import { header_template } from './template';
import { piechart } from './piechart';

export default class View {
    
    constructor() {
        this.target = document.getElementById('target');
    }
    
    render(data) {
        piechart(data.skills);
        this.target.innerHTML = '';
        this.target.innerHTML += header_template(data.team);
        this.target.innerHTML += table_template(data.skills);
    }
    
}
