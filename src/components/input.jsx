import "./input.css";
import logo from "../assets/lyric_logo.png";
import { useEffect, useState, useMemo } from "react";
import Result from "./result";
import { createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const SongContext = createContext();

export default function InputBox() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const handleClick = function (event) {
    setInput(event.target.value);
  };
  console.log(input);

  const [data, setData] = useState({ songs: [] });
  const [suggestionsOn, setSuggestionsOn] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState(null);
  const removeSuggestions = function () {
    setSuggestionsOn(false);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Failed to fetch songs");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, []);
  console.log(data.songs);

  useEffect(() => {
    if (input.length > 1) {
      setSuggestionsOn(true);
      setSubmit(false);
      const songs = data.songs.filter((song) =>
        song.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSongs(songs);
    } else {
      setSuggestionsOn(false);
      setFilteredSongs([]);
    }
  }, [input, data.songs]);

  console.log(filteredSongs);
  const handleSubmit = function (event) {
    event.preventDefault();

    if (filteredSongs.length > 0) {
      navigate(`/song/${filteredSongs[0].id}`);
    } else {
      alert("No songs found.");
    }
  };
  console.log(submit);
  const addInput = function (event) {
    const selectedSongTitle = event.target?.innerText?.toLowerCase();
    if (!selectedSongTitle) return;

    const filtered = data.songs.filter(
      (song) => song.title.toLowerCase() === selectedSongTitle
    );

    if (filtered.length > 0) {
      const songId = filtered[0].id;
      navigate(`/song/${songId}`);
      setSuggestionsOn(false); // Hide suggestions
      // setInput(selectedSongTitle);
      // setFilteredSongs(filtered);
    } else {
      console.warn("Selected song not found!");
    }
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
                  key={song.id}
                  onTouchMove={(e) => e.stopPropagation()}
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
