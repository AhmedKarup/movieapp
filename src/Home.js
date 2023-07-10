import React, { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      await fetch("http://localhost:5189/api/Movies/get")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMovies(data);
        });
    } catch {}
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

  const genreMovies = {};

  // Kreiraj objekat sa žanrovima kao ključevima i filmovima kao vrednostima
  genreOptions.forEach((genreOption) => {
    genreMovies[genreOption] = movies.filter(
      (movie) => movie.genre === genreOption
    );
  });

  return (
    <div className="homecontent  ">
      <div className="genre-container  ">
        {genreOptions.map((genreOption) => (
          <div key={genreOption} className="genre-section  ">
            <div className="kategorija">
              <h2>{genreOption}</h2>
            </div>
            <div className="maincont d-flex ">
              {genreMovies[genreOption].map((movie) => (
                <div key={movie.id}>
                  <img
                    className="homephoto "
                    src={movie.photo}
                    alt={movie.movieName}
                  />
                  <p className="naslov text-center fs-4">{movie.movieName}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
