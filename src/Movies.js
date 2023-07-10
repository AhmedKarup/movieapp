import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddMovieModal from "./AddMovieModal";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateMovieModal from "./UpdateMovieModal";
const Movies = () => {
  const [movieList, setMovieList] = useState([]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateMovieModal, setUpdateModalVisible] = useState(false);

  const [currentMovie, setCurrentMovie] = useState({});

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      await fetch("http://localhost:5189/api/Movies/get")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMovieList(data);
        });
    } catch {}
  };
  // delete movie
  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5189/api/Movies/movies/delete/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch {}
  };

  const base64ToPhoto = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Create Object URL for the Blob
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  };

  return (
    <>
      {/* addMovieButton */}
      <div className=" mainx  h-100 ">
        <div className="p-3 ">
          <button
            className="btn btn-light  btn-outline-danger mb-2"
            style={{ width: "150px" }}
            onClick={() => setAddModalVisible(!addModalVisible)}
          >
            Add movie
          </button>
        </div>
        {/* tablehead */}
        <div className=" mytable p-2 ">
          <table className=" table shadow-lg w-100 bg-white ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Photo</th>
                <th>Movie Name</th>
                <th>Category</th>
                <th>Genre</th>
                <th>ReleaseDate</th>
                <th>Data Of Creation</th>

                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {movieList.map((movie) => (
                <tr key={movie.moviesId}>
                  <td>{movie.movieId}</td>
                  <td>
                    <img className="photo " src={movie.photo} />
                  </td>
                  <td>{movie.movieName}</td>
                  <td>{movie.category}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.dateOfCreate}</td>

                  <div className="OptionBtn ">
                    <button
                      onClick={() => deleteMovie(movie.movieId)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-trash "
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </button>

                    <button
                      onClick={() =>
                        setCurrentMovie(movie) & setUpdateModalVisible(true)
                      }
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-file-earmark-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                      </svg>
                    </button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {addModalVisible && (
        <AddMovieModal
          setModalIsVisible={setAddModalVisible}
          refreshCallback={refresh}
        />
      )}
      {updateMovieModal && (
        <UpdateMovieModal
          setModalIsVisible={setUpdateModalVisible}
          refreshCallback={refresh}
          currentMovie={currentMovie}
        />
      )}
    </>
  );
};

export default Movies;
