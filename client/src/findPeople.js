import { useState, useEffect } from "react";
import axios from "axios";

export default function FindPeople() {
    // console.log("props - info passed down from parent (App) --> ", props);

    const [latestUsers, setLatestUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/findpeople");
            console.log("data in useEffect: ", data);
            setLatestUsers(data);
        })();
    }, []);

    useEffect(() => {
        let abort;
        (async () => {
            const { data } = await axios.get(`/api/findpeople/${searchTerm}`);
            if (!abort) {
                setUsers(data);
            }
        })();
        return () => {
            abort = true;
        };
    }, [searchTerm]);

    return (
        <div>
            <h3>Most recent users in our network</h3>
            <div className="most-recent">
                {latestUsers.map((latestUser) => (
                    <div className="most-recent-card" key={latestUser.id}>
                        <img
                            src={latestUser.avatar}
                            alt={`${latestUser.first} ${latestUser.last}`}
                        />
                        <p>
                            {latestUser.first} {latestUser.last}
                        </p>
                    </div>
                ))}
            </div>
            <div className="search-users">
                <label htmlFor="search-user">🔍</label>
                <input
                    type="text"
                    name="search-user"
                    id="search-user"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {users.map((user) => (
                <div className="most-recent-card" key={user.id}>
                    <img src={user.avatar} alt={`${user.first} ${user.last}`} />
                    <p>
                        {user.first} {user.last}
                    </p>
                </div>
            ))}
        </div>
    );
}
