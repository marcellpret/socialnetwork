import BioEditor from "./bioEditor";
import ProfileWidget from "./profileWidget";

export default function Profile({
    first,
    last,
    imageUrl,
    bio,
    toggleModal,
    updateBioInApp,
}) {
    // console.log("props - info passed down from parent (App) --> ", props);
    return (
        <div className="profile">
            <ProfileWidget imageUrl={imageUrl} toggleModal={toggleModal} />
            <h3>
                Hey, my name is {first} {last}.
            </h3>
            <BioEditor bio={bio} updateBioInApp={updateBioInApp} />
        </div>
    );
}
