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

            this.setState(data);
        } catch (error) {
            console.log;
        }

        // axios
        //     .get(`/user/${otherId}`)
        //     .then(({ data }) => {
        //         console.log("data in user: ", data);
        //         this.setState(data);
        //     })
        //     .catch((err) => console.log("err in /user: ", err));
    }

    render() {
        return (
            <div className="others-profile">
                <img
                    className="profile-pic"
                    src={this.state.avatar}
                    alt={`${this.state.first} ${this.state.last}`}
                />
                <div>
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
