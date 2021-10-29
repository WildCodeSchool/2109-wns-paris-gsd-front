
import { useQuery, gql } from "@apollo/client";
import "./App.css";

const GET_TASKS = gql`
query Query {
  getTasks {
    id
    title
    description
    advancement
    status
    scheduled_time
  }
}
`;

function App() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      {data.getTasks.map((task) => (
  <div key={task.id}>
  <h1 >{task.title}</h1>
  </div>
))}
    </div>
  );
}

export default App;
