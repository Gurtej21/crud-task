import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';

import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';


import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]); //[] means when component first render users will be an empty array
  const [editing, setEditing] = useState(false); // here false is used for intial value for the editing when it renders the component will not be in a edit mode
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', phone: '' });

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)  // send an http PUT request to the jsonplaceholder to update the user
      .then(response => {
        setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user)));  // here creating a new arrays, now here it means id=f current user id matchs the id of updatedd user , if it matches replaces that user with the updated user from server , if not then it keep as it is.
        setEditing(false);
        setCurrentUser({ id: null, name: '', email: '', phone: '' });
      })
      .catch(error => console.log(error));
  };

  const deleteUser = (id) => {   //here we are the deleting the user by id which will be stored in local Storage
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`) // and here the axios will delete the user from the server
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
     <div className="container">
      <h1>CRUD Application with JSONPlaceholder</h1>
      <UserForm
        addUser={addUser}
        editing={editing}
        currentUser={currentUser}
        updateUser={updateUser}
      />
      <UserList users={users} editUser={editUser} deleteUser={deleteUser} />
   <BrowserRouter>
   <Routes>

  <Route path="home" element={<HomePage/>}/>

   </Routes>

   
   </BrowserRouter>

    </div>

  
   


    
  );
};

export default App;
