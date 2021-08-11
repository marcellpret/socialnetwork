import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/">
            <img className="logo" src="/images/logo.png" alt="logo" />
        </Link>
    );
}
