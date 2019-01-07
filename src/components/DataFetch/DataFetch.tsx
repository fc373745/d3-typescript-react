import React from "react";
import firebase from "firebase";
import { select, selectAll } from "d3-selection";
import config from "./CONFIG_FIRESTORE";

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

class DataFetch extends React.Component<{}, State> {
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
                this.setState({ data, update: true });
            })
            .catch(err => console.log(err));
    }

    renderChart() {
        const selection = select(this.svgRef.current);

        const rects = selection.selectAll("rect").data(this.state.data);

        rects
            .enter()
            .append("rect")
            .attr("height", d => d.orders!)
            .attr("x", (d, i) => i * 70)
            .attr("width", 50)
            .attr("fill", "black");
    }

    render() {
        return (
            <div>
                <svg width={1000} height={1200} ref={this.svgRef} />
            </div>
        );
    }
}

export default DataFetch;

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
