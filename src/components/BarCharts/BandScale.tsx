import React from "react";
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { json } from "d3-fetch";

interface Datum {
    name: string;
    orders: number;
}

class BandScale extends React.Component<{}, {}> {
    svgRef = React.createRef<SVGSVGElement>();
    y = scaleLinear()
        .domain([0, 1000])
        .range([0, 500]);

    componentDidUpdate() {
        this.renderBandScale();
    }

    componentDidMount() {
        this.renderBandScale();
    }

    renderBandScale() {
        const selection = select(this.svgRef.current);

        json<Datum[]>("menu.json").then(data => {
            const rects = selection.selectAll("rect").data(data);

            const x = scaleBand()
                .domain(data.map(d => d.name))
                .range([0, 600])
                .paddingInner(0.2)
                .paddingOuter(0.2);

            // rects
            //     .attr("width", x.bandwidth)
            //     .attr("height", d => this.y(d.orders))
            //     .attr("fill", "orange")
            //     .attr("x", d => x(d.name)!);

            rects
                .enter()
                .append("rect")
                .attr("width", x.bandwidth)
                .attr("height", d => this.y(d.orders))
                .attr("x", d => x(d.name)!)
                .attr("fill", "orange");
        });
    }

    render() {
        return <svg height={900} width={1000} ref={this.svgRef} />;
    }
}

export default BandScale;
