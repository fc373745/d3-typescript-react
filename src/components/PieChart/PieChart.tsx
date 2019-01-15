import React from "react";
import firebase from "firebase";
import config from "./CONFIG_SETTINGS";
import { select, Selection } from "d3-selection";
import { pie, arc, Arc } from "d3-shape";
import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

type Datum = {
    name: string;
    price: number;
};

type State = {
    name: string;
    price: string;
    message: string;
    arcSelection: Selection<SVGSVGElement | null, {}, null, undefined> | null;
    collection: Datum[];
};

class PieChart extends React.Component<{}, State> {
    dimensions = { height: 300, width: 300, radius: 150 };
    arcRef = React.createRef<SVGSVGElement>();
    pieChart = pie<Datum>()
        .sort(null)
        .value((d: Datum) => d.price);
    arcPath = arc()
        .outerRadius(this.dimensions.radius)
        .innerRadius(this.dimensions.radius / 2);
    color = scaleOrdinal(schemeSet3);

    cent = {
        x: this.dimensions.width / 2 + 5,
        y: this.dimensions.height / 2 + 5
    };

    state: Readonly<State> = {
        name: "",
        price: "",
        message: "",
        arcSelection: null,
        collection: []
    };

    componentDidMount() {
        db.collection("expenses")
            .get()
            .then(res => {
                let data: Datum[] = [];
                res.docs.forEach(doc => {
                    data.push(doc.data() as any);
                });
                const selection = select(this.arcRef.current);
                this.setState(
                    { collection: data, arcSelection: selection },
                    () => this.update(this.state.collection)
                );
            });
    }

    componentDidUpdate() {
        db.collection("expenses")
            .get()
            .then(res => {
                let data: Datum[] = [];
                res.docs.forEach(doc => {
                    data.push(doc.data() as any);
                });
                const selection = select(this.arcRef.current);
                this.setState(
                    { collection: data, arcSelection: selection },
                    () => this.update(this.state.collection)
                );
            });
    }
    renderPie = () => {
        const arcSelection = this.state.arcSelection;
        if (arcSelection) {
            arcSelection
                .append("g")
                .attr("transform", `translate(${this.cent.x}, ${this.cent.y})`);
        }

        // spits out new array that has start angles and end angles
        const angles = this.pieChart(this.state.collection);

        const arcPath = arc()
            .outerRadius(this.dimensions.radius)
            .innerRadius(this.dimensions.radius / 2);

        console.log(arcPath(angles[0] as any));
    };

    update = (data: Datum[]) => {
        const arcSelection = this.state.arcSelection;

        this.color.domain(data.map(d => d.name));
        if (arcSelection) {
            const paths = arcSelection
                .append("g")
                .attr("transform", `translate(${this.cent.x}, ${this.cent.y})`)
                .selectAll("path")
                .data(this.pieChart(data));

            paths
                .enter()
                .append("path")
                .attr("class", "arc")
                .attr("d", this.arcPath as any)
                .attr("stroke", "red")
                .attr("stroke-width", 3)
                .attr("fill", d => this.color(d.data.name));
        }
    };
    addItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (this.state.price) {
            const data: Datum = {
                name: this.state.name,
                price: parseInt(this.state.price)
            };
            db.collection("expenses")
                .add(data)
                .then(() =>
                    this.setState({
                        name: "",
                        price: "",
                        message: "sucessfully added!"
                    })
                );
        }
    };
    nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value, message: "" });
    };
    priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numbersRegex = /^[0-9\b]+$/;
        if (numbersRegex.test(e.target.value) || e.target.value === "") {
            this.setState({ price: e.target.value, message: "" });
        } else {
            this.setState({ message: " Price must be an integer" });
        }
    };
    render() {
        return (
            <div>
                <svg
                    ref={this.arcRef}
                    width={this.dimensions.width + 150}
                    height={this.dimensions.height + 150}
                />
                <form>
                    {this.state.message && (
                        <div>
                            {this.state.message} <br />
                        </div>
                    )}
                    Name:
                    <br />
                    <input
                        onChange={this.nameChange}
                        value={this.state.name}
                    />{" "}
                    <br />
                    Price:
                    <br />
                    <input
                        onChange={this.priceChange}
                        value={this.state.price}
                    />{" "}
                    <br />
                    <button type="submit" onClick={this.addItem}>
                        Add Item
                    </button>
                </form>
            </div>
        );
    }
}

export default PieChart;
