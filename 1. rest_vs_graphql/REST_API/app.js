// 받아야 하는 항목이 많고, 딱 정해져 있는 경우 유리 - 요청은 간단 / 응답은 복잡

let express = require('express')
let app = express()

const PORT = 3000

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

app.get('/class/:classId/students', (req, res) => {
  let { classId=1 } = req.params
  let { subjects="korean" } = req.query
  
  subjects = subjects.split(',')
  
  let students = studentTemp[classId].map(student => 
    subjects.reduce((acc, subject) => {
      acc[subject] = student[subject]
      return acc
    }, {name: student.name, id: student.id})
  )

  return res.json({
    ...classTemp[classId], 
    students
  })
})

app.listen(PORT, () => {
  console.log(`server on: ${PORT}`)
})

