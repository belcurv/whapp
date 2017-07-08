/* jshint esversion:6, browser: true */

import { table_template } from './template';
import { title_template } from './template';
import { chart_thing }    from './chart_thing';
import { pie_thing }      from './chart_thing';

export default class View {
    
    constructor() {
        this.title = document.getElementById('title');
        this.chart = document.getElementById('chart');
        this.table = document.getElementById('table');
    }
    
    render(data) {
        
        // clear chart before rerender
        this.chart.innerHTML = '';
        
        // render page title
        this.title.innerHTML = title_template(data.team);
        
        /* chart_thing builds the D3 graphic
         *
         * @param   [array]   skills      [the skill:count map array]
         * @param   [object]  svgTarget   [target DOM element for D3]
         * @param   [object]  config      [config map]
        */
        //chart_thing(data.skills, this.svgTarget, {width: 800, height: 100});
        pie_thing(data.skills, this.chart, {width: 700, height: 360});
        
        // empty the table before repopulating...
        this.table.innerHTML = table_template(data.skills);
    }
    
}
