import './landing.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";

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
    <ThemeProvider>
        <React.StrictMode>
            <Landing />
        </React.StrictMode>
    </ThemeProvider>
);