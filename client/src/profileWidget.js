import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// Approach #1 - Using destructuring to pull up the properties inside props
export default function ProfileWidget({ first, last, imageUrl, toggleModal }) {
    // console.log("props - info passed down from parent (App) --> ", props);
    imageUrl = imageUrl || "images/default.png";
    return (
        <div className="profile-widget">
            <img
                onClick={() => toggleModal()}
                className="profile-pic"
                src={imageUrl}
                alt={`${first} ${last}`}
            />
        </div>
    );
}
