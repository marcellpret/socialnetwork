import { useState, useEffect } from "react";
import axios from "axios";

export default function FriendButton({ otherUserId }) {
    console.log("otherUserId: ", otherUserId);

    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                `/checkFriendStatus/${otherUserId}`
            );
            console.log("data in useEffect in friendButton: ", data);
            setButtonText(data);
        })();
    }, []);

    async function handleFriendship() {
        const { data } = await axios.post("/friendship", {
            buttonText,
            otherUserId,
        });
        console.log("data in handleFriendship: ", data);
        setButtonText(data);
    }

    return (
        <div>
            <button onClick={handleFriendship}>{buttonText}</button>
        </div>
    );
}
