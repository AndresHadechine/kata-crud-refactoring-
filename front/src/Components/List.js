import {Store} from './StoreProvider';
import { Button, Table } from 'react-bootstrap';
import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
const HOST_API = "http://localhost:8080/api";

const List = () => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;
  
    useEffect(() => {
      fetch(HOST_API + "/todos")
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "update-list", list })
        })
    }, [dispatch]);
  
  
    const onDelete = (id) => {
      fetch(HOST_API + "/" + id + "/todo", {
        method: "DELETE"
      }).then((list) => {
        dispatch({ type: "delete-item", id })
      })
    };
  
    const onEdit = (todo) => {
      dispatch({ type: "edit-item", item: todo })
    };
  
    const onChange = (event, todo) => {
      const request = {
        name: todo.name,
        id: todo.id,
        completed: event.target.checked
      };
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
        });
    };
  
    const decorationDone = {
      textDecoration: 'line-through'
    };
    return <div>
      <Table>
        <thead>
          <tr>
            <td><b>ID</b></td>
            &nbsp;&nbsp;
            <td><b>Tarea</b></td>
            <td><b>¿Completado?</b></td>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todo) => {
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
              <td>{todo.id}</td>
              &nbsp;&nbsp;
              <td>{todo.name}</td>
              <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
              <td><Button variant = "danger" onClick={() => onDelete(todo.id)}>Eliminar</Button></td>
              <td><Button variant = "warning" onClick={() => onEdit(todo)}>Editar</Button></td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  }
  export default List;