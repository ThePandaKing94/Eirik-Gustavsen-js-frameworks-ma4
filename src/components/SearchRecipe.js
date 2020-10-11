import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RecipeList from "./RecipeList";
import axios from "axios";


function RecipeSearch() {
    const [recipes, setRecipies] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRecipies = async () => {
        axios.get("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/").then(response => {
          console.log(response.data.results)
          setRecipies(response.data.results)
        }).catch(error => {
          console.log(error)
          .finally(() => setLoading(false));
        })
      };
    
      // get all the recipies when this component loads
      useEffect(() => {
        getRecipies()
      }, [])

    const filterRecipes = function(e) {
        // Let's get the value the user typed in and make it lower case:
        const searchValue = e.target.value.toLowerCase();

        // create a new array from the recipes array
        const filteredArray = recipes.filter(function(char) {
            // make each name lowercase so we can check it properly with the search value
            const lowerCaseName = char.name.toLowerCase();

            // check if the character name begins with the search value using the startsWith method
            if (lowerCaseName.startsWith(searchValue)) {
                // if it does, return true
                // this will add it to the new filtered array
                return true;
            }
            return false;
        });

        // set filtered recipes to the new array
        setFilteredRecipes(filteredArray);
    };

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Search handleSearch={filterRecipes} />
            <RecipeList handleSearch={filterRecipes} />
            <Row>
                {filteredRecipes.map(character => {
                    const { id, name, image } = character;

                    return (
                        <Col sm={6} md={3} key={id}>
                            <RecipeList id={id} name={name} image={image} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}
