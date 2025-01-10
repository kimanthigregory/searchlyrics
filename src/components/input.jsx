import "./input.css";

import { useEffect, useState } from "react";
import Result from "./result";

export default function InputBox() {
  const [input, setInput] = useState("");
  const handleClick = function (event) {
    setInput(event.target.value);
  };
  console.log(input);

  const [data, setData] = useState({ songs: [] });
  useEffect(() => {
    const getData = () => {
      fetch("./data.json")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    };
    getData();
  }, []);
  console.log(data.songs);

  const filter = (songs, query) => {
    if (query.length > 3) {
      return songs.filter((song) => {
        const songname = song.title.toLowerCase();
        return songname.includes(query.toLowerCase());
      });
    } else {
      return [];
    }
  };
  console.log(filter(data.songs, input));
  const filteredSongs = filter(data.songs, input);
  return (
    <main>
      <section className="header">
        <h1>search lyrics</h1>
        <p>search for your favourite Catholic song lyrics</p>
      </section>
      <section className="search">
        <form className="search-area">
          <input
            type="search"
            id="search-area"
            placeholder="Search for a song"
            value={input}
            onChange={handleClick}
          />
          <button>search</button>
        </form>
        {filteredSongs.length > 0 ? (
          <ul>
            {filteredSongs.map((song) => (
              <li>{song.title}</li>
            ))}
          </ul>
        ) : (
          <h2>type more than three characters</h2>
        )}
      </section>
    </main>
  );
}
