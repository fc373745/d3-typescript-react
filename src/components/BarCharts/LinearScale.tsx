import React from "react";
import { select, selectAll } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { json } from "d3-fetch";

interface Datum {
    name: string;
    orders: number;
}

class LinearScale extends React.Component<{}, {}> {
    svgRef = React.createRef<SVGSVGElement>();
    y = scaleLinear()
        .domain([0, 1000])
        .range([0, 500]);

    componentDidUpdate() {
        this.renderLinearScale();
    }

    componentDidMount() {
        this.renderLinearScale();
    }

    renderLinearScale() {
        const selection = select(this.svgRef.current);

        json<Datum[]>("menu.json").then(data => {
            const rects = selection.selectAll("rect").data(data);
            rects
                .enter()
                .append("rect")
                .attr("width", 50)
                .attr("height", d => this.y(d.orders))
                .attr("x", (d, i) => i * 70)
                .attr("fill", "orange");
        });
    }

    render() {
        return <svg height={900} ref={this.svgRef} />;
    }
}

export default LinearScale;
