import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ExerciseList } from "./components/ExercisesList";
import { ExerciseEditor } from "./components/ExerciseEditor";
import { UserEditor } from "./components/UserEditor";
import { UsersList } from './components/UsersList';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" render={props => <ExerciseEditor id={props.match.params.id} />} />
        <Route path="/create" render={props => <ExerciseEditor />} />
        <Route path="/users" component={UsersList} />
        <Route path="/user" component={UserEditor} />
      </div>
    </Router>
  );
}

export default App;
