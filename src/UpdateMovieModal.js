import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddMovie.css";
const UpdateMovieModal = ({
  setModalIsVisible,
  refreshCallback,
  currentMovie,
}) => {
  const [movieId, setMovieId] = useState(currentMovie.movieId);

  const [movieName, setMovieName] = useState(currentMovie.movieName);
  const [category, setCategory] = useState(currentMovie.category);
  const [baseImage, setBaseImage] = useState(currentMovie.photo);
  const [genre, setGenre] = useState(currentMovie.genre);
  const [releaseDate, setrelaseDate] = useState(currentMovie.releaseDate);

  useEffect(() => {
    console.log(baseImage);
  }, [baseImage]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  // POST

  const updateMovie = async () => {
    try {
      await fetch(`http://localhost:5189/api/Movies/movie/update/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          movieId: movieId,
          movieName: movieName,
          releaseDate: releaseDate,
          category: category,
          photo: baseImage,
          genre: genre,
        }),
      });
      closeModal();
      refreshCallback();
    } catch (error) {
      console.log("Error updating movie:", error);
    }
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };
  const genreOptions = [
    "Action",
    "Comedy",
    "Drama",
    "Thriller",
    "Adventure",
    "Horror",
    "Mystery",
    "Fantasy",
    "Western",
    "Documentary",
  ];
  // Generisanje godina
  function generateYearOptions(startYear, endYear) {
    const options = [];
    for (let year = startYear; year <= endYear; year++) {
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return options;
  }

  return (
    <div className=" w-100 h-100 position-fixed inset-0 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center transition-opacity top-0  ">
      <div className=" shadow-lg bg-white  rounded-4 flex p-3 items-center  ">
        <div className="modal-content ">
          {/* HEADER */}
          <div className="modal-header ">
            <h5 className=""></h5>
            <button
              onClick={() => closeModal()}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          {/* BODY */}
          <div className="modal-body ">
            <div className="row mb-3 ">
              <div className=" col-auto  ">
                <span
                  className="input-group-text text-bg-danger "
                  style={{ width: "140px" }}
                >
                  MovieName
                </span>
              </div>
              <div className="col d-flex">
                <input
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                  type="text"
                  className="form-control "
                  style={{ width: "250px" }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-auto">
                <span
                  className="input-group-text text-bg-danger"
                  style={{ width: "140px" }}
                >
                  Category
                </span>
              </div>
              <div className="col">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  style={{ width: "250px" }}
                >
                  <option value="">Select Category</option>
                  <option value="Movies">Movies</option>
                  <option value="Series">Series</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-auto">
                <span
                  className="input-group-text text-bg-danger"
                  style={{ width: "140px" }}
                >
                  Genre
                </span>
              </div>
              <div className="col">
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="form-control"
                  style={{ width: "250px" }}
                >
                  <option value="">Select Genre</option>
                  {genreOptions.map((genreOption) => (
                    <option key={genreOption} value={genreOption}>
                      {genreOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row w-100">
              <div className="col-auto">
                <span
                  className="input-group-text text-bg-danger"
                  style={{ width: "140px" }}
                >
                  ReleaseDate
                </span>
              </div>
              <div className="col">
                <select
                  value={releaseDate}
                  onChange={(e) => setrelaseDate(e.target.value)}
                  className="form-control"
                  style={{ width: "250px" }}
                >
                  {generateYearOptions(2000, 2023)}
                </select>
              </div>
            </div>
          </div>
          {/* Buttons */}

          <div className=" slika mb-3 w-100">
            <img src={baseImage} width="250px" height="250"></img>
          </div>

          {/* Create Button */}

          {/* Add image */}
          <div className="Create ">
            <div className="choose d-flex justify-content-between align-items-center ">
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />

              <button
                onClick={() => updateMovie()}
                type="button"
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovieModal;
