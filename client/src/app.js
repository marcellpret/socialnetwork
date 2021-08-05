import { Component } from "react";
import Logo from "./logo";
import Presentational from "./presentational";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "Layla",
            last: "Arias",
            age: 11,
            imageUrl: "",
            uploaderIsVisible: false,
        };
    }

    // this function runs the second the component is rendered!
    componentDidMount() {
        console.log("App mounted");
        // here is where we want to make an axios request to 'get' info about the logged in user
        // e.g. first name, last name, imageUrl/profilepic url
        // the axios route '/user' is a good path for it.
        // when we have the info from the server, add it to the state of the component using setState
    }

    toggleModal() {
        // console.log("toggleModal in app is running!!!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    // this fn is responsible for receiving your imageUrl from uploader
    // and then storing it to its state
    methodInApp(arg) {
        console.log(
            "methodInApp is running! Argument passed to it is --> ",
            arg
        );
        // make sure you set the imageUrl you received from uploader in state!
    }

    render() {
        return (
            <div>
                <Logo />
                <h1>Hello from App!</h1>

                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    age={this.state.age}
                    imageUrl={this.state.imageUrl}
                />

                <h2 onClick={() => this.toggleModal()}>
                    Click here to toggle uploader visibility
                </h2>

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
