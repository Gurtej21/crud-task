import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ editUser, deleteUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users') // axios.get command is used for the the user data which is available at the server to our frontend application
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='LIST'> 
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button onClick={() => editUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default UserList;
