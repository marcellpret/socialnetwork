import { Component } from "react";
import axios from "axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditorVisible: false,
            draftBio: "",
        };
        this.textareaToggle = this.textareaToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateBio = this.updateBio.bind(this);
        console.log("props: ", props);
    }

    handleChange({ target }) {
        this.setState({ draftBio: target.value });
    }

    textareaToggle() {
        console.log("this.state: ", this.state);

        this.setState({
            isEditorVisible: !this.state.isEditorVisible,
            draftBio: this.props.bio,
        });
    }

    async updateBio() {
        // Here you will want to make a post request to the server.
        // You will update the value of the bio in the DB with the new one.
        // Once successful, you can call a function passed down from App
        // to update the value in App
        try {
            const { data } = await axios.post("/updateBio", this.state);
            console.log("data: ", data);
            this.props.updateBioInApp(data[0].bio);
            this.textareaToggle();
        } catch (err) {
            console.log;
        }
    }

    render() {
        if (this.props.bio) {
            return (
                <div>
                    {this.state.isEditorVisible ? (
                        <div>
                            <textarea
                                defaultValue={this.props.bio}
                                onChange={this.handleChange}
                            />
                            <button onClick={this.updateBio}>
                                🔄 Update Bio
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>{this.props.bio}</p>
                            <button onClick={this.textareaToggle}>
                                🖊️ Edit Bio
                            </button>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    {this.state.isEditorVisible ? (
                        <div>
                            <textarea onChange={this.handleChange} />
                            <button onClick={this.updateBio}>Save</button>
                        </div>
                    ) : (
                        <button onClick={this.textareaToggle}>
                            ➕ Add Bio
                        </button>
                    )}
                </div>
            );
        }
    }
}
