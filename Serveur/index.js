import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"
const users=[
    {id:"1",name:"John Doe",age:30,isMarried:false},
    {id:"2",name:"Nour Mekni",age:40,isMarried:true},
    {id:"3",name:"Wiem Mekni",age:50,isMarried:true}
]

const typeDefs=` 
    type Query {
        getUsers: [User]
        getUserById(id:ID!):User
    } 
    type Mutation {
        createUser(name: String!,age: Int!,isMarried: Boolean!): User
    }
    type User {
        id:ID
        name: String
        age: Int
        isMarried: Boolean
    }`;

const resolvers= {
    Query:{
        getUsers:()=>{
            return users;
        },
        getUserById:(parent,args)=>{
            const id=args.id;
            return users.find((user)=>user.id===id)
        }
    },
    Mutation:{
        createUser:(parent,args)=>{
            const {name,age,isMarried}=args;
            const newUser={
                id:(users.length+1).toString(),
                name,
                age,
                isMarried,
            };
            console.log(newUser)
            users.push(newUser);
            return newUser;
        }
    },
};



const server=new ApolloServer({typeDefs,resolvers});

const {url}=await startStandaloneServer(server,{
    listen:{port:4000},
    // si on a deux frontend  
    // cors: {
    //     origin: ['http://localhost:3000', 'http://localhost:3001'], // Autoriser les deux frontends
    //     credentials: true,
    // }
});

console.log(`server running at :${url}`);