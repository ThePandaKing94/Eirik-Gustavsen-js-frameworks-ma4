import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { RECIPE_URL } from "../constants/api";

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(RECIPE_URL)
            .then(response => response.json())
            .then(json => setCharacters(json.results))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <ul>
            {characters.map(character => (
                <li key={character.id}>{character.name}</li>
            ))}
        </ul>
    );
}

export default CharacterList;

