import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";
import axios from "axios";

axios.get("/user/id.json").then(function ({ data }) {
    console.log("data: ", data);

    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        // user registered/is logged in therefore the user
        // should NOT see Welcome -> Registration, BUT instead see our logo
        ReactDOM.render(<Logo />, document.querySelector("main"));
    }
});
