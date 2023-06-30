import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddMovieModal = ({ setModalIsVisible }) => {
  const [movieName, setMovieName] = useState("");
  const [category, setCategory] = useState("");
  const [photoName, setPhotoName] = useState("");

  const saveMovie = async () => {
    try {
      await fetch("http://localhost:5189/api/Movies/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          moviesName: movieName,
          moviesYear: 2000,
          category: category,
          photoName: photoName,
        }),
      });
    } catch {}
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  return (
    <div className=" w-100 h-100 position-fixed inset-0 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center transition-opacity top-0 ">
      <div className="bg-white  w-50 h-75 rounded-4 flex p-3 items-center ">
        <div className="modal-content ">
          {/* HEADER */}
          <div className="modal-header">
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
          <div className="modal-body  ">
            <div className="row mb-3 ">
              <div className=" col-auto w-25 ">
                <span className="input-group-text  ">MovieName</span>
              </div>
              <div className="col d-flex">
                <input
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                  type="text"
                  className="form-control w-75"
                />
              </div>
            </div>

            <div className="row mb-3 ">
              <div className="col-auto w-25">
                <span className="input-group-text">Category</span>
              </div>
              <div className="col">
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  className="form-control w-75"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-auto w-25  ">
                <span className="input-group-text">PhotoName</span>
              </div>
              <div className="col">
                <input
                  value={photoName}
                  onChange={(e) => setPhotoName(e.target.value)}
                  type="text"
                  className="form-control w-75"
                />
              </div>
            </div>
          </div>
          {/* Buttons */}

          <div className=" mb-3 w-50 ">
            <img width="250px" height="250"></img>
          </div>

          <div className=" p-4">
            <button type="button" className="btn btn-primary float-start">
              Add image
            </button>
          </div>

          {/* Create Button */}
          <div className="d-flex justify-content-end p-4   ">
            <button
              onClick={() => saveMovie()}
              type="button"
              className="btn btn-primary "
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
