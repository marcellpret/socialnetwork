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
            <ProfileWidget avatar={avatar} toggleModal={toggleModal} />
            <div className="info-profile">
                <h3>
                    Welcome to your profile page: <br />
                    <h2>
                        {first} {last}
                    </h2>
                </h3>
                <BioEditor bio={bio} updateBioInApp={updateBioInApp} />
            </div>
        </div>
    );
}
