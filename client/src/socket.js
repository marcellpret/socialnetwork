import { io } from "socket.io-client";
import { newMessage, getMessages } from "./redux/messages/slice";
import { usersOnline, userOffline } from "./redux/users/slice";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("last-10-messages", (data) =>
            store.dispatch(getMessages(data))
        );

        socket.on("new-message-back", (data) =>
            store.dispatch(newMessage(data))
        );

        socket.on("online-users", (data) => store.dispatch(usersOnline(data)));

        socket.on("offline-user", (data) => store.dispatch(userOffline(data)));
    }
};
