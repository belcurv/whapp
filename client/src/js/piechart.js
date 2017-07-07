/* jshint esversion:6 */

/* https://bl.ocks.org/mbostock/3887235 */

import * as d3 from 'd3';

var svg    = d3.select('svg'),
    width  = +svg.attr('width'),
    height = +svg.attr('height'),
    radius = Math.min(width, height) / 2,
    g      = svg.append('g')
                .attr('transform', `translate(${width/2}, ${height/2})`);

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);



const piechart = (data) => {
    return JSON.stringify(data, null, 2);
};


export { piechart };