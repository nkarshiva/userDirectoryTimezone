// src/components/UserDirectory.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDirectory = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  const getUsers = () =>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(usersData => {
        // Fetch posts for each user to get the post count
        const usersWithPostCount = usersData.map(async user => {
          const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
          const posts = await postsResponse.json();
          return { ...user, postsCount: posts.length };
        });

        // Resolve all promises and set the updated user data
        Promise.all(usersWithPostCount).then(updatedUsers => setUsers(updatedUsers));
      });
  }

  useEffect(() => {
    getUsers()
  }, []);

return (
    <div className="flex flex-col justify-center text-center">
        <h3>Directory</h3>
      {users.map(user => (
        <Link
          key={user.id}
          to={`/user/${user.id}`}
          className="m-4 p-4 border-black border-[2px] bg-[#CFE1F3] cursor-pointer flex flex-row justify-between items-center rounded-[10px]"
          onClick={() => onSelectUser(user)}
        >
          <p className="font-medium">Name: {user.name}</p>
          <p>Posts: {user.postsCount || 0} </p>
        </Link>
      ))}
    </div>
  );
};

export default UserDirectory;



