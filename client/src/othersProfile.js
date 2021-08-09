import { Component } from "react";
import axios from "axios";

export default class OthersProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("props: ", props);
    }

    async componentDidMount() {
        console.log("othersProfile mounted");
        let otherId = this.props.match.params.id;
        console.log("this.props.match.params.id: ", otherId);
        // here is where we want to make an axios request to 'get' info about the logged in user
        // e.g. first name, last name, imageUrl/profilepic url
        // the axios route '/user' is a good path for it.
        // when we have the info from the server, add it to the state of the component using setState

        try {
            const { data } = await axios.get(`/api/user/${otherId}`);

            if (data) {
                this.setState(data);
            } else {
                this.props.history.push("/");
            }
        } catch (error) {
            console.log;
        }
    }

    render() {
        return (
            <div className="others-profile">
                <img
                    className="profile-pic"
                    src={this.state.avatar}
                    alt={`${this.state.first} ${this.state.last}`}
                />
                <div className="info-profile">
                    <h3>
                        {this.state.first} {this.state.last}
                    </h3>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
