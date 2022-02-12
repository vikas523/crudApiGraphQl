const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
// const{gql}=require('graphql')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')



async function startServer(){
 const app = express()
 const apolloServer = new ApolloServer({
     typeDefs:typeDefs,
     resolvers:resolvers
 })
 await apolloServer.start()

apolloServer.applyMiddleware({app:app})

app.use((req,res)=>{
    res.send("hello express server")
})

await mongoose.connect("mongodb://localhost:27017/post_db",{})
console.log('mongoose connected');

app.listen(4000,()=>{
    console.log("server is running on port 4000");
})

}
startServer()
