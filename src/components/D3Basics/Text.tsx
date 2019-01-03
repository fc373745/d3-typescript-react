import React from "react";
import { select } from "d3-selection";

class Text extends React.Component {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.renderTxt();
    }

    componentDidUpdate() {
        this.renderTxt();
    }

    renderTxt() {
        const selection = select(this.svgRef.current);

        selection
            .append("text")
            .attr("x", 20)
            .attr("y", 40)
            .attr("fill", "grey")
            .text("hello, ninjas")
            .style("font-family", "arial");
    }

    render() {
        return <svg width={600} height={600} ref={this.svgRef} />;
    }
}

export default Text;
