import React from 'react';
import { Query, Mutation, useQuery, useMutation } from "react-apollo";
import gql from 'graphql-tag';

// Query, Mutation 동적으로 데이터를 받을 때 이름을 부여하여 함수 형태로 데이터륿 받을 수 있다.
// query Students() {}은 에러 발생함 아무런 데이터를 받지 않을 땐 ()를 지워야 함.

const GET_STUDENTS = gql(`
  query Students($num: Int){
    Students(num:$num) {
      id,
      name,
      math,
      korean,
      english,
    }
  }
`);

const ADD_STUDENT = gql(`
  mutation AddStudent{
    Student(
      id: 12,
      classNum: 3
      name: "mung12"
      math: 100
      korean: 100
      english: 100
    ) {
      id
      name
    }
  }
`)

const ComponentGraphQL = () => {
  return (
    <div className="App">
      <h2>컴포넌트 형태</h2>
      <Query query={GET_STUDENTS} variables={{ num: 2 }}>
        {({ loading, data, error }) => {
          if (loading) return <span>Loading</span>
          if (error) return <span>{JSON.stringify(error)}</span>
          return data.Students.map(student => (
            <div>
              <span>id: {student.id}</span>
              <span>name: {student.name}</span>
              <span>math: {student.math}</span>
            </div>
          ))
        }}
      </Query>

      <Mutation mutation={ADD_STUDENT} variables={{}}>
        {(postMutation) => (
          <button onClick={postMutation} >클릭</button>
        )}
      </Mutation>
    </div>
  )
}

const HookGraphQLGet = () => {
  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: { num: 3 },
  });

  if (loading) return <p>Loading ...</p>;
  else if (error) return <span>Error {JSON.stringify(error)}</span>
  return (
    <div>
      <h2>hooks 형태</h2>
      {data.Students.map(student => (
        <div>
          <span>id: {student.id}</span>
          <span>name: {student.name}</span>
          <span>math: {student.math}</span>
        </div>
      ))}
    </div>
  )
}

const HookGraphQLAdd = () => {
  const [addStudent, { data }] = useMutation(ADD_STUDENT, {
    variables: {},
  });

  return (
    <button onClick={addStudent}>추가</button>
  )
}

function App() {
  return (
    <div>
      <ComponentGraphQL></ComponentGraphQL>
      <HookGraphQLGet></HookGraphQLGet>
      <HookGraphQLAdd></HookGraphQLAdd>
    </div>
  );
}

export default App;
