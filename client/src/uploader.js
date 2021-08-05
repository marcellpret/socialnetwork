import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("props in Uploader: ", props);
    }

    componentDidMount() {
        console.log("Uploader mounted!!!");
    }

    methodInUploader() {
        // this is where you'll be doing formdata to send your image to the server!!
        // look back at ib for a nice little refresher.
        // once the img has been successfully added to the db and you get the image back here, you'll want to send the image UP TO APP - you can do so by calling the method in App
        // this method in App was passed down to uploader!
        this.props.methodInApp("whoaaaaaa");
        // also make sure that you hide the uploader!
    }

    render() {
        return (
            <div>
                <h2 className="uploader-text">
                    This is my uploader component!
                </h2>

                <h2 onClick={() => this.methodInUploader()}>
                    Click here to run method in uploader!
                </h2>
            </div>
        );
    }
}
