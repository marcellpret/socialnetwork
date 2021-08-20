import axios from "axios";

export default function usersReducer(state = [], action) {
    if (action.type === "users/online") {
        return action.payload.infoOnlineUsers;
    }

    if (action.type === "user/offline") {
        return state.filter((user) => {
            return user.id != action.payload.id;
        });
    }

    return state;
}

export function usersOnline(data, userId) {
    return async (dispatch) => {
        const filteredData = data.filter((user) => user != userId);
        const pendingUserPromises = filteredData.map(async (userId) => {
            try {
                const resp = await axios.get(`/userInfo/${userId}`);
                console.log("data in slice User Online: ", resp);
                return resp.data;
            } catch (error) {
                console.log(error);
            }
        });

        Promise.all(pendingUserPromises).then((infoOnlineUsers) => {
            dispatch({
                type: "users/online",
                payload: { infoOnlineUsers },
            });
        });
    };
}

export function userOffline(id) {
    return {
        type: "user/offline",
        payload: { id },
    };
}
