/* jshint esversion:6 */

import * as d3 from 'd3';


const chart_thing = (data, targetEl, configMap) => {
    
    // set defaults in case no config object received
    const width  = configMap.width  || 400;
    const height = configMap.height || 400;
    
    d3.select(targetEl)
        .append('svg')
          .attr('width',  width)
          .attr('height', height)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
          .attr('x', (d, i) => width / (data.length - 1) * i)
          .attr('y', (d) => height - d.count)
          .attr('width', width / data.length)
          .attr('height', (d) => d.count)
          .style('fill', 'steelblue');
    
};


const pie_thing = (data, targetEl, configMap) => {
    
    // setup
    const width      = configMap ? configMap.width  : 700,
          height     = configMap ? configMap.height : 360,
          radius     = Math.min(width, height) / 2,
          donutWidth = 80;
    
    // legend setup
    const legendRectSize = 18,
          legendSpacing  = 4;
    
    // limit to top 10 skills only
    const topSkills = data.filter( (d, i) => i < 10);
    
    // define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    
    // select target and add SVG and Group elements
    const svg = d3.select(targetEl)
        .append('svg')
          .attr('width',  width)
          .attr('height', height)
        .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // arc() defines the radius
    const arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    
    // pie() determines the start and end angles of the segments
    const pie = d3.pie()
        .value( (d) => d.count )
        .sort(null);
    
    // build paths
    const path = svg.selectAll('path')
        .data(pie(topSkills))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(d.data.skill));
    
    // define legend title
    svg.append('text')
        .attr('transform', `translate(${radius + legendRectSize}, -120)`)
        .style('font-size', 14)
        .text('Top 10 Skills');
    
    // define legend
    const legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
            let height = legendRectSize + legendSpacing,
                offset = height * color.domain().length / 2,
                // horiz  = -2 * legendRectSize,
                horiz  = radius + legendRectSize,
                vert   = i * height - offset;
            return `translate( ${horiz}, ${vert} )`;
        });
    
    // add them
    legend.append('rect')
        .attr('width',  legendRectSize)
        .attr('height', legendRectSize)
        .style('fill',   color)
        .style('stroke', color);
    
    // add legend text
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text( (d) => d);
    
    // define tooltips
    const tooltip = d3.select(targetEl)
        .append('div')
        .attr('class', 'tooltip');
    
    tooltip.append('div')
        .attr('class', 'label');
    
    tooltip.append('div')
        .attr('class', 'count');
    
    tooltip.append('div')
        .attr('class', 'percent');
    
    
    // event handlers show/hide tooltip on path mouseover
    path.on('mouseover', (d) => {
        const total   = d3.sum(topSkills.map( d => d.count)),
              percent = Math.round(1000 * d.data.count / total) / 10;
        tooltip.select('.label').html(d.data.skill);
        tooltip.select('.count').html('Total: ' + d.data.count);
        tooltip.select('.percent').html(percent + ' %');
        tooltip.style('display', 'block');
    });
    
//    path.on('mousemove', (d) => {
//        tooltip
//            .style('top',  `${d3.event.layerY + 10}px`)
//            .style('left', `${d3.event.layerX + 10}px`);
//    });
    
    path.on('mouseout', (d) => {
        tooltip.style('display', 'none');
    });
    
    
};

export {
    chart_thing,
    pie_thing
};
