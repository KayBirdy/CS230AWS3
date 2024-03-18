import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRecipes();
  }, []);

  console.log(recipes);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/recipes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class = "recipePage">
      <h1>Your Recipes</h1>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe">
            <h2>{recipe.title}</h2>
            <h3>Description</h3>
            <p>{recipe.desc}</p>
            <h3>Ingredients</h3>
            <p>{recipe.ingr}</p>
            <h3>Instructions</h3>
            <p>{recipe.instr}</p>
            <button className="delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${recipe.id}`}
                style={{ background: "#ebdfcc", color: "#5e0b15", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ background: "#ebdfcc", color: "#5e0b15", textDecoration: "none" }}>
          Add new Recipe
        </Link>
      </button>
    </div>
  );
};

export default Recipes;
