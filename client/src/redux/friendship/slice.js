export default function friendshipReducer(state = [], action) {
    if (action.type == "button/state") {
        state = action.payload.data;
    }

    if (action.type == "button/text") {
        state = action.payload.data;
    }

    return state;
}

export function buttonState(data) {
    return {
        type: "button/state",
        payload: { data },
    };
}

export function buttonTxt(data) {
    return {
        type: "button/text",
        payload: { data },
    };
}
