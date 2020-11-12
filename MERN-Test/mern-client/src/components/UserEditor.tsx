import React, { useState } from 'react';
import axios from 'axios';
import { User } from "../models/User";
import { useHistory } from "react-router-dom";

function submit(user: User) {
    return axios.post('http://lantea.eu/api/users', user);
}

export function UserEditor() {
    const [username, setUsername] = useState<string>("");

    const history = useHistory();

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={e => {
                e.preventDefault();
                submit({ username }).then(() => history.push("/"));
            }}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div >
    );
}