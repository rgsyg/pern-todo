import { create } from "zustand"

const API_BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useTodoStore = create((set, get) => ({
    todos: [],
    edit: false,
    formData: { description: "" },
    setFormData: (formData) => set({ formData: formData }),
    currentTodo: "",
    openModal: false,
    setOpenModal: (openModal) => set({ openModal }),

    fetchTodos: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos`);
            const jsonData = await response.json();
            set({ todos: jsonData })
        } catch (error) {
            console.error(error.message);
        }
    },

    createTodo: async (e) => {
        e.preventDefault()
        try {
            const { formData } = get()
            await fetch(`${API_BASE_URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            get().fetchTodos()
        } catch (error) {
            console.error(error.messsage)
        }
    },

    makeEditable: (id, setEdit) => {
        set({ edit: setEdit })
        const { edit } = get()
        const currentTextBox = document.getElementById(`todo${id}`)
        currentTextBox.contentEditable = edit
        set({ currentTodo: id })
    },

    updateTodo: async (id) => {
        const currentTextBox = document.getElementById(`todo${id}`)
        const description = currentTextBox.innerText

        try {
            await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ description })
            })
            set({ openModal: true })
        } catch (error) {
            console.error(error.message)
        }
    },

    deleteTodo: async (id) => {
        try {
            await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: "DELETE"
            })
            get().fetchTodos()
        } catch (error) {
            console.error(error.message)
        }
    }
}))