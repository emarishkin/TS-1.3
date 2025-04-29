import { FC, useState, useEffect, ChangeEvent } from "react";
import { User } from "../Types";
import { fetchUsers, createUser } from "../userService";
import { UserCard } from "./UserCard";

export const UserList: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = async () => {
    if (newUserName.trim() && newUserEmail.trim()) {
      try {
        const newUser = await createUser({
          name: newUserName,
          email: newUserEmail,
        });

        setUsers([...users, newUser]);
        setNewUserName("");
        setNewUserEmail("");
      } catch (error) {
        console.error("Ошибка при создании пользователя:", error);
      }
    }
  };

  return (
    <div>
      <h3>Список пользователей:</h3>

      {users.length === 0 ? (
        <p>Загрузка пользователей...</p>
      ) : (
        <ol>
          {users.map(user => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </ol>
      )}

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Имя"
          value={newUserName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUserName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUserEmail(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleAddUser}>Добавить пользователя</button>
      </div>
    </div>
  );
};
