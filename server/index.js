import express from "express";
import Frute from "./fruts/index.js";

const app = express(); 
const port = 3000;

app.get("/k", (req, res) => {
  res.send("Welcome to the Fruit API!");
});

app.get("/fruits", (req, res) => {
  res.json(Frute);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
