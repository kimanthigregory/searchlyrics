import "./input.css";
import logo from "../assets/lyric_logo.png";
import { useEffect, useState, useMemo } from "react";
import Result from "./result";
import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const SongContext = createContext();

export default function InputBox() {
  const [input, setInput] = useState("");
  const handleClick = function (event) {
    setInput(event.target.value);
  };
  console.log(input);

  const [data, setData] = useState({ songs: [] });
  const [suggestionsOn, setSuggestionsOn] = useState(false);
  const [submit, setSubmit] = useState(false);
  const removeSuggestions = function () {
    setSuggestionsOn(false);
  };
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

  const filter = useMemo(() => {
    if (input.length > 1) {
      setSuggestionsOn(true);
      setSubmit(false);
      return data.songs.filter((song) => {
        const songname = song.title.toLowerCase();
        return songname.includes(input.toLowerCase());
      });
    } else {
      return [];
    }
  }, [input, data.songs]);

  let filteredSongs = filter;
  console.log(filteredSongs);
  const handleSubmit = function (event) {
    event.preventDefault();
    setSubmit(true);
  };
  console.log(submit);
  const addInput = function (event) {
    setInput(event.target.innerText);
    filteredSongs = [];
  };
  const songId = function (id) {
    console.log(id);
  };
  return (
    <main onClick={removeSuggestions}>
      <section className="header">
        <img src={logo} alt="" className="logo" />
        <h1>Search lyrics</h1>
        <p>Search for your favourite Catholic songs</p>
      </section>
      <section className="search">
        <form
          className="search-area"
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            borderRadius: !suggestionsOn ? "8px" : "8px 8px 0 0",
          }}
        >
          <input
            type="search"
            id="search-area"
            placeholder="Search for a song"
            value={input}
            onChange={handleClick}
          />
          <button type="submit">search</button>
        </form>
        {suggestionsOn && (
          <div
            className="auto-complete"
            style={{
              height:
                filteredSongs.length == 0 || filteredSongs.length == 1
                  ? "50px"
                  : "200px",
            }}
          >
            {filteredSongs.length == 0 ? (
              <p className="suggestion">No results found</p>
            ) : (
              filteredSongs.map((song) => (
                <p
                  onClick={addInput}
                  onChange={songId(song.id)}
                  className="suggestion"
                >
                  {song.title}
                </p>
              ))
            )}
          </div>
        )}
      </section>
      <section className="song">
        <SongContext.Provider value={{ submit, filteredSongs }}>
          <Outlet />
        </SongContext.Provider>
      </section>
    </main>
  );
}
