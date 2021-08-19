import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state.users);
    console.log("onlineUsers: ", JSON.stringify(onlineUsers));

    return (
        <div className="online-users">
            <h3>We are online:</h3>
            <div>
                {onlineUsers &&
                    onlineUsers.map((user, index) => (
                        <Link to={`/user/${user.id}`} key={user.id}>
                            <img src={user.avatar} alt="" />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
