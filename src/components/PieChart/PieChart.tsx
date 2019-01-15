import React from "react";
import firebase from "firebase";
import config from "./CONFIG_SETTINGS";
import { select, Selection } from "d3-selection";
import { pie, arc, Arc } from "d3-shape";

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

type State = {
    name: string;
    price: string;
    message: string;
    arcSelection: Selection<SVGSVGElement | null, {}, null, undefined> | null;
};

type Datum = {
    name: string;
    price: number;
};

class PieChart extends React.Component<{}, State> {
    dimensions = { height: 300, width: 300, radius: 150 };
    arcRef = React.createRef<SVGSVGElement>();
    cent = {
        x: this.dimensions.width / 2 + 5,
        y: this.dimensions.height / 2 + 5
    };

    state: State = {
        name: "",
        price: "",
        message: "",
        arcSelection: null
    };

    componentDidMount() {
        const selection = select(this.arcRef.current);
        this.setState({ arcSelection: selection }, () => this.renderPie());
    }
    renderPie = () => {
        const arcSelection = this.state.arcSelection;
        if (arcSelection) {
            arcSelection
                .append("g")
                .attr("transform", `translate(${this.cent.x}, ${this.cent.y})`);
        }

        const pieChart = pie<Datum>()
            .sort(null)
            .value((d: Datum) => d.price);

        // spits out new array that has start angles and end angles
        const angles = pieChart([
            {
                name: "rent",
                price: 800
            },
            {
                name: "phone",
                price: 100
            },
            {
                name: "food",
                price: 300
            }
        ]);

        const arcPath = arc()
            .outerRadius(this.dimensions.radius)
            .innerRadius(this.dimensions.radius / 2);

        console.log(arcPath(angles[0] as any));
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
