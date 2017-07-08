/* jshint esversion:6 */

import * as d3 from 'd3';

const chart_thing = (data, targetEl, configMap) => {
    
    // set defaults in case no config object received
    const width  = configMap.width  || 800;
    const height = configMap.height || 400;
    
    d3.select(targetEl).append('svg')
          .attr('width',  width)
          .attr('height', height)
        .selectAll('p')
        .data(data)
        .enter()
        .append('rect')
          .attr('x', (d, i) => width / (data.length - 1) * i)
          .attr('y', (d) => height - d.count)
          .attr('width', width / data.length)
          .attr('height', (d) => d.count)
          .style('fill', 'steelblue');
    
};

export { chart_thing };
