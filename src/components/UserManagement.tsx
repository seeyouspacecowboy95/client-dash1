import React, { useEffect, useState } from 'react';
import { createUser, fetchUsers } from '../utils/userService';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  const loadUsers = async () => {
    const userList = await fetchUsers();
    setUsers(userList);
  };

  const handleCreateUser = async () => {
    await createUser(newUser);
    setNewUser({ name: '', email: '', role: '' });
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role"
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      />
      <button onClick={handleCreateUser}>Add User</button>

      <h3>Existing Users</h3>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};
