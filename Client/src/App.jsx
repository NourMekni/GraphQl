import { useState } from 'react';
import './App.css'
import {useQuery,useMutation,gql} from "@apollo/client"

const GET_USERS=gql`
  query GetUsers{
    getUsers {
      id 
      age 
      name
      isMarried
    }
  }`;

const GET_USER_BY_ID=gql`
  query GetUserById($id:ID!){
    getUserById(id:$id){
      id
      age
      name
      isMarried
    }
  }
`

const CREATE_USER=gql`
  mutation createUser($name: String!,$age: Int!,$isMarried: Boolean!) {
    createUser(name:$name,age: $age,isMarried:$isMarried){  
    id  
    age
    name
    isMarried
    }
  }
`

function App() {
  const [newUser,setNewUser]=useState({})

  const {data:users,error:usersError,loading:usersLoading}=useQuery(GET_USERS);
  const {data:userById,error:userByIdError,loading:userByIdLoading}=useQuery(GET_USER_BY_ID,{variables:{id:"3"}});
  const [createUser]=useMutation(CREATE_USER)

  if (usersLoading) return <p>Data Loading..</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;

  if (userByIdLoading) return <p>Data Loading..</p>;
  if (userByIdError) return <p>Error: {userByIdError.message}</p>;

  const handleCreateUser=async()=>{
    console.log({newUser});
    createUser({variables:{name:newUser.name,age:Number(newUser.age),isMarried:false}});
  }

  return (
    <>
    <div>
      <input type="text" placeholder='name' onChange={e=>setNewUser((prev)=>({...prev,name:e.target.value}))} />
      <input type="text" placeholder='age' onChange={e=>setNewUser((prev)=>({...prev,age:e.target.value}))}/>
      <button onClick={handleCreateUser}>Create User</button>


    </div>
    <h1>chosen user :</h1>
    <p>{userById.getUserById.name}</p>
     <h1>Users :</h1>
     <hr />
     {users.getUsers.map((user=>(
      <div>
        
        <p>Name : {user.name}</p>
        <p>ID : {user.id}</p>
        <p>Age : {user.age}</p>
        <p>Married : {user.isMarried}</p>
      </div>
     )))}
      
    </>
  )
}

export default App
