import React from "react";
import { select, selectAll } from "d3-selection";
import { json } from "d3-fetch";

interface Datum {
    radius: number;
    distance: number;
    fill: string;
}

class Json extends React.Component<{}, {}> {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.renderJSON();
    }

    componentDidUpdate() {
        this.renderJSON();
    }

    renderJSON() {
        const selection = select(this.svgRef.current);
        json<Datum[]>("planets.json").then(data => {
            const circs = selection.selectAll("circle").data(data);

            circs
                .enter()
                .append("circle")
                .attr("cy", 200)
                .attr("cx", d => d.distance)
                .attr("r", d => d.radius)
                .attr("fill", d => d.fill);
        });
    }

    render() {
        return <svg width={1000} height={600} ref={this.svgRef} />;
    }
}

export default Json;
