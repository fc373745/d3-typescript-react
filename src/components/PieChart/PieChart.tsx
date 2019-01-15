import React from "react";
import firebase from "firebase";
import config from "./CONFIG_SETTINGS";

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

type State = {
    name: string;
    price: string | null;
};

class PieChart extends React.Component<{}, State> {
    state: State = {
        name: "",
        price: null
    };
    addItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (this.state.price) {
            db.collection("expenses")
                .add({
                    name: this.state.name,
                    price: parseInt(this.state.price)
                })
                .then(() => console.log("successfully written"));
        }
    };
    nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    };
    priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ price: e.target.value });
    };
    render() {
        return (
            <div>
                <form>
                    Name:
                    <input onChange={this.nameChange} /> <br />
                    Price:
                    <input onChange={this.priceChange} /> <br />
                    <button type="submit" onClick={this.addItem}>
                        Add Item
                    </button>
                </form>
            </div>
        );
    }
}

export default PieChart;
