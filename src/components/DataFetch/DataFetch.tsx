import React from "react";
import firebase from "firebase";

interface data {
    name?: string;
    orders?: number;
}

interface State {
    data: data[];
}

const config = {
    apiKey: "AIzaSyCgRaSO-CcOjFOTmGX8tkNAqARtTxJo8P0",
    authDomain: "d3-firebase-a03ce.firebaseapp.com",
    databaseURL: "https://d3-firebase-a03ce.firebaseio.com",
    projectId: "d3-firebase-a03ce",
    storageBucket: "d3-firebase-a03ce.appspot.com",
    messagingSenderId: "45771992645"
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

class DataFetch extends React.Component<{}, State> {
    state: Readonly<State> = {
        data: []
    };

    componentDidMount() {
        this.renderChart();
    }

    renderChart() {
        db.collection("dishes")
            .get()
            .then(res => {
                let data: data[] = [];
                res.docs.forEach(doc => {
                    data.push(doc.data());
                });
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.data &&
                        this.state.data.map(dat => {
                            return <li key={dat.name}>{dat.name}</li>;
                        })}
                </ul>
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
