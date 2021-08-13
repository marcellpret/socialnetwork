import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import axios from "axios";

import { applyMiddleware, createStore } from "redux";
import reducer from "./redux/reducer";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

axios.get("/user/id.json").then(function ({ data }) {
    console.log("data in Start: ", data);

    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        // user registered/is logged in therefore the user
        // should NOT see Welcome -> Registration, BUT instead see our logo
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
});
