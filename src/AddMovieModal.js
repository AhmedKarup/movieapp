import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddMovie.css";
const AddMovieModal = ({ setModalIsVisible, refreshCallback }) => {
  const [movieName, setMovieName] = useState("");
  const [category, setCategory] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setrelaseDate] = useState("");

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
  const saveMovie = async () => {
    try {
      await fetch("http://localhost:5189/api/Movies/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          movieName: movieName,
          ReleaseDate: releaseDate,
          category: category,
          photo: baseImage,
          genre: genre,
        }),
      });
      closeModal();
      refreshCallback();
    } catch {}
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

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

            <div className="row mb-3 ">
              <div className="col-auto ">
                <span
                  className="input-group-text text-bg-danger"
                  style={{ width: "140px" }}
                >
                  Category
                </span>
              </div>
              <div className="col">
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  className="form-control "
                  style={{ width: "250px" }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-auto  ">
                <span
                  className="input-group-text text-bg-danger "
                  style={{ width: "140px" }}
                >
                  Genre
                </span>
              </div>
              <div className="col">
                <input
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  type="text"
                  className="form-control "
                  style={{ width: "250px" }}
                />
              </div>
            </div>
            <div className="row w-100 ">
              <div className="col-auto  ">
                <span
                  className="input-group-text text-bg-danger "
                  style={{ width: "140px" }}
                >
                  ReleaseDate
                </span>
              </div>
              <div className="col">
                <input
                  value={releaseDate}
                  onChange={(e) => setrelaseDate(e.target.value)}
                  type="text"
                  className="form-control "
                  style={{ width: "250px" }}
                />
              </div>
            </div>
          </div>
          {/* Buttons */}

          <div className=" mb-3 w-50 ">
            <img src={baseImage} width="250px" height="250"></img>
          </div>

          {/* Create Button */}

          {/* Add image */}
          <div className="Create">
            <div className="d-flex justify-content-between align-items-center ">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />

              <button
                onClick={() => saveMovie()}
                type="button"
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
