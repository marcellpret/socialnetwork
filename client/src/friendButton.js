import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { buttonState, buttonTxt } from "./redux/friendship/slice";

export default function FriendButton({ otherUserId }) {
    console.log("otherUserId: ", otherUserId);
    const dispatch = useDispatch();
    // const [buttonText, setButtonText] = useState("");
    // const [friendshipId, setFriendshipId] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                `/checkFriendStatus/${otherUserId}`
            );
            console.log("data in useEffect in friendButton: ", data);
            // setButtonText(data.buttonText);
            // setFriendshipId(data.id);
            dispatch(buttonState(data));
        })();
    }, []);

    const friendship = useSelector((state) => {
        return state.friendship;
    });

    const text = friendship.buttonText;
    const id = friendship.id;

    async function handleFriendship() {
        const { data } = await axios.post("/friendship", {
            text,
            otherUserId,
            id,
        });
        console.log("data in handleFriendship: ", data);
        dispatch(buttonTxt(data));
        // setButtonText(data);
    }

    return (
        <div>
            <button onClick={handleFriendship}>{text}</button>
        </div>
    );
}
//
