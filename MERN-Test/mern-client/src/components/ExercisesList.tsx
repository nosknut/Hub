import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Exercise } from '../models/Exercise';
import { Model } from '../models/Model';

function Row({ deleteExercise, exercise: {
    _id, username, description, duration, date,
} }: {
    deleteExercise: (id: string) => void,
    exercise: Model<Exercise>
}) {
    return (
        <tr>
            <td>{username}</td>
            <td>{description}</td>
            <td>{duration}</td>
            <td>{date.toString().substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + _id}>edit</Link> | <a
                    href="#"
                    onClick={() => {
                        deleteExercise(_id)
                    }}
                >delete</a>
            </td>
        </tr>
    );
}

export function ExerciseList() {
    const [exercises, setExercises] = useState<Model<Exercise>[]>([]);

    useEffect(() => {
        axios.get('http://lantea.eu/api/exercises/')
            .then(response => {
                setExercises(response.data);
            })
    }, [setExercises]);

    function deleteExercise(id: string) {
        axios.delete('http://lantea.eu/api/exercises/' + id)
            .then(() => {
                setExercises(exercises.filter(el => el._id !== id))
            });
    }

    const rows = exercises.map(exercise => (
        <Row
            exercise={exercise}
            deleteExercise={deleteExercise}
            key={exercise._id}
        />
    ));

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}
