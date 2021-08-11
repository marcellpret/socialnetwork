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
        <div className="flex width100">
            <div className="container">
                <div className="most-recent">
                    <h2>Most Recent Users</h2>
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
            </div>
            <div className="width100">
                <div className="search-users">
                    <label htmlFor="search-user">🔍</label>
                    <input
                        type="text"
                        name="search-user"
                        id="search-user"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex wrap search-result">
                    {searchTerm &&
                        users.map((user) => (
                            <div className="result-people" key={user.id}>
                                <img
                                    src={user.avatar}
                                    alt={`${user.first} ${user.last}`}
                                />
                                <p>
                                    {user.first} {user.last}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
