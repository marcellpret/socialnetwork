import { useDispatch, useSelector } from "react-redux";
import chatMessagesReducer, { newMessage } from "./redux/messages/slice";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => state.chatMessages);
    const dispatch = useDispatch();

    console.log("chatMessages in Chat: ", chatMessages);

    const sendMessage = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("new-message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1>Chat</h1>
            <div className="chat-box">
                {chatMessages &&
                    chatMessages.map((message) => (
                        <div className="chat-message" key={message.id}>
                            <img src={message.avatar} alt="" />
                            <div>
                                <h5>
                                    <em>
                                        {message.first} {message.last} said:
                                    </em>
                                </h5>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                name="chat-input"
                id="chat-input"
                placeholder={"Write here your message..."}
                onKeyPress={sendMessage}
            ></textarea>
        </div>
    );
}
