import React from "react";
import { select, selectAll } from "d3-selection";

const data = [
    { width: 200, height: 100, fill: "purple" },
    { width: 100, height: 60, fill: "pink" },
    { width: 50, height: 30, fill: "red" }
];

class MultipleJoins extends React.Component<{}, {}> {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.renderJoins();
    }

    componentDidUpdate() {
        this.renderJoins();
    }

    renderJoins() {
        const selection = select(this.svgRef.current);

        const r: IterableIterator<number> = Array(3).keys();
        const b = [...r];

        b.map(() => selection.append("rect"));

        selectAll("rect")
            .data(data)
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .attr("fill", d => d.fill);
    }

    render() {
        return <svg ref={this.svgRef} />;
    }
}

export default MultipleJoins;
