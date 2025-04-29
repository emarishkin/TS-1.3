import { ChangeEvent, FC, useEffect, useState } from "react";
import { User } from "../Types";
import { fetchUsers } from "../userService";
import { UserCard } from "./UserCard";

export const UserList: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName,setNewUserName] = useState<string>('')
  const [newUserEmail,setNewUserEmail] = useState<string>('')




  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const ChangeName = (e:ChangeEvent<HTMLInputElement>) =>{
    setNewUserName(e.target.value) 
  }
  const ChangeEmail = (e:ChangeEvent<HTMLInputElement>) =>{
    setNewUserEmail(e.target.value) 
  }

  const AddUser = () =>{
    if(newUserName!==''&&newUserEmail!==''){
      const newUser = {
        id:Date.now(),
        name:newUserName,
        email:newUserEmail
      }
      setUsers([...users,newUser])
      setNewUserName('')
      setNewUserEmail('')
    }
  }

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}

      <input 
      type="text"
      value={newUserName}
      placeholder="Введите имя"
      onChange={ChangeName}
      />

      <input 
      type="text"
      value={newUserEmail}
      placeholder="Введите email"
      onChange={ChangeEmail}
      />

      <button onClick={AddUser}>добавить нового пользователя</button>
    </div>
  );
};
