import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import { ResetPassword } from "./resetPassword";

export default function Welcome() {
    return (
        <>
            <h1>Welcome!</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </>
    );
}
