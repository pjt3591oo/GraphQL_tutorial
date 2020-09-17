import graphene

studentTemp = {
  "1": [
    {"id": 1, "name": "멍개1-1", "math": 80, "korean": 60, "english": 80},
    {"id": 2, "name": "멍개1-2", "math": 70, "korean": 70, "english": 80},
    {"id": 3, "name": "멍개1-3", "math": 60, "korean": 80, "english": 80},
    {"id": 3, "name": "멍개1-4", "math": 50, "korean": 80, "english": 80},
  ],
  "2": [
    {"id": 4, "name": "멍개2-1", "math": 80, "korean": 60, "english": 80},
    {"id": 5, "name": "멍개2-2", "math": 70, "korean": 70, "english": 80},
    {"id": 6, "name": "멍개2-3", "math": 60, "korean": 80, "english": 80},
  ],
  "3": [
    {"id": 7, "name": "멍개3-2", "math": 80, "korean": 60, "english": 80},
    {"id": 8, "name": "멍개3-1", "math": 70, "korean": 70, "english": 80},
  ]
}

class Student(graphene.ObjectType):
  id = graphene.Int()
  name = graphene.String()
  math = graphene.Int()
  korean = graphene.Int()
  english = graphene.Int()

class Query(graphene.ObjectType):
  hello = graphene.String(name=graphene.String(default_value="World"))
  student = graphene.List(Student, classNum=graphene.Int())

  def resolve_hello(self, info, name):
    return 'Hello ' + name

  def resolve_student(self, info, classNum):
    return studentTemp[str(classNum)]


schema = graphene.Schema(query=Query)
result = schema.execute('''
{ 
  student(
    classNum: 1
  ) {
    id, 
    name
  } 

  hello 
}''')

'''
{
  'student': [{'id': 1, 'name': '멍개1-1'}, {'id': 2, 'name': '멍개1-2'}, {'id': 3, 'name': '멍개1-3'}, {'id': 3, 'name': '멍개1-4'}], 
  'hello': 'Hello World'
}
'''
print(result.data) 
