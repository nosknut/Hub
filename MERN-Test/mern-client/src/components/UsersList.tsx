import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Exercise } from '../models/Exercise';
import { Model } from '../models/Model';
import { User } from '../models/User';

function Row({ deleteUser, user: {
    _id, username
} }: {
    deleteUser: (id: string) => void,
    user: Model<User>
}) {
    return (
        <tr>
            <td>{username}</td>
            <td>
                <a
                    href="#"
                    onClick={() => {
                        deleteUser(_id)
                    }}
                >delete</a>
            </td>
        </tr>
    );
}

export function UsersList() {
    const [users, setUsers] = useState<Model<User>[]>([]);

    useEffect(() => {
        axios.get('http://lantea.eu/api/users/')
            .then(response => {
                setUsers(response.data);
            })
    }, [setUsers]);

    function deleteUser(id: string) {
        axios.delete('http://lantea.eu/api/users/' + id)
            .then(() => {
                setUsers(users.filter(el => el._id !== id))
            });
    }

    const rows = users.map(user => (
        <Row
            user={user}
            deleteUser={deleteUser}
            key={user._id}
        />
    ));

    return (
        <div>
            <h3>Users</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}
