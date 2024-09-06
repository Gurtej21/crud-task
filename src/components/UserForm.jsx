import React, { useState, useEffect } from 'react';
import axios from 'axios';   //axios is used to call API

const UserForm = ({ addUser, editing, currentUser, updateUser }) => {   //Here userform is a functional component which recieves four props adduser,editing,currentuser and updateuser
  const [user, setUser] = useState({ name: '', email: '', phone: '' });  // here user initialize a state using useState hook        
 // useSate hook initialize and manages the user state
  useEffect(() => {  //useEffect is to control the problem in functional components, here it is used to control the changes in editing and currentUser
    if (editing) {    // if there is editing then set the user as currentUser
      setUser(currentUser);
    } else {
      setUser({ name: '', email: '', phone: '' });
    }
  }, [editing, currentUser]);

  const handleSubmit = (e) => {  //handle submit is used to handle the form submision here e is the event listener
    e.preventDefault();  //stops the default form submission behavior
    if (editing) {
      updateUser(user);
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', user)  //here adding a new user if editing gor=es false then axios will send a post to JSON Placeholder api for creating a new user
        .then(response => addUser(response.data))
        .catch(error => console.log(error));
    }
  };

  return (
    <div className='FORM'>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
        required
      />
      <button type="submit">{editing ? 'Update User' : 'Add User'}</button>
    </form>
    {/* <div className='button'>
      <button> Home page</button>

    </div> */}
    </div>
  );
};

export default UserForm;
