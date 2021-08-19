// import { HashRouter, Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import { ResetPassword } from "./resetPassword";
import Logo from "./logo";

export default function Welcome() {
    return (
        <>
            <header>
                <Logo />
                <h1>Welcome!</h1>
            </header>
            <Router>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </Router>
        </>
    );
}
