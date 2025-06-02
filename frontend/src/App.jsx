import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <>
      <Wrapper>
        <InputTodo />
        <ListTodo />
      </Wrapper>
    </>
  );
}

export default App;
