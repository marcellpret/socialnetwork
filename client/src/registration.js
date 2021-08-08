import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        // console.log("which input is running handleChange?", target.name);
        // console.log("value the suer typed:", target.value);
        // updating state!
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in Registration:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault(); // prevents button from triggering a refresh
        console.log("user clicked register");
        // when the btn gets clicked we want to make an axios request sending
        // over our value of state
        console.log("this.state in Register", this.state);
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                console.log("data: ", data);

                if (data.success) {
                    // stuff worked well with registering we want to do sth
                    // that sth is trigger a reload, so that our start.js runs
                    // one more time and asks the server agin whether or not
                    // the user has the correct cookie :)

                    location.reload();
                } else {
                    // we should render an error!
                    // we need to update our component's state to conditionally
                    // make an error appear
                    this.setState({
                        error: "Please fill up all the inputs!",
                    });
                }
            })
            .catch(
                (err) => {
                    console.log("something went wrong in POST /register", err);
                    this.setState({
                        error: "Please fill up all the inputs!",
                    });
                }
                // we need to update our component's state to conditionally
                // make an error appear
            );
    }
    componentDidMount() {
        console.log("Register just mounted");
    }

    render() {
        return (
            <section>
                <form className="registrationForm">
                    <label htmlFor="first">First Name</label>
                    <input
                        name="first"
                        id="first"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="last">Last Name</label>
                    <input
                        name="last"
                        id="last"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.handleChange}
                        required
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Register
                    </button>
                </form>
                {this.state.error && <h2>{this.state.error}</h2>}
                <Link to="/login">Click here to Log in!</Link>
            </section>
        );
    }
}
