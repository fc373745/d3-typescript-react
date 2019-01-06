import React from "react";
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { json } from "d3-fetch";
import { max, min, extent } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";

interface Datum {
    name: string;
    orders: number;
}

class Axis extends React.Component<{}, {}> {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        this.renderAxis();
    }

    renderAxis() {
        const margin = { top: 20, right: 20, bottom: 100, left: 100 };
        const graphWidth = 600 - margin.left - margin.right;
        const graphHeight = 600 - margin.top - margin.bottom;

        const selection = select(this.svgRef.current);

        const graph = selection
            .append("g")
            .attr("width", graphWidth)
            .attr("height", graphHeight)
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xAxisGroup = graph
            .append("g")
            .attr("transform", `translate(0, ${graphHeight})`);

        const yAxisGroup = graph.append("g");

        json<Datum[]>("menu.json").then(data => {
            const rects = graph.selectAll("rect").data(data);
            // const mininmum = min(data, d => d.orders);
            // const maximum = max(data, d => d.orders);
            // const minmax = extent(data, d => d.orders);

            const y = scaleLinear()
                .domain([0, max(data, d => d.orders)!])
                .range([graphHeight, 0]);

            const x = scaleBand()
                .domain(data.map(d => d.name))
                .range([0, graphWidth])
                .paddingInner(0.2)
                .paddingOuter(0.2);

            rects
                .enter()
                .append("rect")
                .attr("width", x.bandwidth)
                .attr("height", d => graphHeight - y(d.orders))
                .attr("y", d => y(d.orders))
                .attr("x", d => x(d.name)!)
                .attr("fill", "orange");

            const xAxis = axisBottom(x);
            const yAxis = axisLeft(y);

            xAxisGroup.call(xAxis);
            yAxisGroup.call(yAxis);
        });
    }

    render() {
        return <svg fill="blue" height={900} width={1000} ref={this.svgRef} />;
    }
}

export default Axis;
