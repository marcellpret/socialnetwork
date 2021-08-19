import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptFriendRequest,
    addFriend,
    unfriend,
} from "./redux/friends/slice";
import { buttonState, buttonTxt } from "./redux/friendButton/slice";

export default function FriendButton({ otherUserId }) {
    console.log("otherUserId: ", otherUserId);
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState("");
    const [friendshipId, setFriendshipId] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `/checkFriendStatus/${otherUserId}`
                );
                console.log("data in useEffect in friendButton: ", data);
                setButtonText(data.buttonText);
                setFriendshipId(data.id);
                dispatch(buttonState(data));
            } catch (error) {
                console.log("error in useEffect in friendButton: ", error);
            }
        })();
    }, []);

    const TEXT_IN_BUTTON = {
        cancel: "❌ Cancel Friend Request",
        delete: "❌ UNfriend",
        add: "➕ Add Friend",
        accept: "👍🏼 Accept Friend Request",
    };

    async function handleFriendship() {
        if (
            buttonText === TEXT_IN_BUTTON.cancel ||
            buttonText === TEXT_IN_BUTTON.delete
        ) {
            dispatch(unfriend(friendshipId, otherUserId, buttonText));
            setButtonText(TEXT_IN_BUTTON.add);
        } else if (buttonText === TEXT_IN_BUTTON.accept) {
            dispatch(
                acceptFriendRequest(friendshipId, otherUserId, buttonText)
            );
            setButtonText(TEXT_IN_BUTTON.delete);
        } else {
            dispatch(addFriend(otherUserId, buttonText));
            setButtonText(TEXT_IN_BUTTON.cancel);
        }
    }

    return (
        <div>
            <button onClick={handleFriendship}>{buttonText}</button>
        </div>
    );
}
//
