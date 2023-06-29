import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddMovieModal from "./AddMovieModal";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);

  const [addModalVisible, setAddModalVisible] = useState(false);

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

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5189/api/Movies/movies/delete/${id}`, {
        method: "DELETE",
      });
    } catch {}
  };

  return (
    <>
      <div className=" w-100  h-100 ">
        <h2>This is Movies page</h2>
        <button onClick={() => setAddModalVisible(!addModalVisible)}>
          Add movie
        </button>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Movie Name</th>
                <th>Category</th>
                <th>Data Of Creation</th>
                <th>PhotoName</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {movieList.map((movie) => (
                <tr key={movie.moviesId}>
                  <td>{movie.moviesId}</td>
                  <td>{movie.moviesName}</td>
                  <td>{movie.category}</td>
                  <td>{movie.dateOfCreate}</td>
                  <td>{movie.photoName}</td>
                  <button
                    onClick={() => deleteMovie(movie.moviesId)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </button>
                  <button type="button" className="btn btn-light mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                    </svg>
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {addModalVisible && (
        <AddMovieModal setModalIsVisible={setAddModalVisible} />
      )}
    </>
  );
};

export default Movies;
