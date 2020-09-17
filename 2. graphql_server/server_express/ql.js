const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000

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


const schema = buildSchema(`
type Query {
  Students(num:Int): [Student]
}

type Student {
  id: Int
  name: String
  math: Int
  korean: Int
  english: Int
}
`);

const resolver = { 
  Students: (agrs) => { 
    let data = studentTemp[agrs.num]
    return data 
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen(PORT, () => 
  console.log(`GraphQL Server ON: ${PORT}`)
);