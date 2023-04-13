import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Main from "./components/Layouts/Main";
import { fetchDataFilm } from "./Redux/FilmSlice";
import { AppDispatch } from "./Redux/Store";
import "./styles/style.scss";

// export const commemtReadTime = (id_film: string) => {
//   const idsetComment = setInterval(() => {
//     console.log("nội dung commemt ", id_film);
//     window.dispatchEvent(
//       new CustomEvent(`commemts-id:${id_film}`, {
//         detail: idsetComment,
//       })
//     );
//   }, 2000);
// };

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFilm());
  }, []);

  return (
    <div className="App">
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
