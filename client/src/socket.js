import { io } from "socket.io-client";
import { newMessage, getMessages } from "./redux/messages/slice";
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
    }
};
