import React from "react";
import ReactDOM from "react-dom/client";

import './landing.css'

import ExampleComponent from "./exampleComponent";

// import PouchDB from 'pouchdb';
// const db: PouchDB.Database<{}> = new PouchDB('blob');

function Landing() {
    return (
        <ExampleComponent />
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Landing />
    </React.StrictMode>
);