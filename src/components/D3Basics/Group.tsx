import React from "react";
import { select } from "d3-selection";

class Group extends React.Component {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.renderGroup();
    }

    componentDidUpdate() {
        this.renderGroup();
    }

    renderGroup() {
        const selection = select(this.svgRef.current);
        const group = selection.append("g");

        group
            .append("rect")
            .attr("x", 20)
            .attr("y", 20)
            .attr("width", 40)
            .attr("height", 300)
            .attr("fill", "blue");

        group
            .append("rect")
            .attr("x", 150)
            .attr("y", 20)
            .attr("width", 50)
            .attr("height", 350)
            .attr("fill", "#FFBF9F");

        group.attr("transform", "translate(250,0)");
    }

    render() {
        return <svg width={600} height={600} ref={this.svgRef} />;
    }
}

export default Group;
