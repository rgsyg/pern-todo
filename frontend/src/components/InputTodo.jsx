import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1 className="pt-12 text-center text-4xl">PERN TODO LIST</h1>
      <form
        method="post"
        className="flex items-center mt-12 gap-4"
        onSubmit={onSubmitForm}
      >
        <TextField
          id="standard-basic"
          label="Add to-do"
          variant="outlined"
          className="flex-auto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </>
  );
}
