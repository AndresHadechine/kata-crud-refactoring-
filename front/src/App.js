import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import StoreProvider from './Components/StoreProvider';
import List from './Components/List';
import Form from './Components/Form';

function App() {
  return <StoreProvider>
    <center>
    <h3>To-Do List</h3>
    <Form />
    <br/>
    <List />
    </center>
  </StoreProvider>
}

export default App;
