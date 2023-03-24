import Main from "./components/Layouts/Main";
import "./styles/style.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./Redux/Store";
import { fetchDataFilm } from "./Redux/FilmSlice";
import { fetchAPIDataFilm } from "./Redux/ApiSlice";
function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFilm());
  }, []);
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
