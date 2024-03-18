import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    desc: "",
    ingr: "",
    instr: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/recipes", recipe);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Recipe</h1>
      <input
        type="text"
        placeholder="Recipe title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Recipe description"
        name="desc"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Recipe ingredients"
        name="ingr"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Recipe instructions"
        name="instr"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all recipes</Link>
    </div>
  );
};

export default Add;
