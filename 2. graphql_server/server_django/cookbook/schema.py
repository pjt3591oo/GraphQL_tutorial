# cookbook/schema.py
import graphene
from graphene_django import DjangoObjectType

from cookbook.ingredients.models import Category, Ingredient

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

class CreateStudent(graphene.Mutation):
    class Arguments:
        name = graphene.String()

        classNum=graphene.Int()
        korean = graphene.Int()
        math = graphene.Int()
        english = graphene.Int()

    ok = graphene.Boolean()
    student = graphene.Field(lambda: Student)

    def mutate(root, info, name, classNum, korean, math, english):
        identify= studentTemp[str(classNum)][-1]["id"] + 1
        student = Student(
          name= name,
          id= identify,
          korean= korean,
          math= math,
          english= english,
        )
        ok = True
        studentTemp[str(classNum)].append({"id": identify, "name": name, "korean": korean, "math": math, "english": english})
        print(studentTemp["1"])
        return CreateStudent(student=student, ok=ok)

class Student(graphene.ObjectType):
  name = graphene.String()
  id=graphene.Int()
  korean = graphene.Int()
  math = graphene.Int()
  english = graphene.Int()

class MyMutations(graphene.ObjectType):
    create_student = CreateStudent.Field()

# We must define a query for our schema
class Query(graphene.ObjectType):
  student = graphene.List(Student, classNum=graphene.Int())

  def resolve_student(self, info, classNum):
    return studentTemp[str(classNum)]

schema = graphene.Schema(query=Query, mutation=MyMutations)