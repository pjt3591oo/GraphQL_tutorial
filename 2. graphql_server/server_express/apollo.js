const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const studentTemp = {
  1: [
    {id: 1, name: "멍개1-1", math: 80, korean: 60, english: 80},
    {id: 2, name: "멍개1-2", math: 70, korean: 70, english: 80},
    {id: 3, name: "멍개1-3", math: 60, korean: 80, english: 80},
    {id: 3, name: "멍개1-4", math: 50, korean: 80, english: 80},
  ],
  2: [
    {id: 4, name: "멍개2-1", math: 80, korean: 60, english: 80},
    {id: 5, name: "멍개2-2", math: 70, korean: 70, english: 80},
    {id: 6, name: "멍개2-3", math: 60, korean: 80, english: 80},
  ],
  3: [
    {id: 7, name: "멍개3-2", math: 80, korean: 60, english: 80},
    {id: 8, name: "멍개3-1", math: 70, korean: 70, english: 80},
  ]
}


const typeDefs = gql`
  type Query {
    Students(num:Int): [Student]
    Hello: String
  }

  type Student {
    id: Int
    name: String
    math: Int
    korean: Int
    english: Int
  }

  type Mutation {
    Student(id: Int, classNum: Int, name: String, math: Int, korean: Int, english: Int): Student
  }
`
const resolvers = { 
  Query: {
    Students(parent, args, context, info) { 
      let data = studentTemp[args.num]
      console.log("조회")
      return data 
    },
    Hello() {
      return "WORLD"
    }
  },
  Mutation: {
    Student(parent, args, context, info) {
      let { 
        id,
        classNum,
        name,
        math,
        korean,
        english
      } = args
      let student = {
        id,
        name,
        math,
        korean,
        english
      }
      studentTemp[classNum].push(student)
      console.log('created', classNum)
      return student
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const port = 3000
server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`GraphQL Server ON: ${port}${ server.graphqlPath}`)
);