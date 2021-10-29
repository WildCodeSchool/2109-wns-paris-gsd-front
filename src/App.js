import { useQuery, gql } from "@apollo/client";
import logo from "./assets/eee.png";
import "./App.css";

const GET_TASKS = gql`
  query Query {
    getTasks {
      id
      title
      description
      advancement
      status
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <div className="task">
        <h1>title</h1>
        <h1>description</h1>
        <h1>Temps estimé</h1>
      </div>
      {data.getTasks.map((task) => (
        <div key={task.id} className="task">
          <h2>{task.title}</h2>
          <h2>{task.description}</h2>
          <h2>{task.scheduled_time}%</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
