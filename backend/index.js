const express = require("express");

require("dotenv").config();

const app = express();
const cors = require("cors");
const pool = require("./db");
const morgan = require("morgan")
const helmet = require("helmet")
const path = require("path")

app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use(helmet())

const PORT = process.env.PORT || 3000
__dirname = path.resolve()

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const getAllTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id");
    res.json(getAllTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await pool.query(
    "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
    [id]
  );
  res.json("Successfully deleted: " + deleteTodo.rows[0]["description"]);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("/{*any}", (req, res) => { // "*" causes error
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
