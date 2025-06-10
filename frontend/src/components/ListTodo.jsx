import {
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
} from "@mui/material";
import { useTodoStore } from "../stores/useTodoStore";
import { useEffect } from "react";

export default function ListTodo() {
  const {
    todos,
    currentTodo,
    fetchTodos,
    updateTodo,
    deleteTodo,
    edit,
    makeEditable,
    openModal,
    setOpenModal,
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="flex gap-4 flex-wrap mt-8">
      {todos.map((todo) => (
        <Card
          key={todo.todo_id}
          className="flex-1/5 justify-between flex flex-col"
        >
          <CardContent>
            <p id={`todo${todo.todo_id}`}>{todo.description}</p>
          </CardContent>
          {edit && todo.todo_id === currentTodo ? (
            <CardActions className="mb-2">
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  updateTodo(todo.todo_id);
                  makeEditable(todo.todo_id, false);
                }}
              >
                Update
              </Button>
              <Button
                size="small"
                color="warning"
                variant="contained"
                onClick={() => makeEditable(todo.todo_id, false)}
              >
                Cancel
              </Button>
            </CardActions>
          ) : (
            <CardActions className="mb-2">
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => makeEditable(todo.todo_id, true)}
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
          )}
        </Card>
      ))}
      <Snackbar
        id="update_modal"
        autoHideDuration={6000}
        open={openModal}
        onClose={() => setOpenModal(false)}
        message="Successfully edited!"
      />
    </div>
  );
}
