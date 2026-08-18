"use Client";

import { createTodo, deleteTodo, updateTodo } from "@/lib/api";
import { Todo, TodoPayload } from "@/types/todo";
import { createContext, useContext, useState } from "react";

interface ITodoContextType {
  todos: Todo[];
  editingTodo: Todo | null;
  todoToDelete: Todo | null;
  showModal: boolean;
  showDeleteModal: boolean;
  loading: boolean;
  error: string | null;
  handleCreate: () => void;
  handleEdit: (todo: Todo) => void;
  handleCloseModal: () => void;
  handleDeleteRequest: (id: number) => void;
  handleCloseDeleteModal: () => void;
  handleSubmit: (todo: TodoPayload) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleToggle: (todo: Todo) => Promise<void>;
  closeError: () => void;
}

interface ITodoProviderProps {
  children: React.ReactNode;
  initialTodos: Todo[];
}

const TodoContext = createContext<ITodoContextType | null>(null);

export function TodoProvider({ children, initialTodos }: ITodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCreate() {
    setEditingTodo(null);
    setShowModal(true);
  }

  function handleEdit(todo: Todo) {
    setEditingTodo(todo);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingTodo(null);
  }

  function handleDeleteRequest(id: number) {
    const todo = todos.find((x) => x.id === id);
    if (!todo) return;
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setTodoToDelete(null);
    setShowDeleteModal(false);
  }

  async function handleSubmit(payload: TodoPayload) {
    try {
      setLoading(true);
      setError(null);

      if (editingTodo) {
        //edit
        const updatedTodo = await updateTodo(editingTodo.id, payload);
        setTodos(current =>current
        .map(todo =>todo.id === updatedTodo.id ? updatedTodo : todo)
        .sort((a,b)=>a.priority-b.priority)
        );
      }else{
        // create 
        const newTodo = await createTodo(payload);
        setTodos(current=>[...current,newTodo].sort((a,b)=>a.priority-b.priority))
      }

      handleCloseModal()
    } catch (error) {
      setError(error instanceof Error ? error.message : "operation failed");
      throw error;
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(){
    if(!todoToDelete) return
    try{
      setLoading(true)
      setError(null)

      await deleteTodo(todoToDelete.id);
      setTodos(current => current.filter(todo => todo.id !== todoToDelete.id))
      if(editingTodo?.id === todoToDelete.id) 
        handleCloseModal()

      handleCloseDeleteModal()
    }
    catch(error){
      setError(error instanceof Error ? error.message : "failed to delete todo")
    }
    finally{setLoading(false)}
  }

  async function handleToggle(todo:Todo){
    try {
      setError(null)

      const updatedTodo = await updateTodo(todo.id,{...todo,is_done:!todo.is_done});
      setTodos(current => 
        current.map(x=>x.id === updatedTodo.id ? updatedTodo : x)
        .sort((a,b)=>a.priority - b.priority)
      );

    } catch (error) {
      setError(error instanceof Error ? error.message : "failed to update todo");
    }
  }

  function closeError(){
    setError(null)
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        editingTodo,
        todoToDelete,
        showModal,
        showDeleteModal,
        loading,
        error,
        handleCreate,
        handleEdit,
        handleCloseModal,
        handleDeleteRequest,
        handleCloseDeleteModal,
        handleSubmit,
        handleDelete,
        handleToggle,
        closeError
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext (){
  const context = useContext(TodoContext);
  if(!context)
    throw new Error("useTodoContext must be used inside TodoProvider");
  return context;
}