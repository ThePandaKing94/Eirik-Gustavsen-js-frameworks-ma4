import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import RecipeItem from './RecipeItem';
import Search from "./Search";

function RecipeList() {
  // keep all the recipies in the "store"
  const [recipes, setRecipies] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);


  // fetch all the recipies from the backend
  // we are using a proxy since the backend is not CORS enabled
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
    const searchValue = e.target.value.toLowerCase();

    const filteredArray = recipes.filter(function(recipe) {
        const lowerCaseName = recipe.name.toLowerCase();

        if (lowerCaseName.startsWith(searchValue)) {
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
    <div>
      <h1>Recipies</h1>

      {recipes.map((recipe) =>
        <div>
          <RecipeItem title={recipe.title} ingredients={recipe.ingredients} href={recipe.href} thumbnail={recipe.thumbnail} />
          <Search handleSearch={filterRecipes} />
          <RecipeList handleSearch={filterRecipes} />
          <Row>
              {filteredRecipes.map(recipe => {
                 const { id, name, image } = recipe;
                    <Col sm={6} md={3} key={id}>;
                       <RecipeList id={id} name={name} image={image} />
                    </Col>   
              }
              )
            }
          </Row>
        )
        </div>
      )}
   </div>
  )
  }
export default RecipeList;
