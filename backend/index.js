//import http from "http";

//const cors = require("cors");

/*const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};*/

require("dotenv").config();
const express = require("express");
const Note = require("./models/note");

const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log("---");
    next();
};

app.use(express.static("dist"));
app.use(express.json());
//app.use(cors(corsOptions));
app.use(requestLogger);

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true,
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    });
});

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id === id);
    console.log(note);
    
    if(note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

const generateId = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => Number(n.id))) 
    : 0;

    return String(maxId + 1);    
};

app.post("/api/notes", (request, response) => {
    const body = request.body;

    if(!body.content) {
        return response.status(400).json({ 
            error: "content missing", 
        });
    }

    const note = {
        content: body.content,
        important: body.important || false, // no checks for non-boolean values
        id: generateId(),
    };

    notes = notes.concat(note);
    
    console.log(note);
    console.log(request.get("content-type"));
    console.log(request.headers);

    response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: "unknown endpoint", });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
