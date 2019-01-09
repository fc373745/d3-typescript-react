import React from "react";
import firebase from "firebase";
import { select, selectAll, selection } from "d3-selection";
import config from "./CONFIG_FIRESTORE";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";

interface data {
    name?: string;
    orders?: number;
}

interface State {
    data: data[];
    update: boolean;
}

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

class EnterExit extends React.Component<{}, State> {
    svgRef = React.createRef<SVGSVGElement>();

    state: Readonly<State> = {
        data: [],
        update: false
    };

    componentDidMount() {
        this.collectData();
    }

    componentDidUpdate() {
        if (this.state.update) {
            this.setState({ update: false });
            this.renderChart();
        }
    }

    collectData() {
        db.collection("dishes")
            .get()
            .then(res => {
                let data: data[] = [];
                res.docs.forEach(doc => {
                    data.push(doc.data());
                });
                this.setState({ data, update: true }, () =>
                    console.log(this.state.data)
                );
            })
            .catch(err => console.log(err));
    }

    renderChart() {
        const margin = { top: 10, bottom: 100, left: 100, right: 0 };
        const graphHeight = 700 - margin.top - margin.bottom;
        const graphWidth = 1000 - margin.left;

        const y = scaleLinear().range([graphHeight, 0]);

        const x = scaleBand()
            .range([0, graphWidth])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        const selection = select(this.svgRef.current);

        const graph = selection
            .attr("height", graphHeight)
            .attr("width", graphWidth)
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        y.domain([0, max(this.state.data, d => d.orders)!]);
        x.domain(this.state.data.map(d => d.name!));

        const xAxisGroup = graph
            .append("g")
            .attr("transform", `translate(0, ${graphHeight})`);

        const yAxisGroup = graph.append("g");

        const rects = graph.selectAll("rect").data(this.state.data);

        select(this.svgRef.current)
            .selectAll("rect")
            .data(this.state.data)
            .enter()
            .append("rect");

        select(this.svgRef.current)
            .selectAll("rect")
            .data(this.state.data)
            .exit()
            .remove();
        // rects.enter().append("rect");

        select(this.svgRef.current)
            .selectAll("rect")
            .data(this.state.data)
            .attr("height", d => graphHeight - y(d.orders!))
            .attr("x", d => x(d.name!)!)
            .attr("y", d => y(d.orders!))
            .attr("width", x.bandwidth())
            .attr("fill", "orange");

        const xAxis = axisBottom(x);
        const yAxis = axisLeft(y)
            .ticks(7)
            .tickFormat(d => `${d} orders`);

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        xAxisGroup
            .selectAll("text")
            .attr("transform", "rotate(-40)")
            .attr("text-anchor", "end")
            .attr("font-size", ".8rem")
            .attr("fill", "orange");
    }

    onClick = () => {
        this.setState(
            prev => ({
                data: [
                    ...prev.data,
                    {
                        name: "anotha one",
                        orders: Math.floor(Math.random() * (900 - 200) + 200)
                    }
                ],
                update: true
            }),
            () => console.log(this.state.data)
        );
    };

    render() {
        return (
            <div>
                <svg width={1000} height={850}>
                    <g ref={this.svgRef} />
                </svg>
                <button onClick={this.onClick}>Add</button>
            </div>
        );
    }
}

export default EnterExit;

{
    /* <script src="https://www.gstatic.com/firebasejs/5.7.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCgRaSO-CcOjFOTmGX8tkNAqARtTxJo8P0",
    authDomain: "d3-firebase-a03ce.firebaseapp.com",
    databaseURL: "https://d3-firebase-a03ce.firebaseio.com",
    projectId: "d3-firebase-a03ce",
    storageBucket: "d3-firebase-a03ce.appspot.com",
    messagingSenderId: "45771992645"
  };
  firebase.initializeApp(config);
</script> */
}
