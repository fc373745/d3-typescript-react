import React from "react";
import firebase from "firebase";
import { select, selectAll } from "d3-selection";
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

    margin = { top: 10, bottom: 100, left: 100, right: 0 };
    graphHeight = 700 - this.margin.top - this.margin.bottom;
    graphWidth = 1000 - this.margin.left;

    y = scaleLinear().range([this.graphHeight, 0]);

    x = scaleBand()
        .range([0, this.graphWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

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
                this.setState({ data, update: true });
            })
            .catch(err => console.log(err));
    }

    renderChart() {
        const selection = select(this.svgRef.current);

        const graph = selection
            .append("g")
            .attr("height", this.graphHeight)
            .attr("width", this.graphWidth)
            .attr(
                "transform",
                `translate(${this.margin.left}, ${this.margin.top})`
            );

        this.y.domain([0, max(this.state.data, d => d.orders)!]);
        this.x.domain(this.state.data.map(d => d.name!));

        const xAxisGroup = graph
            .append("g")
            .attr("transform", `translate(0, ${this.graphHeight})`);

        const yAxisGroup = graph.append("g");

        const rects = graph.selectAll("rect").data(this.state.data);

        rects
            .enter()
            .append("rect")
            .attr("height", d => this.graphHeight - this.y(d.orders!))
            .attr("x", d => this.x(d.name!)!)
            .attr("y", d => this.y(d.orders!))
            .attr("width", this.x.bandwidth())
            .attr("fill", "orange");

        const xAxis = axisBottom(this.x);
        const yAxis = axisLeft(this.y)
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

    render() {
        return (
            <div>
                <svg width={1000} height={1200} ref={this.svgRef} />
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
