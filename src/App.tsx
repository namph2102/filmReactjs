import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const Main = React.lazy(() => import("./components/Layouts/Main"));
import { fetchDataFilm } from "./Redux/FilmSlice";
import { AppDispatch } from "./Redux/Store";
import "./styles/style.scss";
import LoaddingFirstPage from "./components/LoaddingFirstPage";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFilm());
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<LoaddingFirstPage />}>
        <Main />
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
