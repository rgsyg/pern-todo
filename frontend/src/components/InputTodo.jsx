import { Button, TextField } from "@mui/material";
import { useTodoStore } from "../stores/useTodoStore";

export default function InputTodo() {
  const { createTodo, formData, setFormData } = useTodoStore();

  return (
    <>
      <h1 className="pt-12 text-center text-4xl">PERN TODO LIST</h1>
      <form
        method="post"
        className="flex items-center mt-12 gap-4"
        onSubmit={createTodo}
      >
        <TextField
          id="standard-basic"
          label="Add to-do"
          variant="outlined"
          className="flex-auto"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </>
  );
}
