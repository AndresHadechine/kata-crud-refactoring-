import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import {Store} from './StoreProvider';
import { Button } from 'react-bootstrap';
const HOST_API = "http://localhost:8080/api";

const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
      if(state.name !== undefined){ 
      fetch(HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
      }else{ alert("No se puede agregar con el campo vacio"); }
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
      if(state.name !== undefined){ 
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
      }else{ alert("No se puede editar con el campo vacio"); }
    }
  
    return <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="¿Qué piensas hacer hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input>
        &nbsp;&nbsp;&nbsp;&nbsp;
      {item.id && <Button variant = "outline-Success" onClick={onEdit}>Actualizar</Button>}
      &nbsp;&nbsp;
      {!item.id && <Button variant = "outline-primary" onClick={onAdd}>Crear</Button>}
    </form>
  }
  export default Form;