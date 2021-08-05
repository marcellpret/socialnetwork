// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// Approach #1 - Using destructuring to pull up the properties inside props
export default function Presentational({ first, last, imageUrl, age }) {
    // console.log("props - info passed down from parent (App) --> ", props);
    imageUrl = imageUrl || "default.png";
    return (
        <div>
            <h2>
                This is a presentational component! Im in charge of rendering
                something!
            </h2>
            <h3>
                Hi my name is {first} {last} and Im {age} years old!
            </h3>
            <img className="profile-pic" src={imageUrl} alt="Layla Arias" />
        </div>
    );
}
