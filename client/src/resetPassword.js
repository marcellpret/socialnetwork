import { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            view: 1,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        // console.log("which input is running handleChange?", target.name);
        // console.log("value the suer typed:", target.value);
        // updating state!
        this.setState({
            [target.name]: target.value,
        });
        console.log("this.state in ResetPassword:", this.state);
    }

    // check the email in the DB and send a verification code
    startResetPassword(e) {
        e.preventDefault(); // prevents button from triggering a refresh
        axios
            .post("/password/reset/start", this.state)
            .then(({ data }) => {
                if (data.success) {
                    console.log("data: ", data);

                    this.setState({
                        view: 2,
                    });
                } else {
                    this.setState({
                        error: "Something went wrong",
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

        console.log("this.state when press button: ", this.state);
    }

    // check the verification code and set a new password
    setNewPassword(e) {
        e.preventDefault(); // prevents button from triggering a refresh

        axios.post("/password/reset/verify", this.state).then(({ data }) => {
            if (data.success) {
                console.log("data in setNewPassword: ", data);

                this.setState({
                    view: 3,
                });
            } else {
                this.setState({
                    error: "Something went wrong",
                });
            }
            console.log("data in setNewPassword: ", data);
        });
    }

    componentDidMount() {
        console.log("Reset just mounted");
    }

    determineViewToRender() {
        // this method determines what the render!
        if (this.state.view === 1) {
            return (
                <section className="login">
                    <form className="registrationForm">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            key={"email"}
                            onChange={this.handleChange}
                            required
                        />
                        <button onClick={(e) => this.startResetPassword(e)}>
                            Send Code
                        </button>
                    </form>
                    {this.state.error && <h2>{this.state.error}</h2>}
                </section>
            );
        } else if (this.state.view === 2) {
            return (
                <section className="login">
                    <form className="registrationForm">
                        <label htmlFor="code">Verification Code</label>
                        <input
                            name="code"
                            id="code"
                            key={"code"}
                            onChange={this.handleChange}
                            required
                        />

                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            key={"password"}
                            onChange={this.handleChange}
                            required
                        />
                        <button onClick={(e) => this.setNewPassword(e)}>
                            Set new Password
                        </button>
                    </form>
                    {this.state.error && <h2>{this.state.error}</h2>}
                </section>
            );
        } else if (this.state.view === 3) {
            // remember to also add a link to login ;)
            return (
                <section className="login">
                    <h2>You can now log in with your new password!</h2>
                    <Link to="/login">Back to Login</Link>
                </section>
            );
        }
    }

    render() {
        return <div>{this.determineViewToRender()}</div>;
    }
}
