import React from "react";
import { select, selectAll } from "d3-selection";

const data = [
    { width: 200, height: 100, fill: "blue" },
    { width: 100, height: 60, fill: "orangered" },
    { width: 50, height: 30, fill: "pink" }
];

/*
    When given more data than svg fields, d3 will put the 
    remaining data into a virtual field called enter
    you can call enter() to access the remaining data
*/

class Enter extends React.Component<{}, {}> {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.renderJoins();
    }

    componentDidUpdate() {
        this.renderJoins();
    }

    renderJoins() {
        const selection = select(this.svgRef.current);
        selection
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("height", d => d.height)
            .attr("width", d => d.width)
            .attr("fill", d => d.fill);
    }

    render() {
        return <svg ref={this.svgRef} />;
    }
}

export default Enter;
