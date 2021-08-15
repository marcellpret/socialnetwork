import BioEditor from "./bioEditor";
import ProfileWidget from "./profileWidget";

export default function Profile({
    first,
    last,
    avatar,
    bio,
    toggleModal,
    updateBioInApp,
}) {
    // console.log("props - info passed down from parent (App) --> ", props);
    return (
        <div className="profile">
            <div>
                <ProfileWidget avatar={avatar} toggleModal={toggleModal} />
            </div>
            <div className="info-profile">
                <h3>
                    Welcome to your profile page: <br />
                </h3>
                <h2>
                    {first} {last}
                </h2>
                <BioEditor bio={bio} updateBioInApp={updateBioInApp} />
            </div>
        </div>
    );
}
