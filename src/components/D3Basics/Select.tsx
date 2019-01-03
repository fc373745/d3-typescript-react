import React from "react";
import { select, selectAll } from "d3-selection";

class Select extends React.Component {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.testSelect();
    }

    componentDidUpdate() {
        this.testSelect();
    }

    testSelect() {
        const selection = select(this.svgRef.current);

        // Appending shapes to svg container
        selection
            .append("circle")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("r", 50)
            .attr("fill", "#000000");
    }

    render() {
        return <svg width={600} height={600} ref={this.svgRef} />;
    }
}

export default Select;
