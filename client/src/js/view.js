/* jshint esversion:6, browser: true */

import { table_template }  from './template';
import { header_template } from './template';
import { chart_thing }     from './chart_thing';

export default class View {
    
    constructor() {
        this.target    = document.getElementById('target');
        this.svgTarget = document.getElementById('svg');
    }
    
    render(data) {
        
        // empty the chart container first ...
        this.svgTarget.innerHTML = '';
        
        /* chart_thing builds the D3 graphic
         *
         * @param   [array]   skills      [the skill:count map array]
         * @param   [object]  svgTarget   [target DOM element for D3]
         * @param   [object]  config      [config map]
        */
        chart_thing(data.skills, this.svgTarget, {width: 800, height: 100});
        
        // empty the table before repopulating...
        this.target.innerHTML = '';
        this.target.innerHTML += header_template(data.team);
        this.target.innerHTML += table_template(data.skills);
    }
    
}
