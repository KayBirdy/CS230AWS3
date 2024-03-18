import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    desc: "",
    ingr: "",
    instr: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const recipeId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/recipes/${recipeId}`, recipe);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the recipe</h1>
      <input
        type="text"
        placeholder="Recipe title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Recipe desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        rows={5}
        type="text"
        placeholder="Recipe ingredients"
        name="ingr"
        onChange={handleChange}
      />
      <input
        rows={5}
        type="text"
        placeholder="Recipe instructions"
        name="instr"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all recipes</Link>
    </div>
  );
};

export default Update;
