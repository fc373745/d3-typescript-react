import React from "react";
import { select } from "d3-selection";

type data = {
    width: number;
    height: number;
    fill: string;
};
interface Props {
    data: data;
}

class DataJoin extends React.Component<Props, {}> {
    svgRef = React.createRef<SVGSVGElement>();

    componentDidMount() {
        this.renderData();
    }

    componentDidUpdate() {
        this.renderData();
    }

    renderData() {
        const selection = select(this.svgRef.current);
        const rectSelection = selection.append("rect");
        rectSelection
            .data([this.props.data])
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .attr("fill", d => d.fill);
    }

    render() {
        return <svg width={600} height={600} ref={this.svgRef} />;
    }
}

export default DataJoin;
