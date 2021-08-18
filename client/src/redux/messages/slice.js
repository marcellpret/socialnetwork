export default function chatMessagesReducer(state = [], action) {
    if (action.type === "messages/get") {
        return action.payload.data;
    }

    if (action.type === "message/new") {
        return [...action.payload.data, ...state];
    }

    return state;
}

export function getMessages(data) {
    return {
        type: "messages/get",
        payload: { data },
    };
}

export function newMessage(data) {
    return {
        type: "message/new",
        payload: { data },
    };
}
