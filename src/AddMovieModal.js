import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddMovieModal = ({ setModalIsVisible }) => {
  const [movieName, setMovieName] = useState("");

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
          category: "test",
        }),
      });
    } catch {}
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  return (
    <div className=" w-100 h-100 position-fixed inset-0 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center transition-opacity top-0 ">
      AddMovieModal
      <div className="bg-white p-5 rounded-4 flex  justify-center items-center">
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
          <div className="modal-body">
            <div className="input-group mb-3"></div>
            <span className="input-group-text">MovieName</span>
            <input
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          {/* Buttons */}
          <button
            onClick={() => saveMovie()}
            type="button"
            className="btn btn-primary float-start"
          >
            Create
          </button>
          <button type="button" className="btn btn-primary float-start">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
