import { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export class Login extends Component {
    constructor(props) {
        super(props);
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
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data: ", data);

                if (data.success) {
                    // stuff worked well with registering we want to do sth
                    // that sth is trigger a reload, so that our start.js runs
                    // one more time and asks the server agin whether or not
                    // the user has the correct cookie :)
                    location.replace("/");
                } else {
                    // we should render an error!
                    // we need to update our component's state to conditionally
                    // make an error appear
                    this.setState({
                        error: "Wrong password",
                    });
                }
            })
            .catch(
                (err) => {
                    console.log("something went wrong in POST /login", err);
                    this.setState({
                        error: "No email found",
                    });
                }
                // we need to update our component's state to conditionally
                // make an error appear
            );
    }
    componentDidMount() {
        console.log("Login just mounted");
    }

    render() {
        return (
            <section className="login">
                <form className="registrationForm">
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
                    <button onClick={(e) => this.handleSubmit(e)}>Login</button>
                </form>
                {this.state.error && <h2>{this.state.error}</h2>}
                <Link to="/reset-password">
                    Did you forget your password?,
                    <br /> Click here to reset.
                </Link>{" "}
                <br />
                <Link to="/">Click here to Register!</Link>
            </section>
        );
    }
}
