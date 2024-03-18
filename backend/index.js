import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SleepyAgent#6565",
  database: "cs230aws3",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/recipes", (req, res) => {
  const q = "SELECT * FROM recipes";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/recipes", (req, res) => {
  const q = "INSERT INTO recipes(`title`, `desc`, `ingr`, `instr`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.ingr,
    req.body.instr,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;
  const q = " DELETE FROM recipes WHERE id = ? ";

  db.query(q, [recipeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;
  const q = "UPDATE recipes SET `title`= ?, `desc`= ?, `ingr`= ?, `instr`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.ingr,
    req.body.instr,
  ];

  db.query(q, [...values,recipeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
