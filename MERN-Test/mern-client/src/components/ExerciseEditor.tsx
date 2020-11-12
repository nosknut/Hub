import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from "../models/User";
import DatePicker from "react-date-picker";
import { Model } from '../models/Model';
import { Exercise } from "../models/Exercise";
import { useHistory } from "react-router-dom";

function create(exercise: Exercise) {
    return axios.post('http://lantea.eu/api/exercises', exercise);
}

function update(exercise: Exercise, id: string) {
    return axios.put('http://lantea.eu/api/exercises/' + id, exercise);
}

export function ExerciseEditor({ id }: { id?: string }) {
    const isEdit = !!id;

    const [username, setUsername] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [duration, setDuration] = useState<number>(0)
    const [date, setDate] = useState<Date>(new Date())

    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
        axios.get('http://lantea.eu/api/users/')
            .then(({ data }: { data: Model<User>[] }) => {
                if (data.length > 0) {
                    setUsername(data[0].username);
                    setUsers(data.map(user => user.username))
                }
            }).catch((error) => {
                console.log(error);
            })
        if (id) {
            axios.get('http://lantea.eu/api/exercises/' + id)
                .then(({ data }: { data: Model<Exercise> }) => {
                    setUsername(data.username);
                    setDescription(data.description);
                    setDuration(data.duration);
                    setDate(new Date(data.date));
                }).catch((error) => console.log(error))
        }
    }, [setUsername, setUsers, id, setDescription, setDuration, setDate]);

    const values = { username, description, duration, date, };

    const history = useHistory();

    return (
        <div>
            <h3>{`${isEdit ? "Edit" : "Create New"} Exercise Log`}</h3>
            <form onSubmit={e => {
                e.preventDefault();
                Promise.resolve().then(() => {
                    if (isEdit) {
                        return update(values, id as string)
                    } else {
                        return create(values)
                    }
                }).then(() => history.push("/"));
            }}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}>
                        {
                            users.map((user) => {
                                return <option key={user} value={user}>
                                    {user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={e => setDuration(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            value={date}
                            onChange={(val) => setDate(Array.isArray(val) ? val[0] : val)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Save Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div >
    );
}
