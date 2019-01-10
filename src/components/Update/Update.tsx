import React from "react";
import { select, selectAll } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { transition } from "d3-transition";
import { easeLinear, easeBounceInOut } from "d3-ease";
import { interpolateNumber } from "d3-interpolate";

interface State {
    data: Datum[];
    count: number;
}

interface Datum {
    name: string;
    orders: number;
}

class Update extends React.Component<{}, State> {
    axisRef = React.createRef<SVGSVGElement>();
    chartRef = React.createRef<SVGSVGElement>();

    margin = { top: 10, left: 100, right: 0, bottom: 100 };
    graphHeight = 700 - this.margin.top - this.margin.bottom;
    graphWidth = 1000 - this.margin.left;

    t = transition()
        .duration(750)
        .ease(easeLinear);

    y = scaleLinear().range([this.graphHeight, 0]);
    x = scaleBand()
        .range([0, this.graphWidth])
        .padding(0.1);

    state = {
        data: initialState,
        count: 0
    };

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        this.y.domain([0, max(this.state.data, d => d.orders)!]);
        this.x.domain(this.state.data.map(d => d.name));

        const selection = select(this.chartRef.current)
            .attr("height", 700)
            .attr("width", this.graphWidth)
            .attr(
                "transform",
                `translate(${this.margin.left}, ${this.margin.top})`
            );

        selection
            .selectAll("rect")
            .data(this.state.data)
            .enter()
            .append("rect");

        selection
            .selectAll("rect")
            .data(this.state.data)
            .exit()
            .remove();
        // rects.enter().append("rect");

        selection
            .selectAll("rect")
            .data(this.state.data)
            .attr("x", d => this.x(d.name)!)
            .attr("height", 0)
            .attr("y", this.graphHeight)
            .attr("width", this.x.bandwidth())
            .attr("fill", "orange")
            // .merge(selection.selectAll("rects"))
            .transition()
            .attrTween("width", this.widthTween)
            .duration(500)
            .ease(easeBounceInOut)
            .attr("y", d => this.y(d.orders))
            .attr("height", d => this.graphHeight - this.y(d.orders));
    }

    addClick = () => {
        this.setState(prevState => {
            return {
                data: [
                    ...prevState.data,
                    {
                        name: `veg${this.state.count}`,
                        orders: Math.floor(Math.random() * (800 - 200) + 200)
                    }
                ],
                count: prevState.count + 1
            };
        });
    };

    deleteClick = () => {
        let data = [...this.state.data];
        if (data.length > 0) {
            data.pop();
        }
        this.setState({ data });
    };

    randomize = () => {
        let initData = [...this.state.data];
        let data = initData.map(d => ({
            name: d.name,
            orders: Math.floor(Math.random() * (800 - 200) + 200)
        }));
        this.setState({ data });
    };

    widthTween = () => {
        let i = interpolateNumber(0, this.x.bandwidth());

        return (t: number) => {
            return i(t) as any;
        };
    };

    render() {
        return (
            <div>
                <button onClick={this.addClick}>Add</button>
                <button onClick={this.deleteClick}>Delete</button>
                <button onClick={this.randomize}>Randomize</button>
                <svg width={1000} height={800}>
                    <g ref={this.axisRef} />
                    <g ref={this.chartRef} />
                </svg>
            </div>
        );
    }
}

export default Update;

const initialState = [
    {
        name: "veg soup",
        orders: 200
    },
    {
        name: "veg curry",
        orders: 600
    },
    {
        name: "veg pasta",
        orders: 300
    },
    {
        name: "veg surprise",
        orders: 900
    }
];
