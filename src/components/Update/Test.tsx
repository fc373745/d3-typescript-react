import React from "react";
import { select, selection } from "d3-selection";

class Test extends React.Component {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.createChart();
    }

    createChart() {
        const selection = select(this.svgRef.current);
        selection
            .append("rect")
            .attr("height", 300)
            .attr("width", 400)
            .attr("fill", "orange");
    }

    render() {
        return <svg width={1000} height={1000} ref={this.svgRef} />;
    }
}

export default Test;
