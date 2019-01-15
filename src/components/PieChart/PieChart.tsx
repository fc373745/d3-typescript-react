import React from "react";
import firebase from "firebase";
import config from "./CONFIG_SETTINGS";

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

type State = {
    name: string;
    price: string;
    message: string;
};

type addToFirebase = {
    name: string;
    price: number;
};

class PieChart extends React.Component<{}, State> {
    state: State = {
        name: "",
        price: "",
        message: ""
    };
    addItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (this.state.price) {
            const data: addToFirebase = {
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
