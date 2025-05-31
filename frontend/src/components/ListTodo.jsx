import {
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ListTodo() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  async function getAllTodo() {
    try {
      const response = await fetch(API_BASE_URL);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function editTodo(id) {
    try {
      if (edit === false) {
        return;
      }
      const body = { description };
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setEdit(false);
      setOpen(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleEdit(e) {
    setDescription(e.target.textContent);
    setEdit(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    getAllTodo();
  }, [todos]);

  return (
    <div className="flex gap-4 flex-wrap mt-8">
      {todos.map((todo) => (
        <Card
          key={todo.todo_id}
          className="flex-1/5 justify-between flex flex-col"
        >
          <CardContent>
            <p
              contentEditable
              onInput={handleEdit}
              suppressContentEditableWarning
            >
              {todo.description}
            </p>
          </CardContent>
          <CardActions className="mb-2">
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => editTodo(todo.todo_id)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="warning"
              variant="contained"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Successfully edited!"
      />
    </div>
  );
}
