import { useState, useEffect } from "react";
import axios from "axios";
import { friendsAndWannabes } from "./redux/friends/slice";
import { useDispatch, useSelector } from "react-redux";
import FriendButton from "./friendButton";

export default function Friends() {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/friends-and-wannabees");
            console.log("data in Friends: ", data);
            dispatch(friendsAndWannabes(data));
        })();
    }, []);

    const friends = useSelector((state) => {
        return (
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(({ accepted }) => accepted)
        );
    });
    const wannabes = useSelector((state) => {
        return (
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(({ accepted }) => !accepted)
        );
    });

    console.log("friends: ", friends);
    console.log("wannabes: ", wannabes);

    return (
        <div>
            <section className="friends">
                <h2>Friends</h2>
                <div>
                    {friends.map((friend) => (
                        <div className="result-people" key={friend.id}>
                            <img
                                src={friend.avatar}
                                alt={`${friend.first} ${friend.last}`}
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <FriendButton otherUserId={friend.id} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="wannabes">
                <h2>Friendship Requests</h2>
                <div>
                    {wannabes.map((wannabe) => (
                        <div className="result-people" key={wannabe.id}>
                            <img
                                src={wannabe.avatar}
                                alt={`${wannabe.first} ${wannabe.last}`}
                            />
                            <p>
                                {wannabe.first} {wannabe.last}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
