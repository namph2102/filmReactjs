import { Main } from "./components/Layouts/Main";
import "./styles/style.scss";
import store from "./Redux/Store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      {/* redux provider */}
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
