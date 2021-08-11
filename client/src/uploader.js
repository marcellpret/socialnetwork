import { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = { file: null };

        console.log("this.state in Uploader: ", this.state);

        console.log("props in Uploader: ", props);
    }

    componentDidMount() {
        console.log("Uploader mounted!!!");
    }

    handleChange({ target }) {
        // console.log("which input is running handleChange?", target.name);
        // console.log("value the suer typed:", target.value);
        // updating state!
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in Uploader after change:", this.state)
        );
    }

    selectingFile({ target }) {
        console.log("target: ", target.files[0]);

        var formData = new FormData();
        formData.append("file", target.files[0]);
        formData.append("userId", this.props.userId);
        axios
            .post("/uploadAvatar", formData)
            .then(({ data }) => {
                console.log("data: ", data);
                this.props.updateAvatarInApp(data.avatar);
            })
            .catch((err) => console.log("err in /method: ", err));
        // this is where you'll be doing formdata to send your image to the server!!
        // look back at ib for a nice little refresher.
        // once the img has been successfully added to the db and you get the image back here, you'll want to send the image UP TO APP - you can do so by calling the method in App
        // this method in App was passed down to uploader!
        // also make sure that you hide the uploader!
    }

    render() {
        return (
            <div className="uploader">
                <label htmlFor="file">🔽 Update your profile picture</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    onChange={(e) => this.selectingFile(e)}
                />
                <Router>
                    <Link className="logout" to="/logout">
                        ❎ Logout
                    </Link>
                </Router>
            </div>
        );
    }
}
