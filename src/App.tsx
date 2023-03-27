import Main from "./components/Layouts/Main";
import "./styles/style.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./Redux/Store";
import { fetchDataFilm } from "./Redux/FilmSlice";
import { ToastContainer } from "react-toastify";

export const commemtReadTime = (id_film: number) => {
  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`commemts-id:${id_film}`, {
        detail: `----Nội dung comment${id_film}----`,
      })
    );
  }, 2000);
};

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFilm());
  }, []);

  return (
    <div className="App">
      <Main />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}

export default App;
