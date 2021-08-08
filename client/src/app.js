import { Component } from "react";
import Logo from "./logo";
import ProfileWidget from "./profileWidget";
import Profile from "./profile";
import Uploader from "./uploader";
import axios from "axios";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            userId: null,
            first: "",
            last: "",
            avatar: "",
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateAvatarInApp = this.updateAvatarInApp.bind(this);
        console.log("this.state: ", this.state);
    }

    // this function runs the second the component is rendered!
    componentDidMount() {
        console.log("uploaderIsVisible: ", this.state.uploaderIsVisible);

        console.log("App mounted");

        // here is where we want to make an axios request to 'get' info about the logged in user
        // e.g. first name, last name, imageUrl/profilepic url
        // the axios route '/user' is a good path for it.
        // when we have the info from the server, add it to the state of the component using setState
        axios
            .get("/user")
            .then(({ data }) => {
                console.log("data in user: ", data);
                this.setState({
                    userId: data.id,
                    first: data.first,
                    last: data.last,
                    email: data.email,
                    avatar: data.avatar,
                });
            })
            .catch((err) => console.log("err in /user: ", err));
    }

    toggleModal() {
        // console.log("toggleModal in app is running!!!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    // this fn is responsible for receiving your imageUrl from uploader
    // and then storing it to its state
    updateAvatarInApp(arg) {
        console.log(
            "updateAvatarInApp is running! Argument passed to it is --> ",
            arg
        );
        this.setState({
            avatar: arg,
            uploaderIsVisible: false,
        });
        // make sure you set the imageUrl you received from uploader in state!
    }

    render() {
        return (
            <div>
                <nav>
                    <Logo />

                    <ProfileWidget
                        first={this.state.first}
                        last={this.state.last}
                        email={this.state.email}
                        imageUrl={this.state.avatar}
                        toggleModal={this.toggleModal}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            userId={this.state.userId}
                            updateAvatarInApp={this.updateAvatarInApp}
                        />
                    )}
                </nav>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    email={this.state.email}
                    imageUrl={this.state.avatar}
                    toggleModal={this.toggleModal}
                />
            </div>
        );
    }
}
