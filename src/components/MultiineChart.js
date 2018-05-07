import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';
import './MultiineChart.css';

const formatTime = d3.timeFormat('%H:%M %p');
function showTooltip(tooltip, data, show) {
  // eslint-disable-next-line no-debugger
  // debugger;
  if (!show) {
    tooltip.style('display', 'none');
    return;
  }
  tooltip
    .transition()
    .duration(500)
    .style('display', 'inline');
  tooltip
    .html(
      `<ul>
      <li>${data.key}</li>
      <li>${formatTime(data.time)}</li>
      <li>${data.temperature}</li>
    </ul>
    `
    )
    .style('left', `${d3.event.pageX}px`)
    .style('top', `${d3.event.pageY}px`);
  console.log(d3.event.pageX, d3.event.pageY);
}

class MultilineChart extends Component {
  static addTooltip() {
    d3
      .select('body')
      .append('div')
      .attr('class', 'multilinechart-tooltip')
      .style('display', 'none');
  }
  constructor(props) {
    super(props);
    this.multilineChart = React.createRef();
    this.drawMultiLineChart = this.drawMultiLineChart.bind(this);
  }

  componentDidMount() {
    this.drawMultiLineChart();
  }

  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate() {
    this.drawMultiLineChart();
  }

  // makerResponsive() {}
  drawMultiLineChart() {
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const xAxisLabel = 'X-Axis Label Here';
    const yAxislabel = 'Y-Axis Label Here';
    // get svg root container
    const { data, height, width } = this.props;
    const contentHeight = height - (margin.top + margin.bottom);
    const contentWidth = width - (margin.left + margin.right);
    const tooltip = d3.select('.multilinechart-tooltip');
    const dataGroup = d3
      .nest()
      .key(d => d.key)
      .entries(data);
    const svg = d3
      .select('.multilinechart-root')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');
    // add tooltip
    MultilineChart.addTooltip();
    // eslint-disable-next-line no-console
    // console.log('chart', this.multilineChart, height, width);
    const chartGroup = d3
      .select('.multilinechart-root')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.right})`);

    const xMinMax = d3.extent(data, d => d.time);
    const yMinMax = d3.extent(data, d => d.temperature);
    // step1 : calculate content height and width
    console.table(data);

    const xScale = d3
      .scaleTime()
      .domain([d3.min(data, d => d.time), d3.max(data, d => d.time)])
      .rangeRound([0, contentWidth])
      .clamp(true);
    const yScale = d3
      .scaleLinear()
      .domain(yMinMax)
      .rangeRound([contentHeight, 0])
      .clamp(true);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(formatTime);
    const yAxis = d3.axisLeft(yScale);
    /* eslint-disable */
    chartGroup
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate( 0, ${contentHeight})`)
      .call(xAxis);

    //text label for x-Axis
    chartGroup
      .append('text')
      .attr('class', 'axis-text axis-text-x')
      .text(xAxisLabel)
      .attr(
        'transform',
        `translate( ${contentWidth / 2 - margin.left}, ${contentHeight + margin.top + 20})`
      );
    /* eslint-enable */
    chartGroup
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)
      .attr('transform', `translate( 0, 0)`);

    // text label for y-Axis
    chartGroup
      .append('text')
      .attr('class', 'axis-text axis-text-y')
      .text(yAxislabel)
      .attr('transform', `rotate(-90)`)
      .attr('x', 0 - contentHeight / 2)
      .attr('y', 0 - margin.left + 15);

    const line = d3
      .line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.temperature));
    // .curve(d3.curveCatmullRom.alpha(0.5));
    chartGroup
      .selectAll('.line')
      .data(dataGroup)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => ['#FF9900', '#3369E8', 'red', 'green', 'yellow'][i])
      .style('stroke-width', 2)
      .style('fill', 'none');

    chartGroup
      .selectAll('.circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('r', 3)
      .attr('cx', d => xScale(d.time))
      .attr('cy', d => yScale(d.temperature))
      .style('fill', (d, i) => {
        console.log('hello ', d.key);
        return ['#FF9900', '#3369E8', 'red', 'green'][i % 5];
      })
      .on('mouseover', d => {
        tooltip.call(showTooltip, d, true);
      })
      .on('mouseout', d => {
        tooltip.call(showTooltip, d, false);
      })
      .style('opacity', 0.5);

    console.log(dataGroup, xMinMax, svg, data, xAxis, line, contentHeight, chartGroup, yAxis);
  }

  render() {
    const { height, width } = this.props;
    return (
      <svg
        ref={this.multilineChart}
        className="multilinechart-root"
        height={height}
        width={width}
      />
    );
  }
}
MultilineChart.propTypes = {
  /* eslint-disable */
  data: PropTypes.array, // eslint-disable-line
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

MultilineChart.defaultProps = {
  data: []
};
export default MultilineChart;
