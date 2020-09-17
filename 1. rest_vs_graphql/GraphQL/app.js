const { graphql, buildSchema } = require('graphql');

const classTemp = {
  1: {
    totalCount: 4,
    teacher: "나그네1"
  },
  2: {
    totalCount: 3,
    teacher: "나그네2"
  },
  3: {
    totalCount: 2,
    teacher: "나그네3"
  }
}

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
    Others: [Other]
  }

  type Student {
    id: Int
    name: String
    math: Int
    korean: Int
    english: Int
  }
  type Other {
    id: Int
    etc: String
  }
`);

var resolver = { 
  Students: (agrs) => { 
    let data = studentTemp[agrs.num]
    return data 
  },
  Others: () => {
    return [
      {id: 1, etc: "etc1"},
      {id: 2, etc: "etc2"},
    ]
  }
};

let ql = '{ Students(num:1) {id, name, math} Others {id, etc} }'
graphql(schema, ql, resolver).then((response) => {
  console.log(1)
  console.log(response.data);
});
